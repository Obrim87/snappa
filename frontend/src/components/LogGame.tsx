import { useForm } from 'react-hook-form';
import { dateRegex } from '../utils/regex.ts';
import {
  getUserNames,
  formErrorHandler,
  organiseFormData,
} from '../utils/formUtils.tsx';
import { useContext, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { UserNameDropdownProps } from '../types.ts';
import { NotificationContext } from '../App.tsx';
import Notification from './Notification.tsx';

// import Address from './Address.tsx';
// import { useRef, useEffect, useState } from 'react';
// import { useMapsLibrary } from '@vis.gl/react-google-maps';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const LogGame = () => {
  const [userNames, setUserNames] = useState<UserNameDropdownProps[]>([]);
  const [, setNotification] = useContext(NotificationContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dateOfGame: '3/3/2024',
      address: null,
      teamOnePlayerOne: null,
      teamOnePlayerTwo: null,
      teamTwoPlayerOne: null,
      teamTwoPlayerTwo: null,
      teamOnePlayerOneTings: 0,
      teamOnePlayerTwoTings: 0,
      teamTwoPlayerOneTings: 0,
      teamTwoPlayerTwoTings: 0,
      teamOnePlayerOneSinks: 0,
      teamOnePlayerTwoSinks: 0,
      teamTwoPlayerOneSinks: 0,
      teamTwoPlayerTwoSinks: 0,
      teamOneScore: null,
      teamTwoScore: null,
    },
  });

  useEffect(() => {
    getUserNames().then((data) => setUserNames(data));
  }, []);

  const populateDropdown = () => {
    if (!userNames) {
      return <option>Loading...</option>;
    }
    userNames.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0; // if names equal
    });
    return userNames.map((item) => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });
  };

  const dropdownValues = populateDropdown();

  return (
    <div className='h-screen bg-primary text-center'>
      <h1 className='p-6 text-2xl text-primaryText'>Log a Game</h1>
      <Notification />
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post(
              `${apiBaseUrl}/api/games/logGame`,
              organiseFormData(data)
            );
            reset();
            setNotification('Game logged successfully! Player stats updated');
          } catch (err) {
            if (err instanceof AxiosError) {
              setNotification(err.response?.data.error);
              console.log(err);
            }
          }
        })}
        className='grid justify-center max-w-xl m-auto grid-cols-2 text-primaryText'>
        <div className='col-start-1 col-end-3 text-center m-5'>
          <input
            {...register('dateOfGame', { required: true, valueAsDate: true })}
            className='input w-80'
            placeholder='Date of Game'
            // onFocus={(e) => (e.target.placeholder = 'dd-mm-yyyy')}
            // onBlur={(e) => (e.target.placeholder = 'Date of Game')}
            // pattern={dateRegex}
            type='date'
          />
          {errors.dateOfGame ? (
            <p className={'error-text mb-0'}>This field is required.</p>
          ) : (
            <p className={'error-text opacity-0'}>This field is required.</p>
          )}
          {/* leave this for now, works but clears when submitting */}
          {/* <Address onPlaceSelect={() => void 0} /> */}
        </div>
        <label className='row-start-2 col-start-1 col-end-3 text-center py-4'>
          Team 1
        </label>
        <div className='row-start-3 text-center'>
          <select
            {...register('teamOnePlayerOne', {
              required: true,
              validate: (value) => {
                if (
                  watch('teamOnePlayerTwo') === value ||
                  watch('teamTwoPlayerOne') === value ||
                  watch('teamTwoPlayerTwo') === value
                ) {
                  return 'Duplicate player';
                }
              },
            })}
            className='dropdown'>
            <option value='' disabled>
              Player 1
            </option>
            {dropdownValues}
          </select>
          {errors.teamOnePlayerOne && formErrorHandler(errors.teamOnePlayerOne)}
        </div>
        <div className='row-start-3 col-start-2 text-center'>
          <select
            {...register('teamOnePlayerTwo', {
              required: true,
              validate: (value) => {
                if (
                  watch('teamOnePlayerOne') === value ||
                  watch('teamTwoPlayerOne') === value ||
                  watch('teamTwoPlayerTwo') === value
                ) {
                  return 'Duplicate player';
                }
              },
            })}
            className='dropdown'>
            <option value='' disabled>
              Player 2
            </option>
            {dropdownValues}
          </select>
          {errors.teamOnePlayerTwo && formErrorHandler(errors.teamOnePlayerTwo)}
        </div>
        <div className='row-start-4 text-center'>
          <label>Tings</label>
          <input
            {...register('teamOnePlayerOneTings', { required: true })}
            type='number'
            className='number-input-small'
            min='0'
            max='15'
          />
        </div>
        <div className='row-start-4 col-start-2 text-center'>
          <label>Tings</label>
          <input
            {...register('teamOnePlayerTwoTings', { required: true })}
            type='number'
            className='number-input-small'
            min='0'
            max='15'
          />
        </div>
        <div className='row-start-5 text-center'>
          <label>Sinks</label>
          <input
            {...register('teamOnePlayerOneSinks', { required: true })}
            type='number'
            className='number-input-small'
            min='0'
            max='15'
          />
        </div>
        <div className='row-start-5 col-start-2 text-center'>
          <label>Sinks</label>
          <input
            {...register('teamOnePlayerTwoSinks', { required: true })}
            type='number'
            className='number-input-small'
            min='0'
            max='15'
          />
        </div>
        <div className='row-start-6 col-start-1 col-end-3 text-center'>
          <label>Team 1 Score</label>
          <input
            {...register('teamOneScore', {
              required: true,
              validate: (value) => {
                if (watch('teamTwoScore') === value) {
                  return 'Team scores cannot be equal';
                }
              },
            })}
            type='number'
            className={
              errors.teamOneScore
                ? 'number-input-small ring-red-500 ring'
                : 'number-input-small'
            }
            min='0'
            max='15'
          />
          {errors.teamOneScore && formErrorHandler(errors.teamOneScore)}
        </div>
        <label className='row-start-7 col-start-1 col-end-3 text-center border-t py-4'>
          Team 2
        </label>
        <div className='row-start-8 col-start-1 text-center'>
          <select
            {...register('teamTwoPlayerOne', {
              required: true,
              validate: (value) => {
                if (
                  watch('teamOnePlayerTwo') === value ||
                  watch('teamOnePlayerOne') === value ||
                  watch('teamTwoPlayerTwo') === value
                ) {
                  return 'Duplicate player';
                }
              },
            })}
            className='dropdown'>
            <option value='' disabled>
              Player 1
            </option>
            {dropdownValues}
          </select>
          {errors.teamTwoPlayerOne && formErrorHandler(errors.teamTwoPlayerOne)}
        </div>
        <div className='row-start-8 col-start-2 text-center'>
          <select
            {...register('teamTwoPlayerTwo', {
              required: true,
              validate: (value) => {
                if (
                  watch('teamOnePlayerTwo') === value ||
                  watch('teamTwoPlayerOne') === value ||
                  watch('teamOnePlayerOne') === value
                ) {
                  return 'Duplicate player';
                }
              },
            })}
            className='dropdown'>
            <option value='' disabled>
              Player 2
            </option>
            {dropdownValues}
          </select>
          {errors.teamTwoPlayerTwo && formErrorHandler(errors.teamTwoPlayerTwo)}
        </div>
        <div className='row-start-9 col-start-1 text-center'>
          <label>Tings</label>
          <input
            {...register('teamTwoPlayerOneTings', { required: true })}
            type='number'
            className='number-input-small'
            min='0'
            max='15'
          />
        </div>
        <div className='row-start-9 col-start-2 text-center'>
          <label>Tings</label>
          <input
            {...register('teamTwoPlayerTwoTings', { required: true })}
            type='number'
            className='number-input-small'
            min='0'
            max='15'
          />
        </div>
        <div className='row-start-10 col-start-1 text-center'>
          <label>Sinks</label>
          <input
            {...register('teamTwoPlayerOneSinks', { required: true })}
            type='number'
            className='number-input-small'
            min='0'
            max='15'
          />
        </div>
        <div className='row-start-10 col-start-2 text-center'>
          <label>Sinks</label>
          <input
            {...register('teamTwoPlayerTwoSinks', { required: true })}
            type='number'
            className='number-input-small'
            min='0'
            max='15'
          />
        </div>
        <div className='row-start-11 col-start-1 col-end-3 text-center'>
          <label>Team 2 Score</label>
          <input
            {...register('teamTwoScore', {
              required: true,
              validate: (value) => {
                if (watch('teamOneScore') === value) {
                  return 'Team scores cannot be equal';
                }
              },
            })}
            type='number'
            className={
              errors.teamTwoScore
                ? 'number-input-small ring-red-500 ring'
                : 'number-input-small'
            }
            min='0'
            max='15'
          />
          {errors.teamTwoScore && formErrorHandler(errors.teamTwoScore)}
        </div>
        <div className=' row-start-12 col-start-1 col-end-3 text-center'>
          <input type='submit' className='btn-primary' />
        </div>
      </form>
    </div>
  );
};

export default LogGame;

// interface AddressProps {
//   onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
// }

// const Address = ({ onPlaceSelect }: AddressProps) => {
//   const [placeAutocomplete, setPlaceAutocomplete] =
//     useState<google.maps.places.Autocomplete | null>(null);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const places = useMapsLibrary('places');

//   useEffect(() => {
//     if (!places || !inputRef.current) return;

//     const options = {
//       fields: ['name', 'formatted_address']
//     };

//     setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
//   }, [places]);

//   useEffect(() => {
//     if (!placeAutocomplete) return;

//     placeAutocomplete.addListener('place_changed', () => {
//       onPlaceSelect(placeAutocomplete.getPlace());
//     });
//   }, [onPlaceSelect, placeAutocomplete]);

//   return (
//     <input
//       {...register('address', { required: true })}
//       className='input w-80'
//       placeholder='Enter Address'
//       ref={inputRef}
//     />
//   );
// };
