import {
  CustomTableFilterContainer,
  CustomTableSearch,
  DialogContext,
  DialogType,
  EmptyTable,
  Table,
} from '@components';
import { Container, Stack, Typography } from '@mui/material';
import { OrderListParams, OrderResponse, useGetAllOrders } from '@queries';
import { Toastify, isEmpty } from '@shared';
import { MUIDataTableOptions } from 'mui-datatables';
import React, { useCallback, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { allColumns } from './allColumns';
import OrderDetails from './components/OrderDetails';
import OrderFilter from './components/OrderFilter';
import {
  ORDER_FILTER_QUERY_KEY,
  OrderFilterFormFieldsType,
  filterParamsKey,
} from './components/OrderFilter/helpers';

const OrderRequests: React.FC = () => {
  const { openModal, setDialogContent } = useContext(DialogContext);

  const { search } = useLocation();

  const query = useMemo(() => new URLSearchParams(search), [search]);

  const paramsUrl: OrderFilterFormFieldsType = useMemo(() => {
    const orderStatusIdParam = Number(query.get(ORDER_FILTER_QUERY_KEY.ORDER_STATUS_ID)) || null;
    const paymentMethodParam = query.get(ORDER_FILTER_QUERY_KEY.PAYMENT_METHOD) || null;

    return {
      orderStatusId: orderStatusIdParam,
      paymentMethod: paymentMethodParam,
    };
  }, [query]);

  const handleOpenOrderDetailsDialog = useCallback((rowData: OrderResponse) => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      title: 'Order Details',
      data: <OrderDetails rowData={rowData} />,
      maxWidth: 'lg',
    });
    openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { orders, totalRecords, setParams, isFetching } = useGetAllOrders({
    onError: (error) => Toastify.error(error?.message),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const handleGetOrderList = (params: OrderListParams) => {
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
    () => allColumns({ handleOpenOrderDetailsDialog }),
    [handleOpenOrderDetailsDialog],
  );

  return (
    <Container maxWidth="xl">
      <Stack my={2}>
        <Typography variant="h3" fontWeight={600}>
          Order List
        </Typography>
      </Stack>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
        <CustomTableSearch placeholder="Search by customer name..." />
        <Stack justifyContent="flex-end" direction="row" flexGrow={1} alignItems="center" gap={2}>
          <CustomTableFilterContainer filterParamsKeys={filterParamsKey}>
            <OrderFilter searchValues={paramsUrl} />
          </CustomTableFilterContainer>
        </Stack>
      </Stack>
      <Table
        data={orders}
        tableOptions={tableOptions}
        columns={columns}
        onAction={handleGetOrderList}
        isLoading={isFetching}
        emptyComponent={<EmptyTable />}
        additionalFilterParams={filterParamsKey}
      />
    </Container>
  );
};

export default OrderRequests;
