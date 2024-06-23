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
  confirmPassword: string;
}
