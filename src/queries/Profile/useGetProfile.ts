import { QueryFunction, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ApiKey } from '../keys';
import { ApiResponseType, Callback, responseWrapper } from '@shared';
import { ProfileResponse } from '.';
import { ProfileApi } from '.';

export function useGetProfile(
  options?: UseQueryOptions<ApiResponseType<ProfileResponse>, Error, ProfileResponse> & {
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
  },
) {
  const handleGetProfile: QueryFunction<ApiResponseType<ProfileResponse>> = () =>
    responseWrapper<ApiResponseType<ProfileResponse>>(ProfileApi.getProfile);

  const {
    data,
    error,
    isError,
    isFetching: isLoading,
    isSuccess,
  } = useQuery<ApiResponseType<ProfileResponse>, Error, ProfileResponse>([ApiKey.PROFILE], {
    queryFn: handleGetProfile,
    notifyOnChangeProps: ['data', 'isFetching'],
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

  const queryClient = useQueryClient();

  const handleInvalidateProfile = () => queryClient.invalidateQueries([ApiKey.PROFILE]);

  return {
    profile: data,
    isError,
    error,
    isLoading: isLoading,
    isSuccess,
    handleInvalidateProfile,
  };
}
