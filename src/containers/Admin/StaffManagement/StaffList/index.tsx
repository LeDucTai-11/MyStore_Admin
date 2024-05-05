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
  StaffResponse,
  useDeleteStaff,
  useGetAllStaff,
} from 'src/queries';
import StaffFilter from '../StaffFilter';
import StaffForm from '../StaffForm';
import { StaffToastMessage } from '../StaffForm/helpers';
import { allColumns } from './allColumns';
import { StaffFilterFormFieldsType, USER_FILTER_QUERY_KEY, filterParamsKey } from './helpers';

const StaffList: React.FC = () => {
  const { openModal, closeModal, setDialogContent } = useContext(DialogContext);

  const handleOpenDialogAdd = () => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      title: 'Add New Staff',
      data: <StaffForm />,
      maxWidth: 'md',
    });
    openModal();
  };

  const { deleteStaff: deactivateStaff } = useDeleteStaff({
    onSuccess: () => {
      handleInvalidateAllStaffs();
      Toastify.success(StaffToastMessage.DELETE_SUCCESS);
      closeModal();
    },
    onError: (error) => Toastify.error(error?.message),
  });

  const handleOpenDeactivateDialog = useCallback((staff: StaffResponse) => {
    setDialogContent({
      type: DialogType.YESNO_DIALOG,
      maxWidth: 'xs',
      contentText: 'Deactivate Staff',
      subContentText:
        "Are you sure you want to deactivate this staff? This action can't be undone.",
      showIcon: true,
      icon: <IoLockClosed />,
      isWarning: true,
      okText: 'Yes',
      onOk: () => {
        deactivateStaff({ id: staff.id });
        closeModal();
      },
    });
    openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { staffs, totalRecords, setParams, isFetching, handleInvalidateAllStaffs } = useGetAllStaff(
    {
      onError: (error) => {
        Toastify.error(error?.message);
      },
    },
  );

  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);

  const paramsUrl: StaffFilterFormFieldsType = useMemo(() => {
    const statusQuery = query.get(USER_FILTER_QUERY_KEY._STATUS) || undefined;

    return {
      active: statusQuery,
    };
  }, [query]);

  const handleGetStaff = (params: GetPropertiesParams) => {
    if (!Array.isArray(params.roles) || params.roles.length === 0) {
      params.roles = [ROLE_ID._STAFF.toString()];
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
          Staff Management
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
            Add new staff
          </Button>
          <CustomTableFilterContainer filterParamsKeys={filterParamsKey}>
            <StaffFilter searchValues={paramsUrl} />
          </CustomTableFilterContainer>
        </Stack>
      </Stack>
      <Table
        title=""
        onAction={handleGetStaff}
        isLoading={isFetching}
        data={staffs}
        tableOptions={tableOptions}
        columns={columns}
        additionalFilterParams={filterParamsKey}
        emptyComponent={<EmptyTable />}
      />
    </Container>
  );
};

export default StaffList;
