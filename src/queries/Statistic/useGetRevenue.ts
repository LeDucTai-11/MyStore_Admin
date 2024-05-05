import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiResponseType, isEmpty, responseWrapper } from '@shared';
import { ApiKey } from '@queries/keys';
import { GetRevenueResponse, StatisticApi } from '.';
import { useMemo } from 'react';

export function useGetRevenue(
  options?: UseQueryOptions<ApiResponseType<any>, Error, any> & {
    timeStatisticType?: string;
  },
) {
  const { data, error, isError, isFetching, isSuccess } = useQuery<
    ApiResponseType<any>,
    Error,
    any
  >([ApiKey.REVENUE, { timeStatisticType: options?.timeStatisticType }], {
    queryFn: () =>
      responseWrapper<ApiResponseType<any>>(StatisticApi.getRevenue, [options?.timeStatisticType]),
    notifyOnChangeProps: ['data', 'isFetching'],
    enabled: !isEmpty(options?.timeStatisticType),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateRevenue = (timeStatisticType: string) => {
    queryClient.invalidateQueries([ApiKey.REVENUE, { timeStatisticType }]);
  };

  const response = useMemo(() => {
    return data
      ? (Object.entries(data).map(([key, value]) => {
          return {
            [key]: value,
          };
        }) as GetRevenueResponse[])
      : [];
  }, [data]);

  return {
    data: response,
    error,
    isError,
    isFetching,
    isSuccess,
    handleInvalidateRevenue,
  };
}
