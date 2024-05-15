import { SelectOption } from '@components';
import { ApiKey, ShipperApi, ShipperListParams, ShipperResponse } from '@queries';
import { PaginationResponseType, isEmpty, responseWrapper, useDebounce } from '@shared';
import { UseInfiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

const search = {
  take: 10,
  skip: 0,
};

const mapShipperOptions = (shipperList: ShipperResponse[]) =>
  shipperList.map((shipper) => ({
    label: `${shipper?.lastName} ${shipper?.firstName}`,
    value: shipper?.id,
  }));

export function useGetShipperLazy(
  options?: UseInfiniteQueryOptions<PaginationResponseType<ShipperResponse>, Error>,
) {
  const [inputSearch, setInputSearch] = useState<string>('');
  const [params, setParams] = useState<ShipperListParams>(null);
  const debounceSearch = useDebounce(inputSearch);
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: getShipperOptions,
    fetchNextPage,
  } = useInfiniteQuery<PaginationResponseType<ShipperResponse>, Error>(
    [ApiKey.USERS_LIST, 'shipper options', debounceSearch, { type: 'lazy' }],
    (props): Promise<PaginationResponseType<ShipperResponse>> => {
      const { pageParam = search } = props;

      return responseWrapper<PaginationResponseType<ShipperResponse>>(ShipperApi.getShipperList, [
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

  const shipperOptions: SelectOption[] = useMemo(() => {
    if (isEmpty(data?.pages)) return [];
    return data.pages.reduce(
      (state, page, _pageIdx) => [...state, ...mapShipperOptions(page.data)],
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
    shipperOptions,
    error,
    hasNext,
    isError,
    isLoading: isFetching,
    setInputSearch,
    getShipperOptions,
    fetchNextPage,
    setParams,
  };
}
