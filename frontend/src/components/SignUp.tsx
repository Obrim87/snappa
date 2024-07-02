// import { dateRegex } from '../utils/regex.ts';
import { useForm } from 'react-hook-form';
import { UserSignupInput } from '../types';
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from '../App';
import { ThreeDots } from 'react-loader-spinner';
import Notification from './Notification';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const SignUp = () => {
  const [, setNotification] = useContext(NotificationContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UserSignupInput>();

  return (
    <div className='bg-primary h-screen'>
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            delete data.confirmPassword;
            await axios.post(`${apiBaseUrl}/api/users`, data);
            navigate('/sign-in');
            setNotification('User created successfully! Log in below.');
          } catch (err) {
            if (err instanceof AxiosError) {
              setNotification(err.response?.data.error);
              console.log(err);
            }
          }
        })}
        className='max-w-xl m-auto text-primaryText text-center flex flex-col items-center'>
        <h1 className='p-5 mb-4 text-2xl'>Sign up for an Account</h1>
        <Notification />
        <input
          {...register('fname')}
          className='input mb-10'
          placeholder='First Name'
          required
        />
        <input
          {...register('lname')}
          className='input mb-10'
          placeholder='Last Name'
          required
        />
        {/* ended up removing this field as it wasn't needed */}
        {/* <input
          {...register('dob')}
          className='input mb-10'
          placeholder='Date of Birth'
          onFocus={(e) => (e.target.placeholder = 'dd-mm-yyyy')}
          onBlur={(e) => (e.target.placeholder = 'Date of Birth')}
          type='text'
          required
          pattern={dateRegex}
        /> */}
        <input
          {...register('email')}
          className='input mb-10'
          placeholder='Email'
          required
          type='email'
        />
        <input
          {...register('password')}
          className='input mb-10'
          placeholder='Password'
          type='password'
          required
          // pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$' enable once site up and running
          // min 8 chars, 1 capital, 1 number, 1 symbol
        />
        <input
          {...register('confirmPassword', {
            validate: (val) => {
              if (watch('password') !== val) {
                return 'Passwords must match.';
              }
            },
          })}
          className='input mb-2'
          placeholder='Confirm Password'
          type='password'
          required
        />
        {errors.confirmPassword && (
          <div className='text-red-500'>{errors.confirmPassword.message}</div>
        )}
        <div className='flex w-5/6 m-5 text-customGreen'>
          <Link to='' className='grow'>
            Forgot Your Password?
          </Link>
          <Link to='/sign-in' className='grow'>
            Have an Account?
          </Link>
        </div>
        <button className='btn-primary w-128 justify-self-center'>
          {!isSubmitting ? (
            'Create My Account'
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

export default SignUp;
