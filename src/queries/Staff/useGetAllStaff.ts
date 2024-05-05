import { useState } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { GetPropertiesParams, StaffApi, StaffResponse } from '.';
import { isEmpty, PaginationResponseType, responseWrapper } from 'src/modules/shared';
import { ApiKey } from '../keys';

export function useGetAllStaff(
  options?: UseQueryOptions<PaginationResponseType<StaffResponse>, Error>,
) {
  const [params, setParams] = useState<GetPropertiesParams>({});
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetAllStaffs,
  } = useQuery<PaginationResponseType<StaffResponse>, Error>([ApiKey.USERS_LIST, params], {
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseType<StaffResponse>>(StaffApi.getStaffList, params);
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    keepPreviousData: true,
    enabled: !isEmpty(params),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateAllStaffs = () => queryClient.invalidateQueries([ApiKey.USERS_LIST]);

  const { data: staffs = [], hasNext, payloadSize, totalRecords } = data || {};

  return {
    staffs,
    hasNext,
    payloadSize,
    totalRecords,
    error,
    isError,
    isFetching,
    onGetAllStaffs,
    setParams,
    handleInvalidateAllStaffs,
  };
}
