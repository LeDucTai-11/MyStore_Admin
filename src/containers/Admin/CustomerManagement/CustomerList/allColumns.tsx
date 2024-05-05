import { MUIDataTableColumn } from 'mui-datatables';
import { GENDER_NAME } from 'src/queries';
import { customStatusRender } from '../../StaffManagement/StaffList/helpers';

export const allColumns = (): MUIDataTableColumn[] => {
  const columns: MUIDataTableColumn[] = [
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
      name: 'deleteAt',
      label: 'Status',
      options: {
        filter: false,
        sort: false,
        customBodyRender: customStatusRender,
      },
    },
  ];

  return columns;
};
