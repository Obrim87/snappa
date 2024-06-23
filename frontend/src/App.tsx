import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';
import { useState } from 'react';
import LogGame from './components/LogGame';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <Router>
      <div className='static top-0 text-right p-3 bg-primary border-b-secondaryText border'>
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
          <Link className='p-5 text-secondaryText' to='/profile'>
            Profile
          </Link>
        )}
      </div>
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/log' element={<LogGame />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
