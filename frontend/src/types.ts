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

interface UserGame {
  against: number;
  for: number;
  gameId: number;
  id: number;
  position: number;
  sinks: number;
  team: number;
  tings: number;
  userId: number;
  win: boolean;
}

interface Games {
  id: number;
  date: string;
  location?: string;
  team1Score: number;
  team2Score: number;
  winningTeam: string;
  userGame: UserGame;
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
  games: Games[];
}
