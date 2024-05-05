import { ApiKey } from '@queries/keys';
import { PaginationResponseType, isEmpty, responseWrapper } from '@shared';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { OrderRequestApi } from '.';
import { OrderRequestParams, OrderRequestResponse } from './type';

export function useGetAllOrderRequests(
  options?: UseQueryOptions<PaginationResponseType<OrderRequestResponse>, Error>,
) {
  const [params, setParams] = useState<OrderRequestParams>({});

  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetAllOrderRequests,
  } = useQuery<PaginationResponseType<OrderRequestResponse>, Error>(
    [ApiKey.ORDER_REQUEST, params],
    {
      queryFn: (query) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, ...params] = query.queryKey;
        return responseWrapper<PaginationResponseType<OrderRequestResponse>>(
          OrderRequestApi.getOrderRequests,
          params,
        );
      },
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !isEmpty(params),
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateOrderRequests = () => queryClient.invalidateQueries([ApiKey.ORDER_REQUEST]);

  const { data: orderRequests = [], hasNext, payloadSize, totalRecords } = data || {};

  return {
    orderRequests,
    hasNext,
    payloadSize,
    totalRecords,
    error,
    isError,
    isFetching,
    onGetAllOrderRequests,
    setParams,
    handleInvalidateOrderRequests,
  };
}
