import { IMAGES } from '@appConfig/images';
import { COLOR_CODE, DialogContext, Image, Loading } from '@components';
import {
  Button,
  Chip,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  OrderRequestResponse,
  RequestStatusId,
  useGetAllOrderRequests,
  useGetAllOrders,
  useGetOrderRequestDetails,
  useProcessOrderRequest,
  PaymentMethodTitle,
} from '@queries';
import { Toastify, formatDate, formatMoney } from '@shared';
import { useContext, useMemo } from 'react';
import { IoIosPhonePortrait } from 'react-icons/io';
import {
  IoCalendarOutline,
  IoCardOutline,
  IoCheckmark,
  IoCloseOutline,
  IoLocationOutline,
  IoPersonOutline,
} from 'react-icons/io5';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { ProcessOrderRequestMessage, customRequestStatusRender } from '../../helpers';

const OrderRequestDetails = ({ rowData }: PropsType) => {
  const { closeModal } = useContext(DialogContext);

  const { orderRequest, isFetching } = useGetOrderRequestDetails({
    onError: (error) => Toastify.error(error?.message),
    orderRequestId: rowData?.id,
  });

  const { handleInvalidateOrderRequests } = useGetAllOrderRequests();

  const { handleInvalidateOrderList } = useGetAllOrders();

  const { processOrderRequest, isLoading: isProcessingRequest } = useProcessOrderRequest({
    onSuccess: () => {
      handleInvalidateOrderRequests();
      handleInvalidateOrderList();
      Toastify.success(ProcessOrderRequestMessage.PROCESS_SUCCESS);
      closeModal();
    },
    onError: (error) => Toastify.error(error?.message),
  });

  const totalItems = useMemo(
    () =>
      orderRequest?.order?.orderDetails?.reduce(
        (total, curProduct) => total + curProduct.quantity,
        0,
      ),
    [orderRequest?.order?.orderDetails],
  );

  const isProcessedRequest = orderRequest?.requestStatusId !== RequestStatusId.PENDING;

  const renderProductList = () => {
    return (
      <TableContainer>
        <Table>
          <TableHead sx={{ bgcolor: COLOR_CODE.GREY_50 }}>
            <TableRow>
              <TableCell width="40%" sx={{ color: COLOR_CODE.GREY_700, fontWeight: 600 }}>
                Product
              </TableCell>
              <TableCell width="20%" sx={{ color: COLOR_CODE.GREY_700, fontWeight: 600 }}>
                Quantity
              </TableCell>
              <TableCell width="20%" sx={{ color: COLOR_CODE.GREY_700, fontWeight: 600 }}>
                Price
              </TableCell>
              <TableCell width="20%" sx={{ color: COLOR_CODE.GREY_700, fontWeight: 600 }}>
                Total Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderRequest.order.orderDetails?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Stack flexDirection="row" alignItems="center" gap={1}>
                    <Image
                      src={product.product.image || IMAGES.noImage}
                      sx={{ width: '80px', height: '80px', objectFit: 'contain' }}
                    />
                    <Typography fontSize={14}>{product.product.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell sx={{ color: COLOR_CODE.GREY_700 }}>{product.quantity}</TableCell>
                <TableCell sx={{ color: COLOR_CODE.GREY_700 }}>
                  {formatMoney(product.orderPrice / product.quantity)}
                </TableCell>
                <TableCell sx={{ color: COLOR_CODE.GREY_700 }}>
                  {formatMoney(product.orderPrice)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>{}</TableCell>
              <TableCell>{}</TableCell>
              <TableCell sx={{ color: COLOR_CODE.GREY_700 }}>Subtotal</TableCell>
              <TableCell sx={{ color: COLOR_CODE.GREY_700 }}>
                {formatMoney(orderRequest.order.subTotal)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{}</TableCell>
              <TableCell>{}</TableCell>
              <TableCell sx={{ color: COLOR_CODE.GREY_700 }}>Shipping Fee</TableCell>
              <TableCell sx={{ color: COLOR_CODE.GREY_700 }}>
                {formatMoney(orderRequest.order.shipping)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{}</TableCell>
              <TableCell>{}</TableCell>
              <TableCell sx={{ color: COLOR_CODE.GREY_700 }}>Discount</TableCell>
              <TableCell sx={{ color: COLOR_CODE.GREY_700 }}>
                {formatMoney(orderRequest.order.discountValue)}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell>{}</TableCell>
              <TableCell>{}</TableCell>
              <TableCell sx={{ color: COLOR_CODE.GREY_700, fontWeight: 600, fontSize: 15 }}>
                Grand Total
              </TableCell>
              <TableCell sx={{ color: COLOR_CODE.GREY_700, fontWeight: 600, fontSize: 15 }}>
                {formatMoney(orderRequest.order.total)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  if (isFetching) {
    return <Loading variant="primary" size="small" />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" justifyContent="space-between" alignItems="center" gap="10px">
            <Typography color={COLOR_CODE.GREY_700} fontWeight={600} fontSize={16}>
              Order Request ID:
            </Typography>
            <Typography fontSize={16}>
              {formatDate(orderRequest.createdAt, 'DDMMYYTHHmmss')}
            </Typography>
          </Stack>
          {customRequestStatusRender(orderRequest.requestStatusId)}
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack
          gap={2}
          sx={{ border: `1px solid ${COLOR_CODE.GREY_300}`, padding: 2, borderRadius: '10px' }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap="10px">
              <Typography color={COLOR_CODE.GREY_700} fontWeight={600} fontSize={18}>
                Order Information
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap="10px">
              <IoCalendarOutline size={18} color={COLOR_CODE.GREY_700} />
              <Typography fontWeight={600}>Order Date</Typography>
            </Stack>
            <Typography>
              {formatDate(orderRequest.order.createdAt, 'DD MMMM YYYY, HH:mm A')}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap="10px">
              <IoCardOutline size={18} color={COLOR_CODE.GREY_700} />
              <Typography fontWeight={600}>Payment Method</Typography>
            </Stack>
            <Typography>{PaymentMethodTitle[orderRequest.order.paymentMethod]}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap="10px">
              <MdOutlineLocalShipping size={18} color={COLOR_CODE.GREY_700} />
              <Typography fontWeight={600}>Shipping Method</Typography>
            </Stack>
            <Typography>Standard shipping</Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack
          gap={2}
          sx={{ border: `1px solid ${COLOR_CODE.GREY_300}`, padding: 2, borderRadius: '10px' }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography color={COLOR_CODE.GREY_700} fontWeight={600} fontSize={18}>
              Contact Information
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap="10px">
              <IoPersonOutline size={18} color={COLOR_CODE.GREY_700} />
              <Typography fontWeight={600}>Name</Typography>
            </Stack>
            <Typography>{`${orderRequest.order.metadata.Information.lastName} ${orderRequest.order.metadata.Information.firstName}`}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap="10px">
              <IoIosPhonePortrait size={18} color={COLOR_CODE.GREY_700} />
              <Typography fontWeight={600}>Phone number</Typography>
            </Stack>
            <Typography>{orderRequest.order.metadata.Information.phoneNumber}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap="10px">
              <IoLocationOutline size={18} color={COLOR_CODE.GREY_700} />
              <Typography fontWeight={600}>Shipping address</Typography>
            </Stack>
            <Tooltip title={orderRequest.order.metadata.Information.address} arrow>
              <Typography
                sx={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  maxWidth: '300px',
                }}
              >
                {orderRequest.order.metadata.Information.address}
              </Typography>
            </Tooltip>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack gap={2} sx={{ border: `1px solid ${COLOR_CODE.GREY_300}`, borderRadius: '10px' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" padding={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap="10px">
              <Typography color={COLOR_CODE.GREY_700} fontWeight={600} fontSize={18}>
                Product List
              </Typography>
              <Chip
                label={totalItems >= 2 ? `${totalItems} items` : `${totalItems} item`}
                color="primary"
              />
            </Stack>
          </Stack>
          {renderProductList()}
        </Stack>
      </Grid>
      {!isProcessedRequest && (
        <Grid item xs={12}>
          <Stack
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            marginTop={1}
          >
            <Button
              variant="contained"
              color="error"
              startIcon={<IoCloseOutline />}
              disabled={isProcessingRequest}
              onClick={() => {
                processOrderRequest({
                  id: orderRequest?.id,
                  requestStatusId: RequestStatusId.REJECTED,
                });
              }}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<IoCheckmark />}
              disabled={isProcessingRequest}
              onClick={() => {
                processOrderRequest({
                  id: orderRequest?.id,
                  requestStatusId: RequestStatusId.APPROVED,
                });
              }}
            >
              Approve
            </Button>
          </Stack>
        </Grid>
      )}
    </Grid>
  );
};

type PropsType = {
  rowData: OrderRequestResponse;
};

export default OrderRequestDetails;
