import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { responseWrapper } from '@shared';
import { UpdateProfilePayload } from './type';
import { ProfileApi } from '.';

export function useUpdateProfile(options?: UseMutationOptions<any, Error, UpdateProfilePayload>) {
  const { mutate: updateProfile, isLoading } = useMutation<any, Error, UpdateProfilePayload>({
    mutationFn: (payload: UpdateProfilePayload) =>
      responseWrapper(ProfileApi.updateProfile, [payload]),
    ...options,
  });

  return {
    updateProfile,
    isLoading,
  };
}
