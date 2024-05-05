import { COLOR_CODE } from '@components';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ImportOrderDetailsType } from '@queries/ImportOrder';
import { formatMoney } from '@shared';

type PropsType = {
  importProductList: ImportOrderDetailsType[];
};

const ImportProductList = ({ importProductList }: PropsType) => {
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
              Import Price
            </TableCell>
            <TableCell width="20%" sx={{ color: COLOR_CODE.GREY_700, fontWeight: 600 }}>
              Total Price
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {importProductList.map((importProduct) => (
            <TableRow
              key={importProduct.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell>{importProduct.productName}</TableCell>
              <TableCell>{importProduct.amount}</TableCell>
              <TableCell>{formatMoney(importProduct.importPrice / importProduct.amount)}</TableCell>
              <TableCell>{formatMoney(importProduct.importPrice)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ImportProductList;
