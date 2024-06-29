import Notification from './Notification';

const Home = () => {
  return (
    <div className='flex text-center flex-col bg-primary h-screen'>
      <img src='main-banner.jpeg' alt='bro throwing a dice' className='h-max' />
      <Notification />
    </div>
  );
};

export default Home;
