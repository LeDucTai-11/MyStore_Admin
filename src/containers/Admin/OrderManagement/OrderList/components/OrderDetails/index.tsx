import { COLOR_CODE, Loading, Image } from '@components';
import {
  Chip,
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
import { OrderResponse, useGetOrderDetails, PaymentMethodTitle } from '@queries';
import { Toastify, formatDate, formatMoney } from '@shared';
import { IoIosPhonePortrait } from 'react-icons/io';
import {
  IoCalendarOutline,
  IoCardOutline,
  IoLocationOutline,
  IoPersonOutline,
} from 'react-icons/io5';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { customOrderStatusRender } from '../../helpers';
import { useMemo } from 'react';
import { IMAGES } from '@appConfig/images';

const OrderDetails = ({ rowData }: PropsType) => {
  const { order, isFetching } = useGetOrderDetails({
    onError: (error) => Toastify.error(error?.message),
    orderId: rowData?.id,
  });

  const totalItems = useMemo(
    () => order?.orderDetails?.reduce((total, curProduct) => total + curProduct.quantity, 0),
    [order?.orderDetails],
  );

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
            {order.orderDetails?.map((product) => (
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
                {formatMoney(order.subTotal)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{}</TableCell>
              <TableCell>{}</TableCell>
              <TableCell sx={{ color: COLOR_CODE.GREY_700 }}>Shipping Fee</TableCell>
              <TableCell sx={{ color: COLOR_CODE.GREY_700 }}>
                {formatMoney(order.shipping)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{}</TableCell>
              <TableCell>{}</TableCell>
              <TableCell sx={{ color: COLOR_CODE.GREY_700 }}>Discount</TableCell>
              <TableCell sx={{ color: COLOR_CODE.GREY_700 }}>
                {formatMoney(order.discountValue)}
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
                {formatMoney(order.total)}
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
    <Stack width="100%" gap={2}>
      <Stack width="inherit" direction="row" gap={2}>
        <Stack
          width="50%"
          gap={2}
          sx={{ border: `1px solid ${COLOR_CODE.GREY_300}`, padding: 2, borderRadius: '10px' }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap="10px">
              <Typography color={COLOR_CODE.GREY_700} fontWeight={600}>
                Order
              </Typography>
              <Typography color={COLOR_CODE.PRIMARY_500} fontWeight={600}>
                #{formatDate(order.createdAt, 'DDMMYYTHHmmss')}
              </Typography>
            </Stack>
            {customOrderStatusRender(order.orderStatusId)}
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap="10px">
              <IoCalendarOutline size={18} color={COLOR_CODE.GREY_700} />
              <Typography fontWeight={600}>Order Date</Typography>
            </Stack>
            <Typography>{formatDate(order.createdAt, 'DD MMMM YYYY, HH:mm A')}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap="10px">
              <IoCardOutline size={18} color={COLOR_CODE.GREY_700} />
              <Typography fontWeight={600}>Payment Method</Typography>
            </Stack>
            <Typography>{PaymentMethodTitle[order.paymentMethod]}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap="10px">
              <MdOutlineLocalShipping size={18} color={COLOR_CODE.GREY_700} />
              <Typography fontWeight={600}>Shipping Method</Typography>
            </Stack>
            <Typography>Standard shipping</Typography>
          </Stack>
        </Stack>
        <Stack
          width="50%"
          gap={2}
          sx={{ border: `1px solid ${COLOR_CODE.GREY_300}`, padding: 2, borderRadius: '10px' }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography color={COLOR_CODE.GREY_700} fontWeight={600}>
              Contact Information
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap="10px">
              <IoPersonOutline size={18} color={COLOR_CODE.GREY_700} />
              <Typography fontWeight={600}>Name</Typography>
            </Stack>
            <Typography>{`${order.metadata.Information.lastName} ${order.metadata.Information.firstName}`}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap="10px">
              <IoIosPhonePortrait size={18} color={COLOR_CODE.GREY_700} />
              <Typography fontWeight={600}>Phone number</Typography>
            </Stack>
            <Typography>{order.metadata.Information.phoneNumber}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap="10px">
              <IoLocationOutline size={18} color={COLOR_CODE.GREY_700} />
              <Typography fontWeight={600}>Shipping address</Typography>
            </Stack>
            <Tooltip title={order.metadata.Information.address} arrow>
              <Typography
                sx={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  maxWidth: '300px',
                }}
              >
                {order.metadata.Information.address}
              </Typography>
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>
      <Stack gap={2} sx={{ border: `1px solid ${COLOR_CODE.GREY_300}`, borderRadius: '10px' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" padding={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" gap="10px">
            <Typography color={COLOR_CODE.GREY_700} fontWeight={600}>
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
    </Stack>
  );
};

type PropsType = {
  rowData: OrderResponse;
};
export default OrderDetails;
