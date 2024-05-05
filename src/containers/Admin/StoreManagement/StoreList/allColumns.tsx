import { COLOR_CODE, UserRole } from '@components';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { StoreResponse } from '@queries/Store';
import { RoleService, tableBodyRender } from '@shared';
import { MUIDataTableColumn, MUIDataTableMeta } from 'mui-datatables';
import { IoPencil, IoTrashBin } from 'react-icons/io5';

type ColumnProps = {
  handleOpenStoreDialog: (..._args: any[]) => void;
  handleOpenDeleteDialog: (..._args: any[]) => void;
  roleId: UserRole;
};

export const allColumns = ({
  handleOpenStoreDialog,
  handleOpenDeleteDialog,
  roleId,
}: ColumnProps): MUIDataTableColumn[] => {
  const columns: MUIDataTableColumn[] = [
    {
      name: 'address',
      label: 'Address',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: string) => tableBodyRender<string>(value),
      },
    },
    {
      name: 'hotline',
      label: 'Hotline',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string) => tableBodyRender<string>(value),
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
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: StoreResponse[] }),
        ) => {
          const { tableData, rowIndex } = tableMeta;
          const rowData = tableData.at(rowIndex);
          return (
            RoleService.isAdminRole(roleId) && (
              <Stack flexDirection={'row'} justifyContent={'center'}>
                <Tooltip title="Edit" placement="top" arrow>
                  <IconButton
                    aria-label="edit store"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleOpenStoreDialog(rowData);
                    }}
                  >
                    <IoPencil color={COLOR_CODE.GREY_600} size={20} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete" placement="top" arrow>
                  <IconButton
                    aria-label="delete store"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleOpenDeleteDialog(rowData);
                    }}
                  >
                    <IoTrashBin color={COLOR_CODE.GREY_600} size={20} />
                  </IconButton>
                </Tooltip>
              </Stack>
            )
          );
        },
        setCellHeaderProps: () => ({ style: { textAlign: 'center' } }),
      },
    },
  ];

  return columns;
};
