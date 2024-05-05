import { UserProfileType } from '@components';

export type UpdateProfilePayload = {
  email: string;
  firstName: string;
  lastName: string;
  gender: number | 1 | 0;
  address: string;
  phone: string;
  avatarUrl: string;
};

export type ProfileResponse = UserProfileType;
