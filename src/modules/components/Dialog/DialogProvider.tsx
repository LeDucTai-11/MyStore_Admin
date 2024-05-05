import React from 'react';
import { DialogContext } from './DialogContext';
import { DialogContentType } from './types';

const DialogProvider: React.FC<Props> = ({ children }) => {
  const [_open, _setOpen] = React.useState<boolean>(false);
  const [_dialogContent, _setDialogContent] = React.useState<DialogContentType>(null);

  const openModal = () => {
    _setOpen(true);
  };

  const closeModal = () => {
    _setOpen(false);
  };

  const isOpen = () => _open;

  const getDialogContent = () => _dialogContent;

  const setDialogContent = (content: DialogContentType) => _setDialogContent(content);

  return (
    <DialogContext.Provider
      value={{ isOpen, openModal, closeModal, getDialogContent, setDialogContent }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export type Props = {
  children: React.ReactElement;
};

export default DialogProvider;
