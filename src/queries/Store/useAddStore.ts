import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { responseWrapper } from '@shared';
import { StorePayload } from './type';
import { StoreApi } from '.';

export function useAddStore(options?: UseMutationOptions<any, Error, StorePayload>) {
  const handleAddStore = (payload: StorePayload) => responseWrapper(StoreApi.addStore, [payload]);

  const { mutate: addStore, isLoading } = useMutation<any, Error, StorePayload>({
    mutationFn: handleAddStore,
    ...options,
  });

  return {
    addStore,
    isLoading,
  };
}
