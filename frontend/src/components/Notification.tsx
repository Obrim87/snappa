import { useContext, useEffect } from 'react';
import { NotificationContext } from '../App';

const Notification = () => {
  const [notification, setNotification] = useContext(NotificationContext);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setNotification('');
    }, 8000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  if (
    notification === 'User not found' ||
    notification === 'Password incorrect'
  ) {
    return <div className='text-red-400 p-5'>{notification}</div>;
  }

  if (notification === 'Validation error') {
    return <div className='text-red-400 p-5'>Email already in use</div>;
  }

  return <div className='p-5 text-primaryText'>{notification}</div>;
};

export default Notification;
