import { COLOR_CODE } from '@components';
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
import { GetStatisticDetailStoresResponse } from '@queries';
import { formatMoney } from '@shared';

const StoreList = ({ stores }: Props) => {
  return (
    <Stack sx={{ mb: 2, padding: 3 }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ bgcolor: COLOR_CODE.GREY_50 }}>
            <TableRow>
              <TableCell width="40%" sx={{ color: COLOR_CODE.GREY_700, fontWeight: 600 }}>
                Store Address
              </TableCell>
              <TableCell width="20%" sx={{ color: COLOR_CODE.GREY_700, fontWeight: 600 }}>
                Expense
              </TableCell>
              <TableCell width="20%" sx={{ color: COLOR_CODE.GREY_700, fontWeight: 600 }}>
                Revenue
              </TableCell>
              <TableCell width="20%" sx={{ color: COLOR_CODE.GREY_700, fontWeight: 600 }}>
                Profit
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores?.map((store) => (
              <TableRow key={store.address}>
                <TableCell>
                  <Typography fontSize={14}>{store.address}</Typography>
                </TableCell>
                <TableCell>{formatMoney(store.expense)}</TableCell>
                <TableCell>{formatMoney(store.revenue)}</TableCell>
                <TableCell>{formatMoney(store.revenue - store.expense)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

type Props = {
  stores: GetStatisticDetailStoresResponse[];
};

export default StoreList;
