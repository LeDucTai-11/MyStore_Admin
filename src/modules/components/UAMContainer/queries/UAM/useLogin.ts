import { SignInPayload, SignInResponse } from './type';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UAMApi } from '.';
import { responseWrapper } from '@shared';

export function useLogin(options?: UseMutationOptions<SignInResponse, Error, SignInPayload>) {
  const {
    mutate: login,
    isLoading,
    isSuccess,
  } = useMutation<SignInResponse, Error, SignInPayload>({
    mutationFn: (payload: SignInPayload) => responseWrapper(UAMApi.login, [payload]),
    ...options,
  });

  return {
    login,
    isLoading,
    isSuccess,
  };
}
