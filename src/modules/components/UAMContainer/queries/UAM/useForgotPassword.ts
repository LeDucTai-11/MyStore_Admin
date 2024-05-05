import { ForgotPasswordPayload } from './type';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UAMApi } from '.';
import { responseWrapper } from '@shared';

export function useForgotPassword(options?: UseMutationOptions<any, Error, ForgotPasswordPayload>) {
  const { mutate: forgotPassword, isLoading } = useMutation<any, Error, ForgotPasswordPayload>({
    mutationFn: (payload: ForgotPasswordPayload) =>
      responseWrapper(UAMApi.forgotPassword, [payload]),
    ...options,
  });

  return {
    forgotPassword,
    isLoading,
  };
}
