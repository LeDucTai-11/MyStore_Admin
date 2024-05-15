import { COLOR_CODE } from '@components';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { isEmpty } from '@shared';
import { MUIDataTableColumn, MUIDataTableMeta } from 'mui-datatables';
import { IoLockClosed } from 'react-icons/io5';
import { GENDER_NAME, StaffResponse } from 'src/queries';
import { customRoleRender, customStatusRender } from './helpers';

type ColumnProps = {
  handleOpenDeactivateDialog: (..._args: any[]) => void;
};

export const allColumns = ({ handleOpenDeactivateDialog }: ColumnProps): MUIDataTableColumn[] => {
  const columns: MUIDataTableColumn[] = [
    {
      name: 'userRoles',
      label: 'Role',
      options: {
        filter: false,
        sort: false,
        customBodyRender: customRoleRender,
      },
    },
    {
      name: 'firstName',
      label: 'First Name',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: string) => value ?? '--',
      },
    },
    {
      name: 'lastName',
      label: 'Last Name',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: string) => value ?? '--',
      },
    },
    {
      name: 'gender',
      label: 'Gender',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string) => GENDER_NAME[value] ?? '--',
      },
    },
    {
      name: 'phone',
      label: 'Phone',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string) => value ?? '--',
      },
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string) => value ?? '--',
      },
    },
    {
      name: 'deletedAt',
      label: 'Status',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string) => customStatusRender(value),
      },
    },
    {
      name: '',
      label: 'Action',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (
          _value: string,
          meta:
            | MUIDataTableMeta
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: StaffResponse[] }),
        ) => {
          const { tableData, rowIndex } = meta;
          const rowData = tableData.at(rowIndex) as StaffResponse;
          return isEmpty(rowData.deletedAt) ? (
            <Stack flexDirection="row">
              <Tooltip title={'Deactivate'} arrow placement="top">
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    handleOpenDeactivateDialog(rowData);
                  }}
                  sx={{ color: COLOR_CODE.GREY_600 }}
                >
                  <IoLockClosed size={20} />
                </IconButton>
              </Tooltip>
            </Stack>
          ) : null;
        },
      },
    },
  ];

  return columns;
};
