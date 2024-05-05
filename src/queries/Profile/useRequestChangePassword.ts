import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { responseWrapper } from '@shared';
import { ProfileApi } from '.';

export function useRequestChangePassword(options?: UseMutationOptions<any, Error, any>) {
  const {
    mutate: requestChangePassword,
    isLoading,
    isSuccess,
  } = useMutation<any, Error, any>({
    mutationFn: (payload: any) => responseWrapper(ProfileApi.requestChangePassword),
    ...options,
  });

  return {
    requestChangePassword,
    isLoading,
    isSuccess,
  };
}
