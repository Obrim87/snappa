import { useContext, useEffect, useState } from 'react';
import Notification from './Notification';
import axios from 'axios';
import { NotificationContext } from '../App';
import { ProfileData } from '../types';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const Profile = () => {
  const [, setNotification] = useContext(NotificationContext);
  const [userStats, setUserStats] = useState<ProfileData | undefined>();
  const loggedInUserToken = localStorage.getItem('auth');

  if (!loggedInUserToken) {
    setNotification('You must be logged in to access this page');
  }

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/api/users/loggedInUserStats`, {
        headers: {
          Authorization: `Bearer ${loggedInUserToken}`,
        },
      })
      .then((res) => {
        setUserStats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='flex text-center bg-primary h-screen text-primaryText flex-col'>
      <h1 className='p-6 text-2xl text-primaryText'>Profile</h1>
      <Notification />

      {loggedInUserToken && (
        <div>
          <h2 className='text-2xl font-bold pb-3 pt-3'>Change Password</h2>
          <h2 className='text-2xl font-bold pb-3 pt-3'>Your Statistics</h2>
          <table className='max-w-xl mx-auto'>
            <thead>
              <tr>
                <th scope='col'>{`${userStats?.fname} ${userStats?.lname}`}</th>
                <th scope='col'></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'>Total Tings</th>
                <td>{userStats?.userStat.totalTings}</td>
              </tr>
              <tr>
                <th scope='row'>Total Sinks</th>
                <td>{userStats?.userStat.totalSinks}</td>
              </tr>
              <tr>
                <th scope='row'>Points For</th>
                <td>{userStats?.userStat.pointsFor}</td>
              </tr>
              <tr>
                <th scope='row'>Points Against</th>
                <td>{userStats?.userStat.pointsAgainst}</td>
              </tr>
              <tr>
                <th scope='row'>Total Games</th>
                <td>{userStats?.userStat.totalGames}</td>
              </tr>
              <tr>
                <th scope='row'>Total Wins</th>
                <td>{userStats?.userStat.totalWins}</td>
              </tr>
              <tr>
                <th scope='row'>Total Losses</th>
                <td>{userStats?.userStat.totalLosses}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Profile;
