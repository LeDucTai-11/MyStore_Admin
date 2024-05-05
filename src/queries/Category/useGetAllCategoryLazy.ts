import { PaginationResponseType, isEmpty, responseWrapper, useDebounce } from '@shared';
import { useMemo, useState } from 'react';
import { UseInfiniteQueryOptions, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { CategoryListResponse } from './type';
import { SelectOption, TableParams } from '@components';
import { ApiKey } from '@queries';
import { CategoryApi } from '.';

const search = {
  take: 10,
  skip: 0,
};

const mapCategoryOptions = (categories: CategoryListResponse[]) =>
  categories.map((category) => ({
    label: category?.name,
    value: category?.id,
  }));

export function useGetAllCategoryLazy(
  options?: UseInfiniteQueryOptions<PaginationResponseType<CategoryListResponse>, Error>,
) {
  const [inputSearch, setInputSearch] = useState<string>('');
  const [params, setParams] = useState<TableParams>(null);
  const debounceSearch = useDebounce(inputSearch);
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: getCategoryOptions,
    fetchNextPage,
  } = useInfiniteQuery<PaginationResponseType<CategoryListResponse>, Error>(
    [ApiKey.CATEGORY, 'options', debounceSearch, { type: 'lazy' }],
    (props): Promise<PaginationResponseType<CategoryListResponse>> => {
      const { pageParam = search } = props;

      return responseWrapper<PaginationResponseType<CategoryListResponse>>(
        CategoryApi.getCategoryList,
        [{ ...pageParam, ...params, search: inputSearch }],
      );
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

  const categoryOptions: SelectOption[] = useMemo(() => {
    if (isEmpty(data?.pages)) return [];
    return data.pages.reduce(
      (state, page, _pageIdx) => [...state, ...mapCategoryOptions(page.data)],
      [],
    );
  }, [data]);

  const hasNext = useMemo(() => {
    if (isEmpty(data?.pages)) return null;
    return data.pages[data.pages.length - 1]?.hasNext;
  }, [data]);

  const queryClient = useQueryClient();

  const handleInvalidateCategories = () => queryClient.invalidateQueries([ApiKey.CATEGORY]);

  return {
    data,
    categoryOptions,
    error,
    hasNext,
    isError,
    loading: isFetching,
    setInputSearch,
    getCategoryOptions,
    fetchNextPage,
    setParams,
    handleInvalidateCategories,
  };
}
