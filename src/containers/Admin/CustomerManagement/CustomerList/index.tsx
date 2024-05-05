import { CustomTableSearch, EmptyTable, Table } from '@components';
import { Container, Stack, Typography } from '@mui/material';
import { Toastify } from '@shared';
import { MUIDataTableOptions } from 'mui-datatables';
import React, { useMemo } from 'react';
import { GetPropertiesParams, ROLE_ID, useGetAllStaff } from 'src/queries';
import { allColumns } from './allColumns';

const CustomerList: React.FC = () => {
  const { staffs, totalRecords, setParams, isFetching } = useGetAllStaff({
    onError: (error) => {
      Toastify.error(error?.message);
    },
  });

  const handleGetCustomer = (params: GetPropertiesParams) => {
    if (!Array.isArray(params.roles) || params.roles.length === 0) {
      params.roles = [ROLE_ID._USER.toString()];
    }
    setParams({ ...params });
  };

  const tableOptions: MUIDataTableOptions = useMemo(
    () => ({
      count: totalRecords,
      rowHover: totalRecords > 0,
      filter: false,
      search: false,
    }),
    [totalRecords],
  );

  const columns = useMemo(() => allColumns(), []);

  return (
    <Container maxWidth="xl">
      <Stack sx={{ mb: 2, mt: 2 }}>
        <Typography variant="h3" fontWeight={600}>
          Customer Management
        </Typography>
      </Stack>
      <Stack alignItems="center" justifyContent="space-between" flexDirection="row">
        <CustomTableSearch placeholder="Search by first name/ last name/ email..." />
      </Stack>
      <Table
        title=""
        onAction={handleGetCustomer}
        isLoading={isFetching}
        data={staffs}
        tableOptions={tableOptions}
        columns={columns}
        emptyComponent={<EmptyTable />}
      />
    </Container>
  );
};

export default CustomerList;
