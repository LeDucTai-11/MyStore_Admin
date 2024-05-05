import {
  CustomTableFilterContainer,
  CustomTableSearch,
  DialogContext,
  DialogType,
  EmptyTable,
  Table,
  TableParams,
} from '@components';
import { Button, Container, Stack, Typography } from '@mui/material';
import { useContext, useMemo } from 'react';
import { IoAdd } from 'react-icons/io5';
import { useGetVouchers } from '@queries';
import { MUIDataTableOptions } from 'mui-datatables';
import { RoleService, Toastify } from '@shared';
import { allColumns } from './allColumns';
import { VoucherFilterFormField, VoucherFilterFormType } from './components/VoucherFilter/helpers';
import { VoucherFilter } from './components';
import { useSearchParams } from 'react-router-dom';
import VoucherForm from '../VoucherForm';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/store';

const VoucherList = () => {
  const { openModal, setDialogContent } = useContext(DialogContext);
  const [searchParams] = useSearchParams();
  const roleId = useSelector((state: IRootState) => state.auth.currentRole);

  const { vouchers, totalRecords, setParams, isFetching } = useGetVouchers({
    onError: (error) => {
      Toastify.error(error?.message);
    },
  });

  const paramsUrl = useMemo(
    () =>
      ({
        valid: searchParams.get(VoucherFilterFormField.VALID),
      } as VoucherFilterFormType),
    [searchParams],
  );

  const handleGetVouchers = (params: TableParams) => {
    const newParams = {
      ...params,
      ...paramsUrl,
    };
    setParams(newParams);
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

  const columns = useMemo(() => allColumns(), []);

  const handleOpenAddVoucherModal = () => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      title: 'Add New Voucher',
      maxWidth: 'md',
      data: <VoucherForm />,
    });

    openModal();
  };

  return (
    <Container maxWidth={'xl'}>
      <Stack sx={{ mb: 2, mt: 2 }}>
        <Typography variant="h3" fontWeight={600}>
          Voucher Management
        </Typography>
      </Stack>
      <Stack alignItems="center" justifyContent="space-between" flexDirection="row">
        <CustomTableSearch placeholder="Search by voucher code..." />
        <Stack justifyContent="flex-end" direction="row" flexGrow={1} alignItems="center" gap={2}>
          {RoleService.isAdminRole(roleId) && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<IoAdd />}
              onClick={handleOpenAddVoucherModal}
            >
              Add new voucher
            </Button>
          )}
          <CustomTableFilterContainer filterParamsKeys={Object.values(VoucherFilterFormField)}>
            <VoucherFilter searchValues={paramsUrl} />
          </CustomTableFilterContainer>
        </Stack>
      </Stack>
      <Table
        title=""
        onAction={handleGetVouchers}
        isLoading={isFetching}
        data={vouchers}
        tableOptions={tableOptions}
        columns={columns}
        emptyComponent={<EmptyTable />}
      />
    </Container>
  );
};

export default VoucherList;
