import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { responseWrapper } from '@shared';
import { StorePayload } from './type';
import { StoreApi } from '.';

export function useUpdateStore(options?: UseMutationOptions<any, Error, StorePayload>) {
  const handleUpdateStore = (payload: StorePayload) =>
    responseWrapper(StoreApi.updateStore, [payload]);

  const { mutate: updateStore, isLoading } = useMutation<any, Error, StorePayload>({
    mutationFn: handleUpdateStore,
    ...options,
  });

  return {
    updateStore,
    isLoading,
  };
}
