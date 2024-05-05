import { IMAGES } from '@appConfig/images';
import { COLOR_CODE, EmptyTable, Image } from '@components';
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { OrderDetailsType } from '@queries/Invoice';
import { formatMoney, isEmpty } from '@shared';
import { useMemo } from 'react';

type PropsType = {
  invoiceProductList: OrderDetailsType[];
};

const InvoiceProductList = ({ invoiceProductList }: PropsType) => {
  const grandTotal = useMemo(
    () => invoiceProductList?.reduce((total, curProduct) => total + curProduct.orderPrice, 0),
    [invoiceProductList],
  );

  return (
    <TableContainer sx={{ maxHeight: '400px' }}>
      <Table>
        <TableHead sx={{ bgcolor: COLOR_CODE.GREY_50 }}>
          <TableRow>
            <TableCell width="40%" sx={{ color: COLOR_CODE.GREY_700, fontWeight: 600 }}>
              Product Name
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
          {isEmpty(invoiceProductList) ? (
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell colSpan={4} align="center">
                <EmptyTable />
              </TableCell>
            </TableRow>
          ) : (
            invoiceProductList.map((invoiceProduct) => (
              <TableRow key={invoiceProduct.product.id}>
                <TableCell>
                  <Stack flexDirection="row" alignItems="center" gap={1}>
                    <Image
                      src={invoiceProduct.product.image || IMAGES.noImage}
                      sx={{
                        width: '70px',
                        height: '70px',
                        objectFit: 'contain',
                      }}
                    />
                    <Typography fontSize={14}>{invoiceProduct.product.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>{invoiceProduct.quantity}</TableCell>
                <TableCell>
                  {formatMoney(invoiceProduct.orderPrice / invoiceProduct.quantity)}
                </TableCell>
                <TableCell>{formatMoney(invoiceProduct.orderPrice)}</TableCell>
              </TableRow>
            ))
          )}
          {!isEmpty(invoiceProductList) && (
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
                {formatMoney(grandTotal)}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceProductList;
