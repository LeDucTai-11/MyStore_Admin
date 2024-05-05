import { QueryFunction, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ApiKey } from '../keys';
import { ApiResponseType, Callback, responseWrapper } from '@shared';
import { GetVoucherDetailResponse } from './types';
import { VoucherApi } from '.';

export function useGetVoucherDetail(
  options?: UseQueryOptions<
    ApiResponseType<GetVoucherDetailResponse>,
    Error,
    GetVoucherDetailResponse
  > & {
    id: string;
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
  },
) {
  const handleGetContactDetail: QueryFunction<ApiResponseType<GetVoucherDetailResponse>> = () =>
    responseWrapper<ApiResponseType<GetVoucherDetailResponse>>(VoucherApi.getVoucherDetail, [
      options.id,
    ]);

  const {
    data,
    error,
    isError,
    isRefetching: isLoading,
    isSuccess,
  } = useQuery<ApiResponseType<GetVoucherDetailResponse>, Error, GetVoucherDetailResponse>(
    [ApiKey.VOUCHER, options.id],
    {
      queryFn: handleGetContactDetail,
      notifyOnChangeProps: ['data', 'isFetching'],
      enabled: !!options.id,
      ...options,
    },
  );

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

  const queryClient = useQueryClient();

  const handleInvalidateVoucherDetail = () =>
    queryClient.invalidateQueries([ApiKey.VOUCHER, options.id]);

  return {
    voucherDetail: data,
    isError,
    error,
    isLoading: isLoading,
    isSuccess,
    handleInvalidateVoucherDetail,
  };
}
