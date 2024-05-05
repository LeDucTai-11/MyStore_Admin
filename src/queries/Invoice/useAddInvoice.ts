import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { responseWrapper } from '@shared';
import { AddInvoicePayload, InvoiceApi } from '.';

export function useAddInvoice(options?: UseMutationOptions<any, Error, AddInvoicePayload>) {
  const handleAddInvoice = (payload: AddInvoicePayload) =>
    responseWrapper(InvoiceApi.addInvoice, [payload]);

  const { mutate: addInvoice, isLoading } = useMutation<any, Error, AddInvoicePayload>({
    mutationFn: handleAddInvoice,
    ...options,
  });

  return {
    addInvoice,
    isLoading,
  };
}
