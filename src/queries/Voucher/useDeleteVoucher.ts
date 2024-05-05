import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { GetVouchersResponse, DeleteVoucherPayload } from './types';
import { responseWrapper } from '@shared';
import { VoucherApi } from '.';
// < return Data, Error, Payload Type, Context Types >
export function useDeleteVoucher(
  options?: UseMutationOptions<GetVouchersResponse, Error, DeleteVoucherPayload>,
) {
  const { mutate, isLoading } = useMutation<GetVouchersResponse, Error, DeleteVoucherPayload>({
    mutationFn: (payload: DeleteVoucherPayload) =>
      responseWrapper(VoucherApi.deleteVoucher, [payload]),
    ...options,
  });

  return {
    deleteVoucher: mutate,
    isLoading,
  };
}
