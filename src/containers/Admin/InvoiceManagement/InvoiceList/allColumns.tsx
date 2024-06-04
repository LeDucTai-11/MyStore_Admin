import { COLOR_CODE } from '@components';
import { IconButton, Tooltip } from '@mui/material';
import { InvoiceResponse } from '@queries';
import { formatDate, formatMoney, tableBodyRender } from '@shared';
import { MUIDataTableColumn, MUIDataTableMeta } from 'mui-datatables';
import { IoEye } from 'react-icons/io5';
import { customInvoiceID } from './helpers';

type ColumnProps = {
  handleOpenInvoiceDetailsDialog: (..._args: any[]) => void;
};

export const allColumns = ({
  handleOpenInvoiceDetailsDialog,
}: ColumnProps): MUIDataTableColumn[] => {
  const columns: MUIDataTableColumn[] = [
    {
      name: '',
      label: 'Invoice ID',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (
          value,
          tableMeta:
            | MUIDataTableMeta
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: InvoiceResponse[] }),
        ) => {
          const { tableData, rowIndex } = tableMeta;
          const rowData = tableData.at(rowIndex) as InvoiceResponse;
          return tableBodyRender<string>(customInvoiceID(rowData?.createdAt));
        },
      },
    },
    {
      name: '',
      label: 'Store address',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (
          value,
          tableMeta:
            | MUIDataTableMeta
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: InvoiceResponse[] }),
        ) => {
          const { tableData, rowIndex } = tableMeta;
          const rowData = tableData.at(rowIndex) as InvoiceResponse;
          return tableBodyRender<string>(`${rowData?.order?.orderDetails[0]?.store?.address}`);
        },
      },
    },
    {
      name: '',
      label: 'Created by',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (
          value,
          tableMeta:
            | MUIDataTableMeta
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: InvoiceResponse[] }),
        ) => {
          const { tableData, rowIndex } = tableMeta;
          const rowData = tableData.at(rowIndex) as InvoiceResponse;
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
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: InvoiceResponse[] }),
        ) => {
          const { tableData, rowIndex } = tableMeta;
          const rowData = tableData.at(rowIndex) as InvoiceResponse;
          return tableBodyRender<number>(formatMoney(rowData.order.total));
        },
      },
    },
    {
      name: 'createdAt',
      label: 'Date Created',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: string) => {
          return tableBodyRender<string>(formatDate(value, 'DD/MM/YYYY HH:mm:ss'));
        },
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
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: InvoiceResponse[] }),
        ) => {
          const { tableData, rowIndex } = tableMeta;
          const rowData = tableData.at(rowIndex) as InvoiceResponse;
          return (
            <Tooltip title="View" placement="top" arrow>
              <IconButton
                aria-label="view invoice detail"
                onClick={(event) => {
                  event.stopPropagation();
                  handleOpenInvoiceDetailsDialog(rowData.id);
                }}
              >
                <IoEye color={COLOR_CODE.GREY_600} size={20} />
              </IconButton>
            </Tooltip>
          );
        },
      },
    },
  ];

  return columns;
};
