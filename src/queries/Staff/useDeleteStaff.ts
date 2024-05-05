import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { responseWrapper } from '@shared';
import { DeleteStaffPayload } from './type';
import { StaffApi } from '.';

export function useDeleteStaff(options?: UseMutationOptions<any, Error, DeleteStaffPayload>) {
  const handleDeleteStaff = (payload: DeleteStaffPayload) =>
    responseWrapper(StaffApi.deleteStaff, [payload]);

  const { mutate: deleteStaff, isLoading } = useMutation<any, Error, DeleteStaffPayload>({
    mutationFn: handleDeleteStaff,
    ...options,
  });

  return {
    deleteStaff,
    isLoading,
  };
}
