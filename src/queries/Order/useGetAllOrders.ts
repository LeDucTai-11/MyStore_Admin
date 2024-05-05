import { ApiKey } from '@queries/keys';
import { PaginationResponseType, isEmpty, responseWrapper } from '@shared';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { OrderApi } from '.';
import { OrderListParams, OrderResponse } from './type';

export function useGetAllOrders(
  options?: UseQueryOptions<PaginationResponseType<OrderResponse>, Error>,
) {
  const [params, setParams] = useState<OrderListParams>({});

  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetAllOrders,
  } = useQuery<PaginationResponseType<OrderResponse>, Error>([ApiKey.ORDER, params], {
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseType<OrderResponse>>(OrderApi.getOrderList, params);
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    keepPreviousData: true,
    enabled: !isEmpty(params),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateOrderList = () => queryClient.invalidateQueries([ApiKey.ORDER]);

  const { data: orders = [], hasNext, payloadSize, totalRecords } = data || {};

  return {
    orders,
    hasNext,
    payloadSize,
    totalRecords,
    error,
    isError,
    isFetching,
    onGetAllOrders,
    setParams,
    handleInvalidateOrderList,
  };
}
