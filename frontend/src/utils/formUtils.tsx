import axios from 'axios';
import { LogGameData, UserProps } from '../types.ts';
import { FieldError } from 'react-hook-form';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const getUserNames = async () => {
  const users = await axios.get(`${apiBaseUrl}/api/users`);
  return await users.data.map((user: UserProps) => {
    const first =
      user.fname.charAt(0).toUpperCase() +
      user.fname.substring(1).toLowerCase();
    const last =
      user.lname.charAt(0).toUpperCase() +
      user.lname.substring(1).toLowerCase();
    return {
      name: `${first} ${last}`,
      id: user.id,
    };
  });
};

export const formErrorHandler = (error: FieldError) => {
  if (error.type === 'required') {
    return <p className={'error-text mb-3'}>This field is required.</p>;
  }

  if (error.message === 'Duplicate player') {
    return <p className={'error-text mb-3'}>Duplicate Player.</p>;
  }

  if (error.message === 'Team scores cannot be equal') {
    return <p className={'error-text mb-3'}>Team scores cannot be equal.</p>;
  }

  return <p className={'error-text opacity-0'}>This field is required.</p>;
};

export const organiseFormData = (data: LogGameData) => {
  return {
    dateOfGame: data.dateOfGame,
    address: data.address,
    players: [
      {
        id: data.teamOnePlayerOne && +data.teamOnePlayerOne,
        team: 1,
        position: 1,
        tings: data.teamOnePlayerOneTings && +data.teamOnePlayerOneTings,
        sinks: data.teamOnePlayerOneSinks && +data.teamOnePlayerOneSinks,
      },
      {
        id: data.teamOnePlayerTwo && +data.teamOnePlayerTwo,
        team: 1,
        position: 2,
        tings: data.teamOnePlayerTwoTings && +data.teamOnePlayerTwoTings,
        sinks: data.teamOnePlayerTwoSinks && +data.teamOnePlayerTwoSinks,
      },
      {
        id: data.teamTwoPlayerOne && +data.teamTwoPlayerOne,
        team: 2,
        position: 1,
        tings: data.teamTwoPlayerOneTings && +data.teamTwoPlayerOneTings,
        sinks: data.teamTwoPlayerOneSinks && +data.teamTwoPlayerOneSinks,
      },
      {
        id: data.teamTwoPlayerTwo && +data.teamTwoPlayerTwo,
        team: 2,
        position: 2,
        tings: data.teamTwoPlayerTwoTings && +data.teamTwoPlayerTwoTings,
        sinks: data.teamTwoPlayerTwoSinks && +data.teamTwoPlayerTwoSinks,
      },
    ],
    teamOneScore: data.teamOneScore && +data.teamOneScore,
    teamTwoScore: data.teamTwoScore && +data.teamTwoScore,
  };
};
