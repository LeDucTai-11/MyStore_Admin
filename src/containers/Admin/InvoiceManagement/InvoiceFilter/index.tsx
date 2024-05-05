import { COLOR_CODE, MuiSelect, SelectOption, TableQueryParams } from '@components';
import {
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { ROLE_ID, useGetStaffLazy } from '@queries';
import { Toastify, getErrorMessage, isEmpty } from '@shared';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { INVOICE_FILTER_QUERY_KEY, InvoiceFilterFormFieldsType } from '../InvoiceList/helpers';

const InvoiceFilter: React.FC<Props> = ({ searchValues, handleClosePopup }) => {
  const navigate = useNavigate();

  const { search } = useLocation();

  const query = useMemo(() => new URLSearchParams(search), [search]);

  const {
    staffOptions,
    params,
    setParams: setStaffParams,
    isLoading: isLoadingStaff,
    fetchNextPage: fetchNextPageStaff,
    setInputSearch: setInputSearchStaff,
  } = useGetStaffLazy({
    onError: (error) => Toastify.error(error?.message),
  });

  useEffect(
    () =>
      setStaffParams({
        ...params,
        roles: [ROLE_ID._STAFF.toString(), ROLE_ID._ADMIN.toString()],
      }),
    [params, setStaffParams],
  );

  const getInitialInvoiceFilterValues: InvoiceFilterFormFieldsType = useMemo(
    () => ({
      createdBy: searchValues.createdBy || null,
    }),
    [searchValues],
  );

  const handleSubmitFilter = (values: InvoiceFilterFormFieldsType) => {
    const { createdBy } = values;
    query.delete(TableQueryParams._PAGE);

    if (!isEmpty(createdBy)) {
      query.set(INVOICE_FILTER_QUERY_KEY.CREATED_BY, createdBy);
    } else {
      query.delete(INVOICE_FILTER_QUERY_KEY.CREATED_BY);
    }
    navigate({ search: query.toString() });
    handleClosePopup();
  };

  const formik = useFormik<InvoiceFilterFormFieldsType>({
    initialValues: getInitialInvoiceFilterValues,
    onSubmit: handleSubmitFilter,
  });

  const { setValues, handleSubmit, getFieldProps, setFieldValue, touched, errors } = formik;

  const handleOnChangeStaff = (e: unknown, value: SelectOption, r: AutocompleteChangeReason) => {
    setFieldValue(INVOICE_FILTER_QUERY_KEY.CREATED_BY, value?.value);
  };

  const handleSearch = (_e: unknown, value: string, reason: AutocompleteInputChangeReason) => {
    if (reason !== 'reset') {
      setInputSearchStaff(value);
    }
  };

  const handleClearAll = () => {
    setValues({
      createdBy: null,
    });
    query.delete(INVOICE_FILTER_QUERY_KEY.CREATED_BY);
    navigate({ search: query.toString() });
    handleClosePopup();
  };

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  return (
    <Container maxWidth="xs" sx={{ p: 2 }}>
      <Stack direction="row" alignItems="flex-end" mb={2} justifyContent="space-between">
        <Typography variant="h3" mr={3} color={COLOR_CODE.GREY_900} fontWeight="bold">
          Filter
        </Typography>
      </Stack>

      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MuiSelect
                label="Select a staff"
                placeholder="Choose a staff"
                required
                size="small"
                {...getFieldProps(INVOICE_FILTER_QUERY_KEY.CREATED_BY)}
                onChange={handleOnChangeStaff}
                onInputChange={handleSearch}
                options={staffOptions}
                onFetchNextPage={fetchNextPageStaff}
                allowLazyLoad
                filterOptions={(x) => x}
                isGetOptionOnChange
                isLoading={isLoadingStaff}
                onBlur={(event, value, reason) => {
                  if (!value) handleSearch(event, '', reason);
                }}
                noOptionsText={'not found'}
                errorMessage={getFieldErrorMessage(INVOICE_FILTER_QUERY_KEY.CREATED_BY)}
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button variant="outlined" sx={{ mr: 2 }} onClick={handleClearAll}>
                Reset
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => handleSubmit()}
              >
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
  searchValues: InvoiceFilterFormFieldsType;
  handleClosePopup?: (..._args: any[]) => void;
};

export default InvoiceFilter;
