/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductApi, ProductPayload } from '@queries';
import { responseWrapper } from '@shared';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export function useAddNewProduct(options?: UseMutationOptions<any, Error, ProductPayload>) {
  const {
    mutate: onAddNewProduct,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<any, Error, ProductPayload>({
    mutationFn: (payload: ProductPayload) => responseWrapper(ProductApi.addNewProduct, [payload]),
    ...options,
  });

  return {
    onAddNewProduct,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
