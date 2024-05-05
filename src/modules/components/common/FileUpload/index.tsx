/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import cn from 'classnames';
import React from 'react';
import { Accept, FileRejection, useDropzone } from 'react-dropzone';

import { COMMON_TYPE } from '@appConfig/constants';
import { COLOR_CODE } from '@components/configs';
import { Stack, Typography } from '@mui/material';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MAXIMUM_FILE_SIZE, getFilesInfo } from './helpers';
import './styles.scss';

const DEFAULT_MESSAGE = (
  <span>
    <span
      style={{
        color: COLOR_CODE.PRIMARY_500,
      }}
    >
      Choose file
    </span>{' '}
    or Drag and Drop to upload
  </span>
);

// eslint-disable-next-line react/display-name
const FileUpload = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      onChange,
      onBlur,
      numberAllow = null,
      acceptFileType,
      message = DEFAULT_MESSAGE,
      errorMessage = '',
      maxFileSize = MAXIMUM_FILE_SIZE,
    },
    innerRef,
  ) => {
    const [myFiles, setMyFiles] = React.useState<File[]>([]);
    const [rejectFiles, setRejectFiles] = React.useState<FileRejection[]>([]);
    const [error, setError] = React.useState<string>('');

    const hasError = errorMessage || error;

    const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setMyFiles(acceptedFiles);
      setRejectFiles(fileRejections);
    };

    const onDragOver = () => {
      setError('');
      if (onBlur) onBlur();
    };

    const onFileDialogOpen = () => {
      setError('');
      if (onBlur) onBlur();
    };

    const handleChange = (files: File[]) => {
      const formattedFilesInfo = getFilesInfo(files);
      onChange(formattedFilesInfo);
    };

    // List MIME can be found here:
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
      onDrop,
      accept: acceptFileType || COMMON_TYPE,
      maxSize: maxFileSize,
      multiple: numberAllow > 1,
      onDragOver,
      onFileDialogOpen,
    });

    const additionalClass = isDragAccept ? 'accept' : isDragReject ? 'reject' : '';

    React.useEffect(() => {
      if (myFiles.length > 0) handleChange(myFiles);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myFiles]);

    // For more info about react dropzone follow:
    // https://react-dropzone.js.org/
    return (
      <Stack
        className={cn(className, 'cmp-file-upload')}
        // sx={{ width: imgWidth, height: imgHeight }}
      >
        <Stack
          {...getRootProps({
            className: cn(`cmp-file-upload__body ${additionalClass}`, {
              'cmp-file-upload__body--error': hasError,
            }),
          })}
        >
          <input
            data-testid="upload-input"
            {...getInputProps()}
            {...(innerRef && {
              ref: innerRef,
            })}
          />
          <Stack my={1} justifyContent="center" alignItems="center">
            <AiOutlineCloudUpload size={100} color={COLOR_CODE.PRIMARY} />
            <Typography
              variant="body1"
              className="fw-medium"
              color={COLOR_CODE.GREY_800}
              fontWeight={500}
              fontSize={14}
            >
              {message}
              <p
                style={{
                  color: COLOR_CODE.GREY_400,
                  textAlign: 'center',
                }}
              >
                {Object.entries(acceptFileType)
                  .map(([mimeType, extensions]) => `Supports: ${extensions.join(', ')}`)
                  .join(' ')}
              </p>
            </Typography>
          </Stack>
        </Stack>
        {hasError && (
          <Typography variant="body2" color={COLOR_CODE.DANGER} fontSize={14} mt={1}>
            {errorMessage || error}
          </Typography>
        )}
      </Stack>
    );
  },
);

type Props = {
  className?: string;
  numberAllow?: number;
  onChange: (...args: any[]) => void;
  onBlur?: (...args: any[]) => void;
  acceptFileType?: Accept;
  message?: string | React.ReactNode;
  innerRef?: React.Ref<HTMLInputElement>;
  errorMessage?: string;
  maxFileSize?: number; // KB
};

export default FileUpload;
