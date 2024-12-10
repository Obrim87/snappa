import { useContext, useEffect, useState } from 'react';
import Notification from './Notification';
import axios from 'axios';
import { NotificationContext } from '../App';
import { ProfileData } from '../types';
import configs from '../utils/config.ts';
import { table } from 'console';
const { apiBaseUrl } = configs;

const Profile = () => {
  const [notification, setNotification] = useContext(NotificationContext);
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

  console.log(userStats);

  return (
    <div className='flex text-center bg-primary h-screen text-primaryText flex-col'>
      <h1 className='p-6 text-2xl text-primaryText'>Profile</h1>
      {notification && <Notification />}

      {loggedInUserToken && (
        <div>
          <div>
            {!userStats ? (
              <p>Loading...</p>
            ) : (
              <>
                <h2 className='text-2xl font-bold pb-3 pt-3 m-5'>
                  Change Password
                </h2>
                <h2 className='text-2xl font-bold pb-3 pt-3 m-5'>
                  Statistics for {`${userStats?.fname} ${userStats?.lname}`}
                </h2>
                <table className='w-80 mx-auto'>
                  {/* <thead>
                    <tr className='bg-alternateBg'>
                      <th scope='col'>{`${userStats?.fname} ${userStats?.lname}`}</th>
                      <th scope='col'></th>
                    </tr>
                  </thead> */}
                  <tbody className='[&>*:nth-child(odd)]:bg-alternateBg'>
                    <tr>
                      <th scope='row' className='p-1'>
                        Total Tings
                      </th>
                      <td>{userStats?.userStat.totalTings}</td>
                    </tr>
                    <tr>
                      <th scope='row' className='p-1'>
                        Total Sinks
                      </th>
                      <td>{userStats?.userStat.totalSinks}</td>
                    </tr>
                    <tr>
                      <th scope='row' className='p-1'>
                        Points For
                      </th>
                      <td>{userStats?.userStat.pointsFor}</td>
                    </tr>
                    <tr>
                      <th scope='row' className='p-1'>
                        Points Against
                      </th>
                      <td>{userStats?.userStat.pointsAgainst}</td>
                    </tr>
                    <tr>
                      <th scope='row' className='p-1'>
                        Total Games
                      </th>
                      <td>{userStats?.userStat.totalGames}</td>
                    </tr>
                    <tr>
                      <th scope='row' className='p-1'>
                        Total Wins
                      </th>
                      <td>{userStats?.userStat.totalWins}</td>
                    </tr>
                    <tr>
                      <th scope='row' className='p-1'>
                        Total Losses
                      </th>
                      <td>{userStats?.userStat.totalLosses}</td>
                    </tr>
                  </tbody>
                </table>
                <h2 className='text-2xl font-bold pb-3 pt-3 m-5'>
                  Detailed Game Information
                </h2>
                {userStats.games.map((game) => (
                  <table key={game.id} className='w-80 mx-auto my-10'>
                    <tbody className='[&>*:nth-child(odd)]:bg-alternateBg'>
                      <tr>
                        <th className='p-1'>Game Date</th>
                        <td>
                          {`${game.date.slice(8, 10)}-${game.date.slice(5, 7)}-${game.date.slice(0, 4)}`}
                        </td>
                      </tr>
                      <tr>
                        <th className='p-1'>Location</th>
                        <td>{game.location ? game.location : 'N/A'}</td>
                      </tr>
                      <tr>
                        <th colSpan={2} className='p-1'>
                          You{' '}
                          <span
                            className={
                              game.userGame.win
                                ? 'text-green-400'
                                : 'text-red-500'
                            }>
                            {game.userGame.win ? 'won' : 'lost'}
                          </span>{' '}
                          this match {game.userGame.for} points to{' '}
                          {game.userGame.against}
                        </th>
                      </tr>
                      <tr>
                        <th colSpan={2} className='p-1'>
                          You scored {game.userGame.sinks}{' '}
                          {game.userGame.sinks === 1 ? 'sink' : 'sinks'} and{' '}
                          {game.userGame.tings}{' '}
                          {game.userGame.tings === 1 ? 'ting' : 'tings'}
                        </th>
                      </tr>
                    </tbody>
                  </table>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
