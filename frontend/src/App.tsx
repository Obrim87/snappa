import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
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

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('auth');
    token ? setSignedIn(true) : setSignedIn(false);
  }, [signedIn]);

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      <Router>
        <div className='static top-0 border border-b-secondaryText bg-primary p-3 text-right'>
          <Link className='p-5 text-secondaryText' to='/'>
            Home
          </Link>
          <Link className='p-5 text-secondaryText' to='/about'>
            What is Snappa?
          </Link>
          <Link className='p-5 text-secondaryText' to='/leaderboard'>
            Leaderboard
          </Link>
          <Link className='p-5 text-secondaryText' to='/log'>
            Log a Game
          </Link>
          {!signedIn ? (
            <Link className='p-5 text-secondaryText' to='/sign-in'>
              Sign-In/Register
            </Link>
          ) : (
            <span className='group transition ease-in-out z-10 text-secondaryText'>
              <Link className='p-5' to='/profile'>
                Your Profile
              </Link>
              <Link
                className='absolute right-10 opacity-0 top-14 group-hover:opacity-100 duration-500 z-0 p-1 scale-0 group-hover:scale-100'
                to={'/'}
                onClick={() => {
                  localStorage.clear();
                  setSignedIn(false);
                }}>
                Sign Out
              </Link>
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
      </Router>
    </NotificationContext.Provider>
  );
}

export default App;
