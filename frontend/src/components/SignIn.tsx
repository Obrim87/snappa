import { useForm } from 'react-hook-form';
import { UserSigninInput } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { SetStateAction, Dispatch, useContext } from 'react';
import axios, { AxiosError } from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { NotificationContext } from '../App';
import Notification from './Notification';
import configs from '../utils/config.ts';

const { apiBaseUrl } = configs;

const SignIn = ({
  setSignedIn,
}: {
  setSignedIn: Dispatch<SetStateAction<boolean>>;
}) => {
  const [, setNotification] = useContext(NotificationContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserSigninInput>();

  return (
    <div className='bg-primary h-screen'>
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            const res = await axios.post(`${apiBaseUrl}/api/login`, data);
            localStorage.setItem('auth', res.data.token);
            setSignedIn(true);
            setNotification('Logged in successfully');
            navigate('/profile');
          } catch (err) {
            if (err instanceof AxiosError) {
              setNotification(err.response?.data.error);
              console.log(err);
            }
          }
        })}
        className='max-w-xl m-auto text-primaryText text-center flex flex-col items-center'>
        <h1 className='p-5 mb-4 text-2xl'>Sign in to Your Account</h1>
        <Notification />
        <input
          {...register('email')}
          // name='email'
          className='input mb-10'
          placeholder='Email'
          required
          type='email'
        />

        <input
          {...register('password')}
          className='input mb-2'
          placeholder='Password'
          type='password'
          required
        />
        <div className='flex w-5/6 m-5 text-customGreen'>
          <Link to='' className='grow'>
            Forgot Your Password?
          </Link>
          <Link to='/sign-up' className='grow'>
            Need an Account?
          </Link>
        </div>
        <button
          className='btn-primary w-128 justify-self-center'
          data-testid='submitButton'>
          {!isSubmitting ? (
            'Sign-In'
          ) : (
            <ThreeDots
              visible={true}
              height='30'
              width='50'
              color='#f2f3f5'
              radius='9'
              ariaLabel='three-dots-loading'
              wrapperStyle={{}}
              wrapperClass='w-fit m-auto'
            />
          )}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
