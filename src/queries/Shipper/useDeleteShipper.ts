import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { responseWrapper } from '@shared';
import { DeleteShipperPayload } from './type';
import { ShipperApi } from '.';

export function useDeleteShipper(options?: UseMutationOptions<any, Error, DeleteShipperPayload>) {
  const handleDeleteShipper = (payload: DeleteShipperPayload) =>
    responseWrapper(ShipperApi.deleteShipper, [payload]);

  const { mutate: deleteShipper, isLoading } = useMutation<any, Error, DeleteShipperPayload>({
    mutationFn: handleDeleteShipper,
    ...options,
  });

  return {
    deleteShipper,
    isLoading,
  };
}
