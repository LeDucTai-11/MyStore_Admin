import { PaginationResponseType, isEmpty, responseWrapper, useDebounce } from '@shared';
import { useMemo, useState } from 'react';
import { UseInfiniteQueryOptions, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { SelectOption, TableParams } from '@components';
import { ApiKey } from '@queries';
import { StoreResponse } from './type';
import { StoreApi } from '.';

const search = {
  take: 10,
  skip: 0,
};

const mapStoreOptions = (stores: StoreResponse[]) =>
  stores.map((store) => ({
    label: store?.address,
    value: store?.id,
  }));

export function useGetAllStoreLazy(
  options?: UseInfiniteQueryOptions<PaginationResponseType<StoreResponse>, Error>,
) {
  const [inputSearch, setInputSearch] = useState<string>('');
  const [params, setParams] = useState<TableParams>(null);
  const debounceSearch = useDebounce(inputSearch);
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: getStoreOptions,
    fetchNextPage,
  } = useInfiniteQuery<PaginationResponseType<StoreResponse>, Error>(
    [ApiKey.STORE, 'options', debounceSearch, { type: 'lazy' }],
    (props): Promise<PaginationResponseType<StoreResponse>> => {
      const { pageParam = search } = props;

      return responseWrapper<PaginationResponseType<StoreResponse>>(StoreApi.getStoreList, [
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

  const storeOptions: SelectOption[] = useMemo(() => {
    if (isEmpty(data?.pages)) return [];
    return data.pages.reduce(
      (state, page, _pageIdx) => [...state, ...mapStoreOptions(page.data)],
      [],
    );
  }, [data]);

  const hasNext = useMemo(() => {
    if (isEmpty(data?.pages)) return null;
    return data.pages[data.pages.length - 1]?.hasNext;
  }, [data]);

  const queryClient = useQueryClient();

  const handleInvalidateStores = () => queryClient.invalidateQueries([ApiKey.STORE]);

  return {
    data,
    storeOptions,
    error,
    hasNext,
    isError,
    loading: isFetching,
    setInputSearch,
    getStoreOptions,
    fetchNextPage,
    setParams,
    handleInvalidateStores,
  };
}
