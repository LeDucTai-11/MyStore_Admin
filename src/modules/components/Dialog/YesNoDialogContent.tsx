import { COLOR_CODE } from '@components';
import { Box, Button, DialogContentText, Stack, Typography } from '@mui/material';
import { Callback, isEmpty } from '@shared';
import React from 'react';
import { IoWarning } from 'react-icons/io5';

const WarningDialogContent: React.FC<Props> = ({
  contentText,
  subContentText,
  icon,
  showIcon,
  isWarning,
  hideActionButtons,
  okText,
  cancelText,
  onOk,
  onCancel,
}) => {
  return (
    <>
      <Stack
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', rowGap: '20px' }}
      >
        {showIcon && (
          <Box
            sx={{
              backgroundColor: COLOR_CODE[`${isWarning ? 'RED' : 'PRIMARY'}_200`],
              borderRadius: '50%',
              height: '80px',
              width: '80px',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                fontSize: '50px',
                color: COLOR_CODE[`${isWarning ? 'RED' : 'PRIMARY'}_500`],
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {icon || <IoWarning />}
            </Box>
          </Box>
        )}
        <Typography variant="h3" fontWeight={600} textTransform={'none'}>
          {contentText}
        </Typography>
        {!isEmpty(subContentText) && (
          <DialogContentText textAlign={'center'}>{subContentText}</DialogContentText>
        )}
      </Stack>
      {!hideActionButtons && (
        <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Button variant="outlined" onClick={onCancel} color="inherit" type="button">
            {cancelText}
          </Button>
          <Button variant="contained" onClick={onOk} color={isWarning ? 'error' : 'primary'}>
            {okText}
          </Button>
        </Stack>
      )}
    </>
  );
};

export type Props = {
  contentText: string;
  subContentText: string;
  icon: React.ReactNode;
  showIcon: boolean;
  isWarning: boolean;
  hideActionButtons: boolean;
  okText: string;
  cancelText: string;
  onOk: Callback;
  onCancel: Callback;
};

export default WarningDialogContent;
