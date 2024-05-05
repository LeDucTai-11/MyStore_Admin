/* eslint-disable no-unused-vars */
import { FileUpload, ImagePreview, UploadFileType } from '@components';
import { Stack } from '@mui/material';
import { UploadImagePayload, UploadImageResponse, isEmpty, useUploadImage } from '@shared';
import React from 'react';
import toastify from '@shared/services/toastify';

type Props = {
  type?: 'admin/files' | 'files/profiles';
  imageUrl?: string;
  importTypeId?: string;
  uploadMethod?: string;
  handleImageUrlChange: (newUrl: string) => void;
};

const UploadImage: React.FC<Props> = ({
  type = 'admin/files',
  imageUrl,
  importTypeId,
  uploadMethod = 'UPDATE',
  handleImageUrlChange,
}) => {
  const { onUploadImage } = useUploadImage({
    onSuccess(data: UploadImageResponse) {
      handleImageUrlChange(data.url);
    },
    onError(error) {
      toastify.error(error.message);
    },
  });

  const handleReset = () => {
    handleImageUrlChange(null);
  };

  return (
    <Stack gap={1}>
      {imageUrl && (
        <>
          <ImagePreview
            image={null}
            onRemove={() => {
              handleReset();
            }}
            thumbnailWidth="100%"
            thumbnailHeight="100%"
            imageUrl={imageUrl}
          />
        </>
      )}
      {!imageUrl && (
        <FileUpload
          onChange={async (value: UploadFileType[]) => {
            const payload: UploadImagePayload = {
              file: value[0].file,
              object: importTypeId,
              uploadMethod,
              type,
            };
            if (isEmpty(importTypeId)) {
              delete payload.object;
            }
            onUploadImage(payload);
          }}
          onBlur={handleReset}
          acceptFileType={{ 'image/*': ['.jpeg', '.png', '.jpg'] }}
          numberAllow={1}
        />
      )}
    </Stack>
  );
};

export default UploadImage;
