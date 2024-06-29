import axios from 'axios';
import { UserProps } from '../types.ts';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const getUserNames = async () => {
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

export default getUserNames;
