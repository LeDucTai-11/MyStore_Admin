import { SelectOption } from '@components';
import { ApiKey, StaffApi, StaffListParams, StaffResponse } from '@queries';
import { PaginationResponseType, isEmpty, responseWrapper, useDebounce } from '@shared';
import { UseInfiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

const search = {
  take: 10,
  skip: 0,
};

const mapStaffOptions = (staffList: StaffResponse[]) =>
  staffList.map((staff) => ({
    label: `${staff?.lastName} ${staff?.firstName}`,
    value: staff?.id,
  }));

export function useGetStaffLazy(
  options?: UseInfiniteQueryOptions<PaginationResponseType<StaffResponse>, Error>,
) {
  const [inputSearch, setInputSearch] = useState<string>('');
  const [params, setParams] = useState<StaffListParams>(null);
  const debounceSearch = useDebounce(inputSearch);
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: getStaffOptions,
    fetchNextPage,
  } = useInfiniteQuery<PaginationResponseType<StaffResponse>, Error>(
    [ApiKey.USERS_LIST, 'staff options', debounceSearch, { type: 'lazy' }],
    (props): Promise<PaginationResponseType<StaffResponse>> => {
      const { pageParam = search } = props;

      return responseWrapper<PaginationResponseType<StaffResponse>>(StaffApi.getStaffList, [
        { ...pageParam, ...params, search: inputSearch },
      ]);
    },
    {
      keepPreviousData: true,
      getNextPageParam(lastPage, allPages) {
        if (lastPage.data?.length < 10) return undefined;
        return {
          take: 10,
          skip: allPages.length * 10,
        };
      },
      notifyOnChangeProps: ['data', 'isFetching'],
      enabled: !!params,
      ...options,
    },
  );

  const staffOptions: SelectOption[] = useMemo(() => {
    if (isEmpty(data?.pages)) return [];
    return data.pages.reduce(
      (state, page, _pageIdx) => [...state, ...mapStaffOptions(page.data)],
      [],
    );
  }, [data]);

  const hasNext = useMemo(() => {
    if (isEmpty(data?.pages)) return null;
    return data.pages[data.pages.length - 1]?.hasNext;
  }, [data]);

  return {
    data,
    params,
    staffOptions,
    error,
    hasNext,
    isError,
    isLoading: isFetching,
    setInputSearch,
    getStaffOptions,
    fetchNextPage,
    setParams,
  };
}
