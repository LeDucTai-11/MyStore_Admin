import { COLOR_CODE } from '@components';
import { IconButton, Tooltip } from '@mui/material';
import { ImportOrderListResponse } from '@queries/ImportOrder';
import { formatMoney, getDate, tableBodyRender } from '@shared';
import { MUIDataTableColumn, MUIDataTableMeta } from 'mui-datatables';
import { IoEye } from 'react-icons/io5';
import { customImportOrderID } from './helpers';

type ColumnProps = {
  handleOpenImportOrderDialog: (..._args: any[]) => void;
};

export const allColumns = ({ handleOpenImportOrderDialog }: ColumnProps): MUIDataTableColumn[] => {
  const columns: MUIDataTableColumn[] = [
    {
      name: '',
      label: 'Import Order ID',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (
          value,
          tableMeta:
            | MUIDataTableMeta
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: ImportOrderListResponse[] }),
        ) => {
          const { tableData, rowIndex } = tableMeta;
          const rowData = tableData.at(rowIndex) as ImportOrderListResponse;
          return tableBodyRender<string>(customImportOrderID(rowData.storeName, rowData.createdAt));
        },
      },
    },
    {
      name: 'storeName',
      label: 'Store Address',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string) => tableBodyRender<string>(value),
        setCellProps: () => ({
          style: { width: '700px' },
        }),
      },
    },
    {
      name: 'total',
      label: 'Total Price',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: number) => tableBodyRender<number>(formatMoney(value)),
      },
    },
    {
      name: 'createdAt',
      label: 'Date Created',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: string) => tableBodyRender<string>(getDate(value)),
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
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: ImportOrderListResponse[] }),
        ) => {
          const { tableData, rowIndex } = tableMeta;
          const rowData = tableData.at(rowIndex) as ImportOrderListResponse;
          return (
            <Tooltip title="View" placement="top" arrow>
              <IconButton
                aria-label="view import order"
                onClick={(event) => {
                  event.stopPropagation();
                  handleOpenImportOrderDialog(rowData);
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
