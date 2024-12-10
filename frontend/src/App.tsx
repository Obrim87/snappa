import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import About from './components/About';
import Home from './components/Home';
import LogGame from './components/LogGame';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';

export const NotificationContext = createContext<
  [string, Dispatch<SetStateAction<string>>]
>(['', () => '']);

const onEscape = () => {
  window &&
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    });
};

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [notification, setNotification] = useState('');
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth');
    token ? setSignedIn(true) : setSignedIn(false);
  }, [signedIn]);

  onEscape();

  return (
    <Router>
      <NotificationContext.Provider value={[notification, setNotification]}>
        <div className='flex flex-row border justify-end border-b-secondaryText bg-primary p-1 items-center'>
          <Link className='p-3 text-secondaryText' to='/'>
            Home
          </Link>
          <Link className='p-3 text-secondaryText' to='/about'>
            What is Snappa?
          </Link>
          <Link className='p-3 text-secondaryText' to='/leaderboard'>
            Leaderboard
          </Link>
          <Link className='p-3 text-secondaryText' to='/log'>
            Log a Game
          </Link>
          {!signedIn ? (
            <Link className='p-3 text-secondaryText' to='/sign-in'>
              Sign-In/Register
            </Link>
          ) : (
            // <span className='group transition-transform ease-in text-secondaryText'>
            //   <Link className='p-3 z-1' to='/profile'>
            //     Your Profile
            //   </Link>
            //   <Link
            //     className='absolute right-10 opacity-0 group-hover:opacity-100 p-1 group-hover:translate-y-11 duration-500'
            //     to={'/'}
            //     onClick={() => {
            //       localStorage.clear();
            //       setSignedIn(false);
            //       setNotification('Logged out successfully');
            //     }}>
            //     Sign Out
            //   </Link>
            // </span>
            <span className='group transition'>
              <button>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1'
                  className='stroke-secondaryText w-8 h-8 mx-2 rounded-full hover:bg-secondaryText hover:scale-110 hover:stroke-primary duration-300'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                  />
                </svg>
              </button>
              <div
                tabIndex={0}
                className='absolute flex flex-col -right-0 top-16 opacity-0 bg-primary border-secondaryText border rounded text-secondaryText group-focus-within:opacity-100 group-focus-within:flex group-focus-within:right-5 group-focus-within:top-16 duration-500'
                ref={divRef}>
                <Link
                  to='/profile'
                  onClick={() => {
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                  className='mx-3 mt-3 p-1 hover:bg-secondaryText hover:text-primary hover:scale-110 duration-300 rounded'>
                  Profile
                </Link>
                <Link
                  to='/'
                  onClick={() => {
                    localStorage.clear();
                    setSignedIn(false);
                    setNotification('Logged out successfully');
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                  className='m-3 p-1 hover:bg-secondaryText hover:text-primary hover:scale-110 duration-300 rounded'>
                  Log Out
                </Link>
              </div>
            </span>
          )}
        </div>
        <Routes>
          <Route path='/about' element={<About />} />
          <Route path='/log' element={<LogGame />} />
          <Route
            path='/sign-in'
            element={<SignIn setSignedIn={setSignedIn} />}
          />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </NotificationContext.Provider>
    </Router>
  );
}

export default App;

// ESC working, figure out why it reverts to home page when clicking user button
