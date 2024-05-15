import { useState } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { ShipperApi, ShipperResponse } from '.';
import { isEmpty, PaginationResponseType, responseWrapper } from 'src/modules/shared';
import { ApiKey } from '../keys';
import { GetPropertiesParams } from '@queries/Staff';

export function useGetAllShipper(
  options?: UseQueryOptions<PaginationResponseType<ShipperResponse>, Error>,
) {
  const [params, setParams] = useState<GetPropertiesParams>({});
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetAllShippers,
  } = useQuery<PaginationResponseType<ShipperResponse>, Error>([ApiKey.USERS_LIST, params], {
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseType<ShipperResponse>>(ShipperApi.getShipperList, params);
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    keepPreviousData: true,
    enabled: !isEmpty(params),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateAllShippers = () => queryClient.invalidateQueries([ApiKey.USERS_LIST]);

  const { data: shippers = [], hasNext, payloadSize, totalRecords } = data || {};

  return {
    shippers,
    hasNext,
    payloadSize,
    totalRecords,
    error,
    isError,
    isFetching,
    onGetAllShippers,
    setParams,
    handleInvalidateAllShippers,
  };
}
