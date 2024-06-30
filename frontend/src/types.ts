export interface UserSigninInput {
  email: string;
  password: string;
}

export interface UserSignupInput {
  fname: string;
  lname: string;
  dob: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface UserProps extends UserSignupInput {
  id: number;
}

export interface UserNameDropdownProps {
  id: number;
  name: string;
}

export interface LogGameData {
  dateOfGame: string;
  address: string | null;
  teamOnePlayerOne: string | null;
  teamOnePlayerTwo: string | null;
  teamTwoPlayerOne: string | null;
  teamTwoPlayerTwo: string | null;
  teamOnePlayerOneTings: string | number;
  teamOnePlayerTwoTings: string | number;
  teamTwoPlayerOneTings: string | number;
  teamTwoPlayerTwoTings: string | number;
  teamOnePlayerOneSinks: string | number;
  teamOnePlayerTwoSinks: string | number;
  teamTwoPlayerOneSinks: string | number;
  teamTwoPlayerTwoSinks: string | number;
  teamOneScore: string | null;
  teamTwoScore: string | null;
}

export interface ProfileData {
  id: number;
  fname: string;
  lname: string;
  userStat: {
    pointsAgainst: number;
    pointsFor: number;
    totalGames: number;
    totalLosses: number;
    totalSinks: number;
    totalTings: number;
    totalWins: number;
  };
}
