import React from 'react';
import { DialogContext } from './DialogContext';
import { DialogContextType, DialogType } from './types';
import { AiOutlineClose } from 'react-icons/ai';
import { Dialog, Stack, Typography, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { COLOR_CODE } from '../configs';
import YesNoDialogContent from './YesNoDialogContent';
import './styles.scss';

const CustomDialog: React.FC<Props> = () => {
  const { isOpen, closeModal, getDialogContent } =
    React.useContext<DialogContextType>(DialogContext);

  const {
    data,
    maxWidth = 'xs',
    type,
    title = '',
    hideTitle,
    hideCloseButton = false,
    fullWidth = true,
    // yesNoDialog
    contentText = '',
    subContentText = '',
    showIcon = false,
    icon,
    isWarning = false,
    hideActionButtons = false,
    okText = '',
    cancelText = 'Cancel',
    onClose,
    onOk,
    onCancel = closeModal,
  } = getDialogContent() || {};

  return (
    <Dialog
      maxWidth={maxWidth}
      open={isOpen()}
      onClose={onClose}
      fullWidth={fullWidth}
      className="cmp-dialog__content--visible"
    >
      <DialogTitle>
        <Stack
          flexDirection={hideTitle ? 'row-reverse' : 'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          {!hideTitle && (
            <Typography variant={maxWidth === 'md' ? 'h2' : 'h3'} fontWeight={600}>
              {title}
            </Typography>
          )}
          {!hideCloseButton && (
            <IconButton onClick={closeModal} sx={{ color: COLOR_CODE.GREY_600 }}>
              <AiOutlineClose />
            </IconButton>
          )}
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
        {data}
        {type === DialogType.YESNO_DIALOG && (
          <YesNoDialogContent
            contentText={contentText}
            subContentText={subContentText}
            showIcon={showIcon}
            icon={icon}
            isWarning={isWarning}
            hideActionButtons={hideActionButtons}
            okText={okText}
            cancelText={cancelText}
            onOk={onOk}
            onCancel={onCancel}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

type Props = {};

export default CustomDialog;
