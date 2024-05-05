import { COLOR_CODE, Loading } from '@components';
import { Stack, Typography } from '@mui/material';
import { useGetInvoiceDetails } from '@queries';
import { Toastify, formatDate, tableBodyRender } from '@shared';
import { BsPersonAdd } from 'react-icons/bs';
import {
  IoCalendarOutline,
  IoInformationCircleOutline,
  IoListOutline,
  IoStorefrontOutline,
} from 'react-icons/io5';
import { customInvoiceID } from '../InvoiceList/helpers';
import InvoiceProductList from './components/InvoiceProductList';

type PropsType = {
  invoiceId: string;
};

const ImportOrderForm = ({ invoiceId }: PropsType) => {
  const { invoice, isFetching } = useGetInvoiceDetails({
    onError: (error) => Toastify.error(error?.message),
    invoiceId: invoiceId,
  });

  return isFetching ? (
    <Loading variant="primary" size="small" />
  ) : (
    <Stack gap={2}>
      <Typography variant="h6">
        <strong>Invoice ID:</strong>&nbsp;{customInvoiceID(invoice?.createdAt)}
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
          <InvoiceProductList invoiceProductList={invoice?.order?.orderDetails} />
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
              Invoice Information
            </Typography>
          </Stack>
          <Stack gap={1.5}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <IoStorefrontOutline size={16} color={COLOR_CODE.GREY_700} />
              <Typography fontSize={15} fontWeight={600}>
                Store address
              </Typography>
            </Stack>
            <Typography fontSize={15}>
              {tableBodyRender(invoice?.order?.orderDetails[0]?.store?.address)}
            </Typography>
          </Stack>
          <Stack gap={1.5}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <BsPersonAdd size={16} color={COLOR_CODE.GREY_700} />
              <Typography fontSize={15} fontWeight={600}>
                Staff
              </Typography>
            </Stack>
            <Typography fontSize={15}>
              {tableBodyRender(`${invoice.user.lastName} ${invoice.user.firstName}`)}
            </Typography>
          </Stack>
          <Stack gap={1.5}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <IoCalendarOutline size={16} color={COLOR_CODE.GREY_700} />
              <Typography fontSize={15} fontWeight={600}>
                Date created
              </Typography>
            </Stack>
            <Typography fontSize={15}>
              {tableBodyRender(formatDate(invoice?.createdAt, 'DD MMMM YYYY, HH:mm A'))}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ImportOrderForm;
