import { ApiResponseType, responseWrapper } from '@shared';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { ImportOrderDetailsResponse } from './type';
import { ImportOrderApi } from '.';
import { ApiKey } from '@queries/keys';

export function useGetImportOrderDetails(
  options?: UseQueryOptions<
    ApiResponseType<ImportOrderDetailsResponse>,
    Error,
    ImportOrderDetailsResponse
  > & {
    importOrderId?: string;
  },
) {
  const {
    data: importOrder,
    error,
    isError,
    isFetching,
    refetch: onGetImportOrder,
  } = useQuery<ApiResponseType<ImportOrderDetailsResponse>, Error, ImportOrderDetailsResponse>(
    [ApiKey.IMPORT_ORDER, { id: options?.importOrderId }],
    {
      queryFn: (query) => {
        const [_, ...params] = query.queryKey;
        return responseWrapper<ApiResponseType<ImportOrderDetailsResponse>>(
          ImportOrderApi.getImportOrderDetails,
          params,
        );
      },
      notifyOnChangeProps: ['data'],
      enabled: !!options?.importOrderId,
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateImportOrderDetails = (importOrderId: string) => {
    queryClient.invalidateQueries([ApiKey.IMPORT_ORDER, { id: importOrderId }]);
  };

  return {
    importOrder,
    error,
    isError,
    isFetching,
    onGetImportOrder,
    handleInvalidateImportOrderDetails,
  };
}
