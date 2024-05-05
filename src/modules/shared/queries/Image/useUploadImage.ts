/* eslint-disable @typescript-eslint/no-explicit-any */
import { responseWrapper } from '@shared';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ImageApi, UploadImagePayload } from '.';

export function useUploadImage(options?: UseMutationOptions<any, Error, UploadImagePayload>) {
  const {
    mutate: onUploadImage,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<any, Error, UploadImagePayload>({
    mutationFn: (payload: UploadImagePayload) => responseWrapper(ImageApi.uploadImage, [payload]),
    ...options,
  });

  return {
    onUploadImage,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
