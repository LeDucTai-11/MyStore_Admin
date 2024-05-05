import profileApi from './profileApi';

export * from './type';
export * from './useChangePassword';
export * from './useGetProfile';
export * from './useRequestChangePassword';
export * from './useUpdateProfile';

export const ProfileApi = profileApi.create();
