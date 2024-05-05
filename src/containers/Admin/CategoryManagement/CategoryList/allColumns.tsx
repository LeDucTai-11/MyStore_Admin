import { IMAGES } from '@appConfig/images';
import { COLOR_CODE, Image, UserRole } from '@components';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { CategoryListResponse, CountType } from '@queries/Category';
import { RoleService, getDate, tableBodyRender } from '@shared';
import { MUIDataTableColumn, MUIDataTableMeta } from 'mui-datatables';
import { IoPencil } from 'react-icons/io5';

type ColumnProps = {
  handleOpenCategoryDialog: (..._args: any[]) => void;
  roleId: UserRole;
};

export const allColumns = ({
  handleOpenCategoryDialog,
  roleId,
}: ColumnProps): MUIDataTableColumn[] => {
  const columns: MUIDataTableColumn[] = [
    {
      name: 'name',
      label: 'Category Name',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (
          value,
          tableMeta:
            | MUIDataTableMeta
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: CategoryListResponse[] }),
        ) => {
          const { tableData, rowIndex } = tableMeta;
          const rowData = tableData.at(rowIndex) as CategoryListResponse;
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
      name: 'description',
      label: 'Description',
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
      name: '_count',
      label: 'Products',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (_count: CountType) => tableBodyRender<number>(_count.products),
      },
    },
    {
      name: 'createdAt',
      label: 'Date Added',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: string) => tableBodyRender<string>(getDate(value)),
      },
    },
    {
      name: '',
      label: `${RoleService.isAdminRole(roleId) ? 'Action' : ''}`,
      options: {
        filter: false,
        sort: false,
        customBodyRender: (
          value,
          tableMeta:
            | MUIDataTableMeta
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: CategoryListResponse[] }),
        ) => {
          const { tableData, rowIndex } = tableMeta;
          const rowData = tableData.at(rowIndex) as CategoryListResponse;
          return (
            RoleService.isAdminRole(roleId) && (
              <Tooltip title="Edit" placement="top" arrow>
                <IconButton
                  aria-label="edit category"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleOpenCategoryDialog(rowData.id);
                  }}
                >
                  <IoPencil color={COLOR_CODE.GREY_600} size={20} />
                </IconButton>
              </Tooltip>
            )
          );
        },
      },
    },
  ];

  return columns;
};
