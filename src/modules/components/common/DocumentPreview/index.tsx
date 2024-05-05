/* eslint-disable @typescript-eslint/no-unused-vars */
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { IoDocumentOutline, IoTrashBinOutline } from 'react-icons/io5';
import { UploadFileType } from '../FileUpload/helpers';
import { Callback, formatFileSize, getFileName } from '@shared';
import { COLOR_CODE } from '@components/configs';
import Loading from '../Loading';

const DocumentPreview: React.FC<Props> = ({
  doc,
  onRemoveAttachment,
  isUploading = false,
  disabled,
  errorMessage,
}) => {
  const { file } = doc;

  if (isUploading) return <Loading />;

  return (
    <Stack gap="4px">
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          bgcolor: COLOR_CODE.GREY_50,
          height: '76px',
          borderRadius: 1,
          border: `1px solid ${errorMessage ? COLOR_CODE.DANGER : COLOR_CODE.GREY_200}`,
          padding: 2,
        }}
      >
        <Stack mr={4} direction="row" gap={1} alignItems="center" m={0}>
          <IoDocumentOutline
            size={32}
            color={disabled ? COLOR_CODE.GREY_400 : COLOR_CODE.PRIMARY}
          />
          <Stack>
            <Typography
              fontSize={14}
              fontWeight={500}
              maxWidth={500}
              style={{ color: disabled ? COLOR_CODE.GREY_600 : COLOR_CODE.GREY_900 }}
            >
              {getFileName(file?.name)}
            </Typography>
            {file && (
              <Typography fontSize={14} style={{ color: COLOR_CODE.GREY_600 }}>
                {formatFileSize(file?.size)}
              </Typography>
            )}
          </Stack>
        </Stack>
        <Stack flexDirection="row" alignItems="center">
          {file && (
            <Tooltip title="Delete" arrow placement="top">
              <IconButton
                onClick={onRemoveAttachment}
                sx={{
                  '&:hover': {
                    bgcolor: COLOR_CODE.WHITE,
                    boxShadow:
                      '0px 0px 2px 0px rgba(0, 0, 0, 0.10), 0px 2px 4px 0px rgba(0, 0, 0, 0.05)',
                    borderRadius: '4px',
                  },
                }}
                disabled={disabled}
              >
                <IoTrashBinOutline
                  color={disabled ? COLOR_CODE.GREY_600 : COLOR_CODE.DANGER}
                  size={20}
                />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Stack>
      {errorMessage && (
        <Typography variant="body2" color={COLOR_CODE.DANGER} fontSize={14}>
          {errorMessage}
        </Typography>
      )}
    </Stack>
  );
};

type Props = {
  doc: UploadFileType;
  onRemoveAttachment: Callback;
  isUploading?: boolean;
  uploadProgress?: number;
  disabled?: boolean;
  errorMessage?: string;
};

export default DocumentPreview;
