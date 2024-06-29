import Notification from './Notification';

const Profile = () => {
  console.log(localStorage.getItem('auth'));
  return (
    <div className='flex text-center bg-primary h-screen text-primaryText flex-col'>
      <h1>Profile</h1>
      <Notification />
    </div>
  );
};

export default Profile;
