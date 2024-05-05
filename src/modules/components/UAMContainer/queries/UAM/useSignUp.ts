import { SignUpResponse, SignUpPayload } from './type';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UAMApi } from '.';
import { responseWrapper } from '@shared';

export function useSignUp(options?: UseMutationOptions<SignUpResponse, Error, SignUpPayload>) {
  const {
    mutate: signup,
    isLoading,
    isSuccess,
  } = useMutation<SignUpResponse, Error, SignUpPayload>({
    mutationFn: (payload: SignUpPayload) => responseWrapper(UAMApi.signup, [payload]),
    ...options,
  });

  return {
    signup,
    isLoading,
    isSuccess,
  };
}
