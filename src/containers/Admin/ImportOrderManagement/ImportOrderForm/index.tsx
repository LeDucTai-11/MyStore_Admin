import { COLOR_CODE, Loading, MuiTextField } from '@components';
import { Stack, Typography } from '@mui/material';
import { ImportOrderListResponse, useGetImportOrderDetails } from '@queries/ImportOrder';
import { Toastify, formatMoney } from '@shared';
import { GiMoneyStack } from 'react-icons/gi';
import {
  IoCalendarOutline,
  IoInformationCircleOutline,
  IoListOutline,
  IoStorefrontOutline,
} from 'react-icons/io5';
import { customImportOrderID } from '../ImportOrderList/helpers';
import ImportProductList from './components/ImportProductList';
import { formatDate } from './helpers';

type PropsType = {
  rowData: ImportOrderListResponse;
};

const ImportOrderForm = ({ rowData }: PropsType) => {
  const { importOrder, isFetching } = useGetImportOrderDetails({
    onError: (error) => Toastify.error(error?.message),
    importOrderId: rowData?.id,
  });

  return isFetching ? (
    <Loading variant="primary" size="small" />
  ) : (
    <Stack gap={2}>
      <Typography variant="h6">
        <strong>Import Order ID:</strong>&nbsp;
        {customImportOrderID(rowData.storeName, importOrder?.createdAt)}
      </Typography>
      <Stack width="100%" direction="row" gap={2}>
        <Stack
          sx={{
            border: `1px solid ${COLOR_CODE.GREY_300} `,
            borderRadius: 2,
            width: '60%',
          }}
        >
          <Stack padding="24px" direction={'row'} alignItems={'center'} spacing={1}>
            <IoListOutline size={24} color={COLOR_CODE.PRIMARY_500} />
            <Typography fontSize={20} fontWeight={600} color={COLOR_CODE.PRIMARY_500}>
              Product List
            </Typography>
          </Stack>
          <ImportProductList importProductList={importOrder?.importOderDetails} />
        </Stack>
        <Stack
          padding="24px"
          gap={3}
          sx={{
            border: `1px solid ${COLOR_CODE.GREY_300} `,
            borderRadius: 2,
            width: '40%',
          }}
        >
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <IoInformationCircleOutline size={24} color={COLOR_CODE.PRIMARY_500} />
            <Typography fontSize={20} fontWeight={600} color={COLOR_CODE.PRIMARY_500}>
              General Information
            </Typography>
          </Stack>
          <Stack spacing={1}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <IoStorefrontOutline size={16} color={COLOR_CODE.GREY_700} />
              <Typography fontSize={14} fontWeight={600}>
                Store address
              </Typography>
            </Stack>
            <MuiTextField
              required
              fullWidth
              multiline
              size="small"
              placeholder="Store address"
              value={rowData?.storeName}
              readOnly
            />
          </Stack>
          <Stack spacing={1}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <GiMoneyStack size={16} color={COLOR_CODE.GREY_700} />
              <Typography fontSize={14} fontWeight={600}>
                Total
              </Typography>
            </Stack>
            <MuiTextField
              required
              fullWidth
              size="small"
              placeholder="Total"
              value={formatMoney(importOrder?.total)}
              readOnly
            />
          </Stack>
          <Stack spacing={1}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <IoCalendarOutline size={16} color={COLOR_CODE.GREY_700} />
              <Typography fontSize={14} fontWeight={600}>
                Date created
              </Typography>
            </Stack>
            <MuiTextField
              required
              fullWidth
              size="small"
              placeholder="Date created"
              value={formatDate(importOrder?.createdAt)}
              readOnly
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ImportOrderForm;
