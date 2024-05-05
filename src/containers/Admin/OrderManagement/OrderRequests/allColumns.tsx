import { COLOR_CODE } from '@components';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { OrderRequestResponse, RequestStatusId, PaymentMethodTitle } from '@queries';
import { formatDate, formatMoney, tableBodyRender } from '@shared';
import { MUIDataTableColumn, MUIDataTableMeta } from 'mui-datatables';
import { IoCheckmark, IoCloseOutline, IoEye } from 'react-icons/io5';
import { customRequestStatusRender } from './helpers';

type ColumnProps = {
  handleOpenOrderRequestDetailsDialog: (..._args: any[]) => void;
  handleOpenApproveRequestDialog: (..._args: any[]) => void;
  handleOpenRejectRequestDialog: (..._args: any[]) => void;
};

export const allColumns = ({
  handleOpenOrderRequestDetailsDialog,
  handleOpenApproveRequestDialog,
  handleOpenRejectRequestDialog,
}: ColumnProps): MUIDataTableColumn[] => {
  const columns: MUIDataTableColumn[] = [
    {
      name: '',
      label: 'Order Request ID',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (
          value,
          tableMeta:
            | MUIDataTableMeta
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: OrderRequestResponse[] }),
        ) => {
          const { tableData, rowIndex } = tableMeta;
          const rowData = tableData.at(rowIndex) as OrderRequestResponse;
          return tableBodyRender<string>(`${formatDate(rowData.createdAt, 'DDMMYYTHHmmss')}`);
        },
      },
    },
    {
      name: '',
      label: 'Customer Name',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (
          value,
          tableMeta:
            | MUIDataTableMeta
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: OrderRequestResponse[] }),
        ) => {
          const { tableData, rowIndex } = tableMeta;
          const rowData = tableData.at(rowIndex) as OrderRequestResponse;
          return tableBodyRender<string>(`${rowData.user.lastName} ${rowData.user.firstName}`);
        },
      },
    },
    {
      name: '',
      label: 'Total',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (
          value,
          tableMeta:
            | MUIDataTableMeta
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: OrderRequestResponse[] }),
        ) => {
          const { tableData, rowIndex } = tableMeta;
          const rowData = tableData.at(rowIndex) as OrderRequestResponse;
          return tableBodyRender<number>(formatMoney(rowData.order.total));
        },
      },
    },
    {
      name: '',
      label: 'Payment Method',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (
          value,
          tableMeta:
            | MUIDataTableMeta
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: OrderRequestResponse[] }),
        ) => {
          const { tableData, rowIndex } = tableMeta;
          const rowData = tableData.at(rowIndex) as OrderRequestResponse;
          return tableBodyRender<string>(PaymentMethodTitle[rowData.order.paymentMethod]);
        },
      },
    },
    {
      name: 'createdAt',
      label: 'Request Date',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return tableBodyRender<string>(formatDate(value, 'DD/MM/YYYY HH:mm:ss'));
        },
      },
    },
    {
      name: 'requestStatusId',
      label: 'Request Status',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => customRequestStatusRender(value),
      },
    },
    {
      name: '',
      label: 'Action',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (
          value,
          tableMeta:
            | MUIDataTableMeta
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: OrderRequestResponse[] }),
        ) => {
          const { tableData, rowIndex } = tableMeta;
          const rowData = tableData.at(rowIndex) as OrderRequestResponse;
          const isProcessedRequest = rowData.requestStatusId !== RequestStatusId.PENDING;
          return (
            <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
              <Tooltip title="View" placement="top" arrow>
                <span>
                  <IconButton
                    aria-label="view"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleOpenOrderRequestDetailsDialog(rowData);
                    }}
                    sx={{ color: COLOR_CODE.GREY_600 }}
                  >
                    <IoEye size={20} />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Approve" placement="top" arrow>
                <span>
                  <IconButton
                    aria-label="approve"
                    disabled={isProcessedRequest}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleOpenApproveRequestDialog(rowData);
                    }}
                    sx={{ color: COLOR_CODE.SUCCESS }}
                  >
                    <IoCheckmark size={20} />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Reject" placement="top" arrow>
                <span>
                  <IconButton
                    aria-label="reject"
                    disabled={isProcessedRequest}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleOpenRejectRequestDialog(rowData);
                    }}
                    sx={{ color: COLOR_CODE.DANGER }}
                  >
                    <IoCloseOutline size={20} />
                  </IconButton>
                </span>
              </Tooltip>
            </Stack>
          );
        },
        setCellHeaderProps: () => ({ style: { textAlign: 'center' } }),
      },
    },
  ];

  return columns;
};
