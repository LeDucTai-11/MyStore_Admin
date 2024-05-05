/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductApi, ProductPayload } from '@queries';
import { responseWrapper } from '@shared';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export function useUpdateProduct(options?: UseMutationOptions<any, Error, ProductPayload>) {
  const {
    mutate: onUpdateProduct,
    isLoading: isUpdating,
    isSuccess,
    isError,
    error,
  } = useMutation<any, Error, ProductPayload>({
    mutationFn: (payload: ProductPayload) => responseWrapper(ProductApi.updateProduct, [payload]),
    ...options,
  });

  return {
    onUpdateProduct,
    isUpdating,
    isSuccess,
    isError,
    error,
  };
}
