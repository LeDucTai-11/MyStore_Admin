import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { responseWrapper } from '@shared';
import { StorePayload } from './type';
import { StoreApi } from '.';

export function useDeleteStore(options?: UseMutationOptions<any, Error, StorePayload>) {
  const handleDeleteStore = (payload: StorePayload) =>
    responseWrapper(StoreApi.deleteStore, [payload]);

  const { mutate: deleteStore, isLoading } = useMutation<any, Error, StorePayload>({
    mutationFn: handleDeleteStore,
    ...options,
  });

  return {
    deleteStore,
    isLoading,
  };
}
