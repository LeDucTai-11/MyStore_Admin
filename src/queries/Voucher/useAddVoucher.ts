import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { GetVouchersResponse, VoucherPayload } from './types';
import { VoucherApi } from '.';
import { responseWrapper } from '@shared';

// < return Data, Error, Payload Type, Context Types >
export function useAddVoucher(
  options?: UseMutationOptions<GetVouchersResponse, Error, VoucherPayload>,
) {
  const { mutate, isLoading } = useMutation<GetVouchersResponse, Error, VoucherPayload>({
    mutationFn: (payload: VoucherPayload) => responseWrapper(VoucherApi.addVoucher, [payload]),
    ...options,
  });

  return {
    addVoucher: mutate,
    isLoading,
  };
}
