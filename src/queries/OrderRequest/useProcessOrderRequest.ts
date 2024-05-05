import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { responseWrapper } from '@shared';
import { ProcessOrderRequestPayload } from './type';
import { OrderRequestApi } from '.';

export function useProcessOrderRequest(
  options?: UseMutationOptions<any, Error, ProcessOrderRequestPayload>,
) {
  const handleProcessOrderRequest = (payload: ProcessOrderRequestPayload) =>
    responseWrapper(OrderRequestApi.processOrderRequest, [payload]);

  const { mutate: processOrderRequest, isLoading } = useMutation<
    any,
    Error,
    ProcessOrderRequestPayload
  >({
    mutationFn: handleProcessOrderRequest,
    ...options,
  });

  return {
    processOrderRequest,
    isLoading,
  };
}
