// import { dateRegex } from '../utils/regex.ts';
import { useForm } from 'react-hook-form';
import { UserSignupInput } from '../types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm<UserSignupInput>();

  useEffect(() => {
    if (isSubmitSuccessful) {
      navigate('/sign-in');
    }
  }, [isSubmitSuccessful]);

  console.log('form', formState);

  return (
    <div className='bg-primary h-screen'>
      <form
        onSubmit={handleSubmit(async (data) => {
          delete data.confirmPassword;
          await axios.post(`${apiBaseUrl}/api/users`, data);
        })}
        className='max-w-xl m-auto text-primaryText text-center flex flex-col items-center'>
        <h1 className='p-5 mb-4 text-2xl'>Sign up for an Account</h1>
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
        <input
          type='submit'
          className='btn-primary w-128'
          value='Create My Account'
        />
      </form>
    </div>
  );
};

export default SignUp;
