import { IMAGES } from '@appConfig/images';
import { COLOR_CODE, Image, UserRole } from '@components';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { Callback, RoleService, formatMoney, tableBodyRender } from '@shared';
import { MUIDataTableColumn, MUIDataTableMeta } from 'mui-datatables';
import { IoEye, IoPencil, IoTrashBin } from 'react-icons/io5';
import { CategoryResponse, ProductResponse } from 'src/queries';

type ColumnProps = {
  handleDelete: Callback;
  handleEdit: Callback;
  handleView: Callback;
  roleId: UserRole;
};

export const allColumns = ({
  handleEdit,
  handleDelete,
  handleView,
  roleId,
}: ColumnProps): MUIDataTableColumn[] => {
  const columns: MUIDataTableColumn[] = [
    {
      name: 'name',
      label: 'Product Name',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (
          value,
          tableMeta:
            | MUIDataTableMeta
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: ProductResponse[] }),
        ) => {
          const { tableData, rowIndex } = tableMeta;
          const rowData = tableData.at(rowIndex) as ProductResponse;
          return (
            <Stack flexDirection="row" alignItems="center" gap={1}>
              <Image
                src={rowData.image || IMAGES.noImage}
                sx={{ width: '80px', height: '80px', objectFit: 'contain' }}
              />
              <Typography variant="body2">{tableBodyRender<string>(value)}</Typography>
            </Stack>
          );
        },
      },
    },
    {
      name: 'category',
      label: 'Category',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: CategoryResponse) => tableBodyRender(value.name),
      },
    },
    {
      name: 'amount',
      label: 'Stock',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: number) => tableBodyRender<number>(value),
      },
    },
    {
      name: 'price',
      label: 'Selling Price',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: number) => tableBodyRender(formatMoney(value)),
      },
    },
    {
      name: '',
      label: 'Actions',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (
          _value: string,
          meta:
            | MUIDataTableMeta
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: ProductResponse[] }),
        ) => {
          const { tableData, rowIndex } = meta;
          const rowData = tableData.at(rowIndex) as ProductResponse;
          return (
            <Stack flexDirection="row" justifyContent={'center'}>
              <Tooltip title="View" arrow placement="top">
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    handleView(rowData);
                  }}
                >
                  <IoEye color={COLOR_CODE.GREY_600} size={20} />
                </IconButton>
              </Tooltip>
              {RoleService.isAdminRole(roleId) && (
                <Tooltip title="Edit" arrow placement="top">
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation();
                      handleEdit(rowData);
                    }}
                  >
                    <IoPencil color={COLOR_CODE.GREY_600} size={20} />
                  </IconButton>
                </Tooltip>
              )}
              {RoleService.isAdminRole(roleId) && (
                <Tooltip title="Delete" arrow placement="top">
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDelete(rowData);
                    }}
                  >
                    <IoTrashBin color={COLOR_CODE.GREY_600} size={20} />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          );
        },
        setCellHeaderProps: () => ({ style: { textAlign: 'center' } }),
      },
    },
  ];

  return columns;
};
