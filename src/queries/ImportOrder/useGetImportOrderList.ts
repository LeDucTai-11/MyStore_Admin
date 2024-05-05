import { useState } from 'react';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { PaginationResponseType, isEmpty, responseWrapper } from '@shared';
import { ApiKey } from '@queries/keys';
import { ImportOrderListParams, ImportOrderListResponse } from './type';
import { ImportOrderApi } from '.';

export function useGetImportOrderList(
  options?: UseQueryOptions<PaginationResponseType<ImportOrderListResponse>, Error>,
) {
  const [params, setParams] = useState<ImportOrderListParams>({});

  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetAllImportOrders,
  } = useQuery<PaginationResponseType<ImportOrderListResponse>, Error>(
    [ApiKey.IMPORT_ORDER, params],
    {
      queryFn: (query) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, ...params] = query.queryKey;
        return responseWrapper<PaginationResponseType<ImportOrderListResponse>>(
          ImportOrderApi.getImportOrderList,
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

  const handleInvalidateImportOrderList = () =>
    queryClient.invalidateQueries([ApiKey.IMPORT_ORDER]);

  const { data: importOrders = [], hasNext, payloadSize, totalRecords } = data || {};

  return {
    importOrders,
    hasNext,
    payloadSize,
    totalRecords,
    error,
    isError,
    isFetching,
    onGetAllImportOrders,
    setParams,
    handleInvalidateImportOrderList,
  };
}
