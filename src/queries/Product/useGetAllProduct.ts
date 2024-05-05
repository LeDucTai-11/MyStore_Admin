import { useState } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { isEmpty, PaginationResponseType, responseWrapper } from 'src/modules/shared';
import { ApiKey } from '../keys';
import { GetPropertiesParams, ProductApi, ProductResponse } from '@queries';
import toastify from '@shared/services/toastify';

export function useGetAllProduct(
  options?: UseQueryOptions<PaginationResponseType<ProductResponse>, Error>,
) {
  const [params, setParams] = useState<GetPropertiesParams>({});
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetAllProducts,
  } = useQuery<PaginationResponseType<ProductResponse>, Error>([ApiKey.PRODUCTS, params], {
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseType<ProductResponse>>(
        ProductApi.getProductList,
        params,
      );
    },
    onError: (error) => {
      toastify.error(error.message);
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    keepPreviousData: true,
    enabled: !isEmpty(params),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateAllProducts = () => queryClient.invalidateQueries([ApiKey.PRODUCTS]);

  const { data: products = [], hasNext, payloadSize, totalRecords } = data || {};

  return {
    products,
    hasNext,
    payloadSize,
    totalRecords,
    error,
    isError,
    isFetching,
    onGetAllProducts,
    setParams,
    handleInvalidateAllProducts,
  };
}
