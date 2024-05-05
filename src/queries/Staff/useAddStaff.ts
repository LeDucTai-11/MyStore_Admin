import { responseWrapper } from '@shared';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { StaffApi } from '.';
import { AddStaffPayload } from './type';

export function useAddStaff(options?: UseMutationOptions<any, Error, AddStaffPayload>) {
  const handleAddStaff = (payload: AddStaffPayload) =>
    responseWrapper(StaffApi.addStaff, [payload]);

  const { mutate: addStaff, isLoading } = useMutation<any, Error, AddStaffPayload>({
    mutationFn: handleAddStaff,
    onSuccess: () => {},
    ...options,
  });

  return {
    addStaff,
    isLoading,
  };
}
