import { useState } from 'react';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { PaginationResponseType, isEmpty, responseWrapper } from '@shared';
import { ApiKey } from '@queries/keys';
import { StoreListParams, StoreResponse } from './type';
import { StoreApi } from '.';

export function useGetAllStores(
  options?: UseQueryOptions<PaginationResponseType<StoreResponse>, Error>,
) {
  const [params, setParams] = useState<StoreListParams>({});

  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetAllStores,
  } = useQuery<PaginationResponseType<StoreResponse>, Error>([ApiKey.STORE, params], {
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseType<StoreResponse>>(StoreApi.getStoreList, params);
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    keepPreviousData: true,
    enabled: !isEmpty(params),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateStoreList = () => queryClient.invalidateQueries([ApiKey.STORE]);

  const { data: stores = [], hasNext, payloadSize, totalRecords } = data || {};

  return {
    stores,
    hasNext,
    payloadSize,
    totalRecords,
    error,
    isError,
    isFetching,
    onGetAllStores,
    setParams,
    handleInvalidateStoreList,
  };
}
