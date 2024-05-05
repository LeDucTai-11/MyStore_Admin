import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiResponseType, isEmpty, responseWrapper } from '@shared';
import { OrderResponse } from './type';
import { ApiKey } from '@queries/keys';
import { OrderApi } from '.';

export function useGetOrderDetails(
  options?: UseQueryOptions<ApiResponseType<OrderResponse>, Error, OrderResponse> & {
    orderId?: string;
  },
) {
  const {
    data: order,
    error,
    isError,
    isFetching,
    isSuccess,
  } = useQuery<ApiResponseType<OrderResponse>, Error, OrderResponse>(
    [ApiKey.ORDER, { id: options?.orderId }],
    {
      queryFn: () =>
        responseWrapper<ApiResponseType<OrderResponse>>(OrderApi.getOrderDetails, [
          options?.orderId,
        ]),
      notifyOnChangeProps: ['data'],
      enabled: !isEmpty(options?.orderId),
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateOrderDetails = (orderId: string) => {
    queryClient.invalidateQueries([ApiKey.ORDER, { id: orderId }]);
  };

  return {
    order,
    error,
    isError,
    isFetching,
    isSuccess,
    handleInvalidateOrderDetails,
  };
}
