import { ApiKey } from '@queries/keys';
import { PaginationResponseType, isEmpty, responseWrapper } from '@shared';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { InvoiceListParams, InvoiceResponse } from './type';
import { InvoiceApi } from '.';

export function useGetAllInvoices(
  options?: UseQueryOptions<PaginationResponseType<InvoiceResponse>, Error>,
) {
  const [params, setParams] = useState<InvoiceListParams>({});

  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetAllInvoices,
  } = useQuery<PaginationResponseType<InvoiceResponse>, Error>([ApiKey.INVOICE, params], {
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseType<InvoiceResponse>>(
        InvoiceApi.getInvoiceList,
        params,
      );
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    keepPreviousData: true,
    enabled: !isEmpty(params),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateInvoiceList = () => queryClient.invalidateQueries([ApiKey.INVOICE]);

  const { data: invoices = [], hasNext, payloadSize, totalRecords } = data || {};

  return {
    invoices,
    hasNext,
    payloadSize,
    totalRecords,
    error,
    isError,
    isFetching,
    onGetAllInvoices,
    setParams,
    handleInvalidateInvoiceList,
  };
}
