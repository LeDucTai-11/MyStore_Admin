import { PaginationResponseType, responseWrapper, Callback } from '@shared';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { ApiKey } from '..';
import { GetVouchersResponse } from './types';
import { TableParams } from '@components';
import { VoucherApi } from '.';

export function useGetVouchers(
  options?: UseQueryOptions<PaginationResponseType<GetVouchersResponse>, Error> & {
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
  },
) {
  const [params, setParams] = useState<TableParams>({});
  const { data, error, isSuccess, isError, isFetching } = useQuery<
    PaginationResponseType<GetVouchersResponse>,
    Error
  >([ApiKey.VOUCHER, params], {
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseType<GetVouchersResponse>>(
        VoucherApi.getVouchers,
        params,
      );
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    keepPreviousData: true,
    enabled: !isEmpty(params),
    ...options,
  });

  useEffect(() => {
    if (data && isSuccess) {
      if (options?.onSuccessCallback) {
        options.onSuccessCallback(data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) {
      if (options?.onErrorCallback) {
        options.onErrorCallback(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  const { data: vouchers = [], totalRecords } = data || {};

  const queryClient = useQueryClient();

  const handleInvalidateVouchers = () => queryClient.invalidateQueries([ApiKey.VOUCHER]);

  return {
    vouchers,
    totalRecords,
    error,
    isSuccess,
    isFetching,
    setParams,
    handleInvalidateVouchers,
  };
}
