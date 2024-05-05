import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiResponseType, isEmpty, responseWrapper } from '@shared';
import { CategoryDetailsResponse } from './type';
import { ApiKey } from '@queries/keys';
import { CategoryApi } from '.';

export function useGetCategoryDetails(
  categoryId: string,
  options?: UseQueryOptions<
    ApiResponseType<CategoryDetailsResponse>,
    Error,
    CategoryDetailsResponse
  >,
) {
  const {
    data: category,
    error,
    isError,
    isFetching,
    isSuccess,
  } = useQuery<ApiResponseType<CategoryDetailsResponse>, Error, CategoryDetailsResponse>(
    [ApiKey.CATEGORY, categoryId],
    {
      queryFn: () =>
        responseWrapper<ApiResponseType<CategoryDetailsResponse>>(CategoryApi.getCategoryDetails, [
          categoryId,
        ]),
      notifyOnChangeProps: ['data'],
      enabled: !isEmpty(categoryId),
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateCategoryDetails = () => {
    queryClient.invalidateQueries([ApiKey.CATEGORY, categoryId]);
  };

  return {
    category,
    error,
    isError,
    isFetching,
    isSuccess,
    handleInvalidateCategoryDetails,
  };
}
