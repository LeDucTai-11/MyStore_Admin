import { Callback } from '@shared';
import React from 'react';

export enum DialogType {
  CONTENT_DIALOG = 'CONTENT_DIALOG',
  YESNO_DIALOG = 'YESNO_DIALOG',
}

export type DialogContentType = {
  type: DialogType;
  title?: string;
  data?: string | React.ReactElement;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  fullWidth?: boolean;
  hideTitle?: boolean;
  hideCloseButton?: boolean;
  onClose?: Callback;

  // yesNo
  contentText?: string;
  subContentText?: string;
  icon?: React.ReactNode;
  showIcon?: boolean;
  isWarning?: boolean;
  hideActionButtons?: boolean;
  okText?: string;
  cancelText?: string;
  onOk?: Callback;
  onCancel?: Callback;
};

export type DialogContextType = {
  isOpen: () => boolean;
  openModal: Callback;
  closeModal: Callback;
  getDialogContent: () => DialogContentType;
  setDialogContent: Callback<DialogContentType>;
};
