/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteProductPayload, ProductApi } from '@queries';
import { responseWrapper } from '@shared';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export function useDeleteProduct(options?: UseMutationOptions<any, Error, DeleteProductPayload>) {
  const {
    mutate: onDeleteProduct,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<any, Error, DeleteProductPayload>({
    mutationFn: (payload: DeleteProductPayload) =>
      responseWrapper(ProductApi.deleteProduct, [payload]),
    ...options,
  });

  return {
    onDeleteProduct,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
