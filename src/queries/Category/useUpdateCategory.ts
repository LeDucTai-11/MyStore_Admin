import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { CategoryPayload } from './type';
import { CategoryApi } from '.';
import { responseWrapper } from '@shared';

export function useUpdateCategory(options?: UseMutationOptions<any, Error, CategoryPayload>) {
  const handleUpdateCategory = (payload: CategoryPayload) =>
    responseWrapper(CategoryApi.updateCategory, [payload]);

  const { mutate: updateCategory, isLoading } = useMutation<any, Error, CategoryPayload>({
    mutationFn: handleUpdateCategory,
    ...options,
  });

  return {
    updateCategory,
    isLoading,
  };
}
