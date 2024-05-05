import uamApi from './uamApi';

export * from './type';
export * from './useLogin';
export * from './useSignUp';
export * from './useForgotPassword';
export * from './useResetPassword';

export const UAMApi = uamApi.create();
