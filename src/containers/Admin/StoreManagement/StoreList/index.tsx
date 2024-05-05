import React, { useMemo, useContext, useCallback } from 'react';
import { Container, Stack, Typography, Button } from '@mui/material';
import { CustomTableSearch, Table, EmptyTable, DialogContext, DialogType } from '@components';
import { MUIDataTableOptions } from 'mui-datatables';
import { allColumns } from './allColumns';
import { RoleService, Toastify } from '@shared';
import { IoAdd } from 'react-icons/io5';
import { isEmpty } from '@shared';
import StoreForm from '../StoreForm';
import { StoreListParams, useDeleteStore, useGetAllStores } from '@queries/Store';
import { StoreToastMessage } from '../StoreForm/helpers';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/store';

const StoreList: React.FC = () => {
  const { openModal, closeModal, setDialogContent } = useContext(DialogContext);
  const roleId = useSelector((state: IRootState) => state.auth.currentRole);

  const handleOpenStoreDialog = useCallback((store = null) => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      title: !isEmpty(store) ? 'Edit Store' : 'Add New Store',
      data: <StoreForm store={store} />,
      maxWidth: 'md',
    });
    openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { deleteStore } = useDeleteStore({
    onSuccess: () => {
      handleInvalidateStoreList();
      Toastify.success(StoreToastMessage.DELETE_SUCCESS);
      closeModal();
    },
    onError: (error) => Toastify.error(error?.message),
  });

  const handleDeleteStore = (store) => {
    deleteStore({ id: store.id });
  };

  const handleOpenDeleteDialog = useCallback((store = null) => {
    setDialogContent({
      type: DialogType.YESNO_DIALOG,
      maxWidth: 'xs',
      contentText: 'Delete Store',
      subContentText: "Are you sure you want to delete this store? This action can't be undone.",
      showIcon: true,
      isWarning: true,
      okText: 'Yes',
      onOk: () => {
        handleDeleteStore(store);
        closeModal();
      },
    });
    openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { stores, totalRecords, setParams, isFetching, handleInvalidateStoreList } =
    useGetAllStores({
      onError: (error) => Toastify.error(error?.message),
    });

  const handleGetStoreList = (params: StoreListParams) => {
    setParams({ ...params });
  };

  const tableOptions: MUIDataTableOptions = useMemo(
    () => ({
      count: totalRecords,
      rowHover: totalRecords > 0,
      filter: false,
      search: false,
    }),
    [totalRecords],
  );

  const columns = useMemo(
    () => allColumns({ handleOpenStoreDialog, handleOpenDeleteDialog, roleId }),
    [handleOpenStoreDialog, handleOpenDeleteDialog, roleId],
  );

  return (
    <Container maxWidth="xl">
      <Stack my={2}>
        <Typography variant="h3" fontWeight={600}>
          Store Management
        </Typography>
      </Stack>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
        <CustomTableSearch placeholder="Search by address..." />
        {RoleService.isAdminRole(roleId) && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<IoAdd />}
            onClick={() => handleOpenStoreDialog()}
          >
            Add new store
          </Button>
        )}
      </Stack>
      <Table
        data={stores}
        tableOptions={tableOptions}
        columns={columns}
        onAction={handleGetStoreList}
        isLoading={isFetching}
        emptyComponent={<EmptyTable />}
      />
    </Container>
  );
};

export default StoreList;
