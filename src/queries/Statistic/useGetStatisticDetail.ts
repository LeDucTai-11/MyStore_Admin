import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiResponseType, isEmpty, responseWrapper } from '@shared';
import { ApiKey } from '@queries/keys';
import { GetStatisticDetailResponse, StatisticApi, StatisticDetailFilterParams } from '.';
import { useState } from 'react';

export function useGetStatisticDetail(
  options?: UseQueryOptions<
    ApiResponseType<GetStatisticDetailResponse>,
    Error,
    GetStatisticDetailResponse
  >,
) {
  const [params, setParams] = useState<StatisticDetailFilterParams>(null);

  const { data, error, isError, isFetching, isSuccess } = useQuery<
    ApiResponseType<GetStatisticDetailResponse>,
    Error,
    GetStatisticDetailResponse
  >([ApiKey.STATISTIC, params], {
    queryFn: (query) => {
      const [_, ...params] = query.queryKey;

      return responseWrapper<ApiResponseType<GetStatisticDetailResponse>>(
        StatisticApi.getStatisticDetail,
        [...params],
      );
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    enabled: !isEmpty(params),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateStatisticDetail = () => {
    queryClient.invalidateQueries([ApiKey.STATISTIC]);
  };

  return {
    data,
    error,
    isError,
    isFetching,
    isSuccess,
    handleInvalidateStatisticDetail,
    setParams,
    params,
  };
}
