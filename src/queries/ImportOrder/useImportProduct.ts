/* eslint-disable @typescript-eslint/no-explicit-any */
import { responseWrapper } from '@shared';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ImportProductPayload } from './type';
import { ImportOrderApi } from '.';

export function useImportProduct(options?: UseMutationOptions<any, Error, ImportProductPayload>) {
  const {
    mutate: onImportProduct,
    isLoading: isImporting,
    isSuccess,
    isError,
    error,
  } = useMutation<any, Error, ImportProductPayload>({
    mutationFn: (payload: ImportProductPayload) =>
      responseWrapper(ImportOrderApi.importProduct, [payload]),
    ...options,
  });

  return {
    onImportProduct,
    isImporting,
    isSuccess,
    isError,
    error,
  };
}
