import {
  CustomTableFilterContainer,
  CustomTableSearch,
  DialogContext,
  DialogType,
  EmptyTable,
  Table,
} from '@components';
import { Container, Stack, Typography } from '@mui/material';
import {
  OrderRequestParams,
  OrderRequestResponse,
  RequestStatusId,
  useGetAllOrderRequests,
  useGetAllOrders,
  useProcessOrderRequest,
} from '@queries';
import { Toastify, isEmpty } from '@shared';
import { MUIDataTableOptions } from 'mui-datatables';
import React, { useCallback, useContext, useMemo } from 'react';
import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import { allColumns } from './allColumns';
import OrderRequestDetails from './components/OrderRequestDetails';
import OrderFilter from './components/OrderRequestFilter';
import {
  ORDER_REQUEST_FILTER_QUERY_KEY,
  OrderRequestFilterFormFieldsType,
  filterParamsKey,
} from './components/OrderRequestFilter/helpers';
import { ProcessOrderRequestMessage } from './helpers';

const OrderRequests: React.FC = () => {
  const { openModal, closeModal, setDialogContent } = useContext(DialogContext);

  const { search } = useLocation();

  const query = useMemo(() => new URLSearchParams(search), [search]);

  const paramsUrl: OrderRequestFilterFormFieldsType = useMemo(() => {
    const requestStatusIdParam =
      query.get(ORDER_REQUEST_FILTER_QUERY_KEY.REQUEST_STATUS_ID) || null;

    return {
      requestStatusId: Number(requestStatusIdParam),
    };
  }, [query]);

  const { handleInvalidateOrderRequests } = useGetAllOrderRequests();

  const { handleInvalidateOrderList } = useGetAllOrders();

  const { processOrderRequest, isLoading } = useProcessOrderRequest({
    onSuccess: () => {
      handleInvalidateOrderRequests();
      handleInvalidateOrderList();
      Toastify.success(ProcessOrderRequestMessage.PROCESS_SUCCESS);
      closeModal();
    },
    onError: (error) => Toastify.error(error?.message),
  });

  const handleOpenApproveRequestDialog = useCallback(
    (rowData: OrderRequestResponse) => {
      setDialogContent({
        type: DialogType.YESNO_DIALOG,
        maxWidth: 'xs',
        contentText: 'Approve Request',
        subContentText:
          "Are you sure you want to approve this request? This action can't be undone.",
        showIcon: true,
        icon: <IoCheckmarkCircle />,
        okText: 'Yes',
        onOk: () => {
          !isLoading &&
            processOrderRequest({ id: rowData?.id, requestStatusId: RequestStatusId.APPROVED });
        },
      });
      openModal();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [isLoading],
  );

  const handleOpenRejectRequestDialog = useCallback((rowData: OrderRequestResponse) => {
    setDialogContent({
      type: DialogType.YESNO_DIALOG,
      maxWidth: 'xs',
      contentText: 'Reject Request',
      subContentText: "Are you sure you want to reject this request? This action can't be undone.",
      showIcon: true,
      icon: <IoCloseCircle />,
      isWarning: true,
      okText: 'Yes',
      onOk: () => {
        processOrderRequest({ id: rowData?.id, requestStatusId: RequestStatusId.REJECTED });
      },
    });
    openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenOrderRequestDetailsDialog = useCallback((rowData: OrderRequestResponse) => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      title: 'Order Request Details',
      data: <OrderRequestDetails rowData={rowData} />,
      maxWidth: 'lg',
    });
    openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { orderRequests, totalRecords, setParams, isFetching } = useGetAllOrderRequests({
    onError: (error) => Toastify.error(error?.message),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const handleGetOrderRequests = (params: OrderRequestParams) => {
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
    () =>
      allColumns({
        handleOpenOrderRequestDetailsDialog,
        handleOpenApproveRequestDialog,
        handleOpenRejectRequestDialog,
      }),
    [
      handleOpenOrderRequestDetailsDialog,
      handleOpenApproveRequestDialog,
      handleOpenRejectRequestDialog,
    ],
  );

  return (
    <Container maxWidth="xl">
      <Stack my={2}>
        <Typography variant="h3" fontWeight={600}>
          Order Request
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
        data={orderRequests}
        tableOptions={tableOptions}
        columns={columns}
        onAction={handleGetOrderRequests}
        isLoading={isFetching}
        emptyComponent={<EmptyTable />}
        additionalFilterParams={filterParamsKey}
      />
    </Container>
  );
};

export default OrderRequests;
