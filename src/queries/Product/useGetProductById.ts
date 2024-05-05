import { ApiKey, ProductApi, ProductResponse } from '@queries';
import { ApiResponseType, responseWrapper } from '@shared';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';

export function useGetProductById(
  options?: UseQueryOptions<ApiResponseType<ProductResponse>, Error, ProductResponse> & {
    id?: string;
  },
) {
  const {
    data: productData,
    error,
    isError,
    isFetching: isLoadingProduct,
    refetch: onGetProduct,
  } = useQuery<ApiResponseType<ProductResponse>, Error, ProductResponse>(
    [ApiKey.PRODUCTS, { id: options?.id }],
    {
      queryFn: (query) => {
        const [_, ...params] = query.queryKey;
        return responseWrapper<ApiResponseType<ProductResponse>>(ProductApi.getProductById, params);
      },
      enabled: !!options?.id,
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateProduct = (id: string) =>
    queryClient.invalidateQueries([ApiKey.PRODUCTS, { id }]);

  return {
    productData,
    error,
    isError,
    isLoadingProduct,
    onGetProduct,
    handleInvalidateProduct,
  };
}
