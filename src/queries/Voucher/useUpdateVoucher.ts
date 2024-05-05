import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { GetVouchersResponse, VoucherPayload } from './types';
import { VoucherApi } from '.';
import { responseWrapper } from '@shared';

// < return Data, Error, Payload Type, Context Types >
export function useUpdateVoucher(
  options?: UseMutationOptions<GetVouchersResponse, Error, VoucherPayload>,
) {
  const { mutate, isLoading } = useMutation<GetVouchersResponse, Error, VoucherPayload>({
    mutationFn: (payload: VoucherPayload) => responseWrapper(VoucherApi.updateVoucher, [payload]),
    ...options,
  });

  return {
    updateVoucher: mutate,
    isLoading,
  };
}
