import { COLOR_CODE } from '@components';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { OrderResponse, PaymentMethodTitle } from '@queries';
import { formatDate, formatMoney, tableBodyRender } from '@shared';
import { MUIDataTableColumn, MUIDataTableMeta } from 'mui-datatables';
import { IoEye } from 'react-icons/io5';
import { customOrderStatusRender } from './helpers';

type ColumnProps = {
  handleOpenOrderDetailsDialog: (..._args: any[]) => void;
};

export const allColumns = ({ handleOpenOrderDetailsDialog }: ColumnProps): MUIDataTableColumn[] => {
  const columns: MUIDataTableColumn[] = [
    {
      name: '',
      label: 'Order ID',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (
          value,
          tableMeta:
            | MUIDataTableMeta
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: OrderResponse[] }),
        ) => {
          const { tableData, rowIndex } = tableMeta;
          const rowData = tableData.at(rowIndex) as OrderResponse;
          return tableBodyRender<string>(`#${formatDate(rowData.createdAt, 'DDMMYYTHHmmss')}`);
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
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: OrderResponse[] }),
        ) => {
          const { tableData, rowIndex } = tableMeta;
          const rowData = tableData.at(rowIndex) as OrderResponse;
          return tableBodyRender<string>(`${rowData.user.lastName} ${rowData.user.firstName}`);
        },
      },
    },
    {
      name: 'total',
      label: 'Total',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => tableBodyRender<number>(formatMoney(value)),
      },
    },
    {
      name: 'paymentMethod',
      label: 'Payment Method',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => tableBodyRender<string>(PaymentMethodTitle[value]),
      },
    },
    {
      name: 'createdAt',
      label: 'Order Date',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) =>
          tableBodyRender<string>(formatDate(value, 'DD/MM/YYYY HH:mm:ss')),
      },
    },
    {
      name: 'orderStatusId',
      label: 'Order Status',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => customOrderStatusRender(value),
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
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: OrderResponse[] }),
        ) => {
          const { tableData, rowIndex } = tableMeta;
          const rowData = tableData.at(rowIndex) as OrderResponse;
          return (
            <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
              <Tooltip title="View" placement="top" arrow>
                <span>
                  <IconButton
                    aria-label="view order details"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleOpenOrderDetailsDialog(rowData);
                    }}
                    sx={{ color: COLOR_CODE.GREY_600 }}
                  >
                    <IoEye size={20} />
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
