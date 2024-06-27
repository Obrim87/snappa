import { useContext } from 'react';
import { NotificationContext } from '../App';

const Notification = () => {
  const [notification, setNotification] = useContext(NotificationContext);

  setTimeout(() => {
    setNotification('');
  }, 8000);

  console.log('notification', notification);

  if (
    notification === 'User not found' ||
    notification === 'Password incorrect'
  ) {
    return <div className='text-red-400 p-5'>{notification}</div>;
  }

  if (notification === 'Validation error') {
    return <div className='text-red-400 p-5'>Email already in use</div>;
  }

  return <div className='p-5'>{notification}</div>;
};

export default Notification;

// work out why this isnt appearing after logging in!
