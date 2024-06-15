import {
    CustomTableFilterContainer,
    CustomTableSearch,
    DialogContext,
    DialogType,
    EmptyTable,
    Table,
  } from '@components';
  import { Button, Container, Stack, Typography } from '@mui/material';
  import { Toastify } from '@shared';
  import { MUIDataTableOptions } from 'mui-datatables';
  import React, { useCallback, useContext, useMemo } from 'react';
  import { IoAdd, IoLockClosed } from 'react-icons/io5';
  import { useLocation } from 'react-router-dom';
  import {
    GetPropertiesParams,
    ROLE_ID,
    ShipperResponse,
    useDeleteShipper,
    useGetAllShipper,
  } from 'src/queries';
  import ShipperFilter from '../ShipperFilter';
  import ShipperForm from '../ShipperForm';
  import { ShipperToastMessage } from '../ShipperForm/helpers';
  import { allColumns } from './allColumns';
  import { ShipperFilterFormFieldsType, USER_FILTER_QUERY_KEY, filterParamsKey } from './helpers';
  
  const ShipperList: React.FC = () => {
    const { openModal, closeModal, setDialogContent } = useContext(DialogContext);
  
    const handleOpenDialogAdd = () => {
      setDialogContent({
        type: DialogType.CONTENT_DIALOG,
        title: 'Add New Shipper',
        data: <ShipperForm />,
        maxWidth: 'md',
      });
      openModal();
    };
  
    const { deleteShipper: deactivateShipper } = useDeleteShipper({
      onSuccess: () => {
        handleInvalidateAllShippers();
        Toastify.success(ShipperToastMessage.DELETE_SUCCESS);
        closeModal();
      },
      onError: (error) => Toastify.error(error?.message),
    });
  
    const handleOpenDeactivateDialog = useCallback((shipper: ShipperResponse) => {
      setDialogContent({
        type: DialogType.YESNO_DIALOG,
        maxWidth: 'xs',
        contentText: 'Deactivate Shipper',
        subContentText:
          "Are you sure you want to deactivate this shipper? This action can't be undone.",
        showIcon: true,
        icon: <IoLockClosed />,
        isWarning: true,
        okText: 'Yes',
        onOk: () => {
          deactivateShipper({ id: shipper.id });
          closeModal();
        },
      });
      openModal();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    const { shippers, totalRecords, setParams, isFetching, handleInvalidateAllShippers } = useGetAllShipper(
      {
        onError: (error) => {
          Toastify.error(error?.message);
        },
      },
    );
  
    const { search } = useLocation();
    const query = useMemo(() => new URLSearchParams(search), [search]);
  
    const paramsUrl: ShipperFilterFormFieldsType = useMemo(() => {
      const statusQuery = query.get(USER_FILTER_QUERY_KEY._STATUS) || undefined;
      const storeQuery = query.get(USER_FILTER_QUERY_KEY._STORE_ID) || undefined;
  
      return {
        active: statusQuery,
        storeId: storeQuery,
      };
    }, [query]);
  
    const handleGetShipper = (params: GetPropertiesParams) => {
      if (!Array.isArray(params.roles) || params.roles.length === 0) {
        params.roles = [ROLE_ID._SHIPPER.toString()];
      }
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
      () => allColumns({ handleOpenDeactivateDialog }),
      [handleOpenDeactivateDialog],
    );
  
    return (
      <Container maxWidth="xl">
        <Stack sx={{ mb: 2, mt: 2 }}>
          <Typography variant="h3" fontWeight={600}>
            Shipper Management
          </Typography>
        </Stack>
        <Stack alignItems="center" justifyContent="space-between" flexDirection="row">
          <CustomTableSearch placeholder="Search by first name/ last name/ email..." />
          <Stack justifyContent="flex-end" direction="row" flexGrow={1} alignItems="center" gap={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<IoAdd />}
              onClick={handleOpenDialogAdd}
            >
              Add new shipper
            </Button>
            <CustomTableFilterContainer filterParamsKeys={filterParamsKey}>
              <ShipperFilter searchValues={paramsUrl} />
            </CustomTableFilterContainer>
          </Stack>
        </Stack>
        <Table
          title=""
          onAction={handleGetShipper}
          isLoading={isFetching}
          data={shippers}
          tableOptions={tableOptions}
          columns={columns}
          additionalFilterParams={filterParamsKey}
          emptyComponent={<EmptyTable />}
        />
      </Container>
    );
  };
  
  export default ShipperList;
  