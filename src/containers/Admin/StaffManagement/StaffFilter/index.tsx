import { COLOR_CODE, TableQueryParams } from '@components';
import { Button, Container, Grid, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { isEmpty } from '@shared';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  StaffFilterFormFieldsType,
  USER_FILTER_QUERY_KEY,
  UserStatusOptions,
  emptyStaffFilterValues,
} from '../StaffList/helpers';

const StaffFilter: React.FC<Props> = ({ searchValues, handleClosePopup }) => {
  const navigate = useNavigate();

  const { search } = useLocation();

  const query = useMemo(() => new URLSearchParams(search), [search]);

  const handleSubmitFilter = (values: StaffFilterFormFieldsType) => {
    query.delete(TableQueryParams._PAGE);

    Object.keys(values).forEach((key) => {
      if (isEmpty(values[key])) {
        query.delete(key);
      } else {
        query.set(key, values[key].toString());
      }
    });

    navigate({ search: query.toString() });
    handleClosePopup();
  };

  const handleClearAll = () => {
    setValues({
      ...emptyStaffFilterValues,
    });
    Object.keys(emptyStaffFilterValues).forEach((key) => {
      query.delete(key);
    });
    navigate({ search: query.toString() });
    handleClosePopup();
  };

  const getInitialStaffFilterValues: StaffFilterFormFieldsType = useMemo(
    () => ({
      active: searchValues.active || null,
    }),
    [searchValues],
  );

  const formik = useFormik<StaffFilterFormFieldsType>({
    initialValues: getInitialStaffFilterValues,
    onSubmit: handleSubmitFilter,
  });
  const { setValues, handleSubmit, getFieldProps, values } = formik;

  return (
    <Container maxWidth="xs" sx={{ p: 2 }}>
      <Stack direction="row" alignItems="flex-end" mb={2} justifyContent="space-between">
        <Typography variant="h3" mr={3} color={COLOR_CODE.GREY_900} fontWeight="bold">
          Filters
        </Typography>
      </Stack>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack
                direction="column"
                sx={{
                  border: `1px solid ${COLOR_CODE.GREY_300} `,
                  borderRadius: 2,
                }}
              >
                <Typography
                  fontWeight={700}
                  bgcolor={COLOR_CODE.GREY_50}
                  p={1}
                  borderRadius="8px 8px 0 0"
                >
                  Status
                </Typography>
                <RadioGroup
                  sx={{ display: 'flex', gap: 2, flexDirection: 'column', padding: 2 }}
                  {...getFieldProps(USER_FILTER_QUERY_KEY._STATUS)}
                  value={values?.active ?? null}
                >
                  {UserStatusOptions.map((option, index) => (
                    <Stack key={index} flexDirection={'row'} alignItems={'center'} gap={3}>
                      <Radio value={option.value} />
                      <Typography>{option.label}</Typography>
                    </Stack>
                  ))}
                </RadioGroup>
              </Stack>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button variant="outlined" sx={{ mr: 2 }} onClick={handleClearAll}>
                Reset
              </Button>

              <Button variant="contained" color="primary" onClick={() => handleSubmit()}>
                Apply Filter
              </Button>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Container>
  );
};

type Props = {
  searchValues: StaffFilterFormFieldsType;
  handleClosePopup?: (..._args: any[]) => void;
};

export default StaffFilter;
