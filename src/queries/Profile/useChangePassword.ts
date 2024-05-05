import { ChangePasswordPayload } from '@components';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { responseWrapper } from '@shared';
import { ProfileApi } from '.';

export function useChangePassword(options?: UseMutationOptions<any, Error, ChangePasswordPayload>) {
  const {
    mutate: changePassword,
    isLoading,
    isSuccess,
  } = useMutation<any, Error, ChangePasswordPayload>({
    mutationFn: (payload: ChangePasswordPayload) =>
      responseWrapper(ProfileApi.changePassword, [payload]),
    ...options,
  });

  return {
    changePassword,
    isLoading,
    isSuccess,
  };
}
