import { PATHS } from '@appConfig/paths';
import {
  CustomTableFilterContainer,
  DialogContext,
  DialogType,
  EmptyTable,
  Table,
} from '@components';
import { Button, Container, Stack, Typography } from '@mui/material';
import { InvoiceListParams, useGetAllInvoices } from '@queries';
import { RoleService, Toastify, isEmpty } from '@shared';
import { MUIDataTableOptions } from 'mui-datatables';
import React, { useCallback, useContext, useMemo } from 'react';
import { IoAdd } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import InvoiceDetails from '../InvoiceDetails';
import InvoiceFilter from '../InvoiceFilter';
import { allColumns } from './allColumns';
import { INVOICE_FILTER_QUERY_KEY, InvoiceFilterFormFieldsType, filterParamsKey } from './helpers';
import { IRootState } from '@redux/store';
import { useSelector } from 'react-redux';

const InvoiceList: React.FC = () => {
  const { openModal, setDialogContent } = useContext(DialogContext);
  const roleId = useSelector((state: IRootState) => state.auth.currentRole);

  const navigate = useNavigate();

  const { search } = useLocation();

  const query = useMemo(() => new URLSearchParams(search), [search]);

  const paramsUrl: InvoiceFilterFormFieldsType = useMemo(() => {
    const createdByParam = query.get(INVOICE_FILTER_QUERY_KEY.CREATED_BY) || undefined;

    return {
      createdBy: createdByParam,
    };
  }, [query]);

  const handleOpenInvoiceDetailsDialog = useCallback((invoiceId) => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      title: 'Invoice Details',
      data: <InvoiceDetails invoiceId={invoiceId} />,
      maxWidth: 'lg',
    });
    openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { invoices, totalRecords, setParams, isFetching } = useGetAllInvoices({
    onError: (error) => Toastify.error(error?.message),
  });

  const hadleGetInvoiceList = (params: InvoiceListParams) => {
    if (isEmpty(params?.order)) {
      params.order = 'createdAt:desc';
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
    () => allColumns({ handleOpenInvoiceDetailsDialog }),
    [handleOpenInvoiceDetailsDialog],
  );

  return (
    <Container maxWidth="xl">
      <Stack my={2}>
        <Typography variant="h3" fontWeight={600}>
          Invoice Management
        </Typography>
      </Stack>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
        <Stack justifyContent="flex-end" direction="row" flexGrow={1} alignItems="center" gap={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<IoAdd />}
            onClick={() => navigate(PATHS.addInvoice)}
          >
            Add new invoice
          </Button>
          {/* {RoleService.isAdminRole(roleId) && (
            <CustomTableFilterContainer filterParamsKeys={filterParamsKey}>
              <InvoiceFilter searchValues={paramsUrl} />
            </CustomTableFilterContainer>
          )} */}
        </Stack>
      </Stack>
      <Table
        data={invoices}
        tableOptions={tableOptions}
        columns={columns}
        onAction={hadleGetInvoiceList}
        isLoading={isFetching}
        emptyComponent={<EmptyTable />}
        additionalFilterParams={filterParamsKey}
      />
    </Container>
  );
};

export default InvoiceList;
