import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { CategoryPayload } from './type';
import { CategoryApi } from '.';
import { responseWrapper } from '@shared';

export function useAddCategory(options?: UseMutationOptions<any, Error, CategoryPayload>) {
  const handleAddCategory = (payload: CategoryPayload) =>
    responseWrapper(CategoryApi.addCategory, [payload]);

  const { mutate: addCategory, isLoading } = useMutation<any, Error, CategoryPayload>({
    mutationFn: handleAddCategory,
    ...options,
  });

  return {
    addCategory,
    isLoading,
  };
}
