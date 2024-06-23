import { useForm } from 'react-hook-form';
import { UserSigninInput } from '../types';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const { register, handleSubmit } = useForm<UserSigninInput>();

  return (
    <div className='bg-primary h-screen'>
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className='max-w-xl m-auto text-primaryText text-center flex flex-col items-center'>
        <h1 className='p-5 mb-4 text-2xl'>Sign in to Your Account</h1>

        <input
          {...register('email')}
          // name='email'
          className='input mb-10'
          placeholder='Email'
          required
        />

        <input
          {...register('password')}
          className='input mb-2'
          placeholder='Password'
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
        <input type='submit' className='btn-primary w-128' value='Sign-In' />
      </form>
    </div>
  );
};

export default SignIn;
