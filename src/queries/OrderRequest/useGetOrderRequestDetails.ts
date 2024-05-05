import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiResponseType, isEmpty, responseWrapper } from '@shared';
import { ApiKey } from '@queries/keys';
import { OrderRequestResponse } from './type';
import { OrderRequestApi } from '.';

export function useGetOrderRequestDetails(
  options?: UseQueryOptions<ApiResponseType<OrderRequestResponse>, Error, OrderRequestResponse> & {
    orderRequestId?: string;
  },
) {
  const {
    data: orderRequest,
    error,
    isError,
    isFetching,
    isSuccess,
  } = useQuery<ApiResponseType<OrderRequestResponse>, Error, OrderRequestResponse>(
    [ApiKey.ORDER_REQUEST, { id: options?.orderRequestId }],
    {
      queryFn: () =>
        responseWrapper<ApiResponseType<OrderRequestResponse>>(
          OrderRequestApi.getOrderRequestDetails,
          [options?.orderRequestId],
        ),
      notifyOnChangeProps: ['data'],
      enabled: !isEmpty(options?.orderRequestId),
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateOrderRequestDetails = (orderRequestId: string) => {
    queryClient.invalidateQueries([ApiKey.ORDER_REQUEST, { id: orderRequestId }]);
  };

  return {
    orderRequest,
    error,
    isError,
    isFetching,
    isSuccess,
    handleInvalidateOrderRequestDetails,
  };
}
