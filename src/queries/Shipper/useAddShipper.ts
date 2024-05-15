import { responseWrapper } from '@shared';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ShipperApi } from '.';
import { AddShipperPayload } from './type';

export function useAddShipper(options?: UseMutationOptions<any, Error, AddShipperPayload>) {
  const handleAddShipper = (payload: AddShipperPayload) =>
    responseWrapper(ShipperApi.addShipper, [payload]);

  const { mutate: addShipper, isLoading } = useMutation<any, Error, AddShipperPayload>({
    mutationFn: handleAddShipper,
    onSuccess: () => {},
    ...options,
  });

  return {
    addShipper,
    isLoading,
  };
}
