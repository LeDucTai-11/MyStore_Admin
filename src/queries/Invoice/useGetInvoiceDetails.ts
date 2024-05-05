import { ApiResponseType, responseWrapper } from '@shared';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiKey } from '@queries/keys';
import { InvoiceResponse } from './type';
import { InvoiceApi } from '.';

export function useGetInvoiceDetails(
  options?: UseQueryOptions<ApiResponseType<InvoiceResponse>, Error, InvoiceResponse> & {
    invoiceId?: string;
  },
) {
  const {
    data: invoice,
    error,
    isError,
    isFetching,
    refetch: onGetInvoice,
  } = useQuery<ApiResponseType<InvoiceResponse>, Error, InvoiceResponse>(
    [ApiKey.INVOICE, { id: options?.invoiceId }],
    {
      queryFn: (query) => {
        return responseWrapper<ApiResponseType<InvoiceResponse>>(InvoiceApi.getInvoiceDetails, [
          options?.invoiceId,
        ]);
      },
      notifyOnChangeProps: ['data'],
      enabled: !!options?.invoiceId,
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateInvoiceDetails = (invoiceId: string) => {
    queryClient.invalidateQueries([ApiKey.INVOICE, { id: invoiceId }]);
  };

  return {
    invoice,
    error,
    isError,
    isFetching,
    onGetInvoice,
    handleInvalidateInvoiceDetails,
  };
}
