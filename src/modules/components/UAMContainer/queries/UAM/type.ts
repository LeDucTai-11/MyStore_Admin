import { UserProfileType } from '@components';

export type ForgotPasswordPayload = {
  email: string;
};

export type ChangePasswordPayload = {
  tokenResetPassword: string;
  newPassword: string;
};

export type SignInPayload = {
  username: string;
  password: string;
};

export type SignInResponse = {
  accessToken: string;
};

export type SignUpResponse = SignInResponse;

export type SignUpPayload = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: 1 | 0 | number;
};
