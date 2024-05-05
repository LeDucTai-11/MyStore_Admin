import { useState } from 'react';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { PaginationResponseType, isEmpty, responseWrapper } from '@shared';
import { CategoryListParams, CategoryListResponse } from './type';
import { ApiKey } from '@queries/keys';
import { CategoryApi } from '.';

export function useGetAllCategories(
  options?: UseQueryOptions<PaginationResponseType<CategoryListResponse>, Error>,
) {
  const [params, setParams] = useState<CategoryListParams>({});

  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetAllCategories,
  } = useQuery<PaginationResponseType<CategoryListResponse>, Error>([ApiKey.CATEGORY, params], {
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseType<CategoryListResponse>>(
        CategoryApi.getCategoryList,
        params,
      );
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    keepPreviousData: true,
    enabled: !isEmpty(params),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateCategoryList = () => queryClient.invalidateQueries([ApiKey.CATEGORY]);

  const { data: categories = [], hasNext, payloadSize, totalRecords } = data || {};

  return {
    categories,
    hasNext,
    payloadSize,
    totalRecords,
    error,
    isError,
    isFetching,
    onGetAllCategories,
    setParams,
    handleInvalidateCategoryList,
  };
}
