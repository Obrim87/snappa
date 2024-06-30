export interface UserType {
  id: number;
  fname: string;
  lname: string;
  email: string;
  password: string;
  admin: boolean;
}

interface LogGameDataPlayer {
  id: number;
  team: number;
  position: number;
  tings: number;
  sinks: number;
}

export interface LogGameData {
  dateOfGame: string;
  address?: string;
  players: LogGameDataPlayer[];
  teamOneScore: number;
  teamTwoScore: number;
}
