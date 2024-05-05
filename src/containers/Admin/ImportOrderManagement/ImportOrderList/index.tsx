import {
  CustomTableFilterContainer,
  DialogContext,
  DialogType,
  EmptyTable,
  Table,
} from '@components';
import { Button, Container, Stack, Typography } from '@mui/material';
import {
  ImportOrderListParams,
  ImportOrderListResponse,
  useGetImportOrderList,
} from '@queries/ImportOrder';
import { Toastify, isEmpty } from '@shared';
import { MUIDataTableOptions } from 'mui-datatables';
import React, { useCallback, useContext, useMemo } from 'react';
import { IoCloudUpload } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import ImportOrderFilter from '../ImportOrderFilter';
import ImportOrderForm from '../ImportOrderForm';
import ImportProductDialog from '../ImportProductDialog';
import { allColumns } from './allColumns';
import {
  IMPORT_ORDER_FILTER_QUERY_KEY,
  ImportOrderFilterFormFieldsType,
  filterParamsKey,
} from './helpers';

const ImportOrderList: React.FC = () => {
  const { openModal, setDialogContent } = useContext(DialogContext);

  const { search } = useLocation();

  const query = useMemo(() => new URLSearchParams(search), [search]);

  const paramsUrl: ImportOrderFilterFormFieldsType = useMemo(() => {
    const storeIdParam = query.get(IMPORT_ORDER_FILTER_QUERY_KEY.STORE_ID) || undefined;

    return {
      storeId: storeIdParam,
    };
  }, [query]);

  const handleOpenImportOrderDialog = useCallback((rowData: ImportOrderListResponse) => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      title: 'Import Order Details',
      data: <ImportOrderForm rowData={rowData} />,
      maxWidth: 'lg',
    });
    openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenImportProductDialog = () => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      title: 'Import Product',
      data: <ImportProductDialog />,
      maxWidth: 'md',
    });
    openModal();
  };

  const { importOrders, totalRecords, setParams, isFetching } = useGetImportOrderList({
    onError: (error) => Toastify.error(error?.message),
  });

  const handleGetImportOrderList = (params: ImportOrderListParams) => {
    if (isEmpty(params?.order)) {
      setParams({ ...params, order: 'createdAt:desc' });
    } else {
      setParams({ ...params });
    }
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
    () => allColumns({ handleOpenImportOrderDialog }),
    [handleOpenImportOrderDialog],
  );

  return (
    <Container maxWidth="xl">
      <Stack my={2}>
        <Typography variant="h3" fontWeight={600}>
          Import Order Management
        </Typography>
      </Stack>
      <Stack flexDirection="row" justifyContent="flex-end" alignItems="center" gap={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<IoCloudUpload />}
          onClick={handleOpenImportProductDialog}
        >
          Import Product
        </Button>
        <CustomTableFilterContainer filterParamsKeys={filterParamsKey}>
          <ImportOrderFilter searchValues={paramsUrl} />
        </CustomTableFilterContainer>
      </Stack>
      <Table
        data={importOrders}
        tableOptions={tableOptions}
        columns={columns}
        onAction={handleGetImportOrderList}
        isLoading={isFetching}
        emptyComponent={<EmptyTable />}
        additionalFilterParams={filterParamsKey}
      />
    </Container>
  );
};

export default ImportOrderList;
