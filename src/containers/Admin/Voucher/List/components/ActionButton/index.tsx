import { DialogContext, DialogType } from '@components';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { GetVouchersResponse, useDeleteVoucher, useGetVouchers } from '@queries';
import { RoleService, Toastify } from '@shared';
import { useCallback, useContext } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { IoPencil, IoTrashBin } from 'react-icons/io5';
import VoucherForm from '../../../VoucherForm';
import { VoucherToastMessage } from '../../../VoucherForm/helpers';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/store';

const ActionButton = ({ record }: Props) => {
  const { openModal, closeModal, setDialogContent } = useContext(DialogContext);
  const roleId = useSelector((state: IRootState) => state.auth.currentRole);

  const handleOpenVoucherModal = useCallback(
    (isEditing = false) => {
      setDialogContent({
        type: DialogType.CONTENT_DIALOG,
        title: `${isEditing ? 'Edit Voucher' : 'Voucher Detail'}`,
        maxWidth: 'md',
        data: <VoucherForm isEditing={isEditing} voucherId={record.id} readOnly={!isEditing} />,
      });

      openModal();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [record],
  );

  const { handleInvalidateVouchers } = useGetVouchers();

  const { deleteVoucher } = useDeleteVoucher({
    onSuccess() {
      handleInvalidateVouchers();
      Toastify.success(VoucherToastMessage.DELETE_SUCCESS);
      closeModal();
    },
    onError(error) {
      Toastify.success(error.message);
    },
  });

  const handleOpenDeleteModal = useCallback(() => {
    setDialogContent({
      type: DialogType.YESNO_DIALOG,
      maxWidth: 'xs',
      contentText: 'Delete Voucher',
      subContentText: "Are you sure you want to delete this voucher? This action can't be undone.",
      showIcon: true,
      isWarning: true,
      okText: 'Delete',
      onOk: () => {
        deleteVoucher({ id: record.id });
        closeModal();
      },
    });
    openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record]);

  const isStartedVoucher = new Date(record.startDate) <= new Date();

  return (
    <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
      <Tooltip title="View" arrow>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleOpenVoucherModal();
          }}
        >
          <AiFillEye size={20} />
        </IconButton>
      </Tooltip>
      {RoleService.isAdminRole(roleId) && (
        <Tooltip title="Edit" arrow>
          <span>
            <IconButton
              disabled={isStartedVoucher}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleOpenVoucherModal(true);
              }}
            >
              <IoPencil size={20} />
            </IconButton>
          </span>
        </Tooltip>
      )}
      {RoleService.isAdminRole(roleId) && (
        <Tooltip title="Delete">
          <span>
            <IconButton size="small" onClick={handleOpenDeleteModal} disabled={isStartedVoucher}>
              <IoTrashBin />
            </IconButton>
          </span>
        </Tooltip>
      )}
    </Stack>
  );
};

type Props = {
  record: GetVouchersResponse;
};

export default ActionButton;
