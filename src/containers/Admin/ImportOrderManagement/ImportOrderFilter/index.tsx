import React, { useEffect, useMemo } from 'react';
import { COLOR_CODE, MuiSelect, SelectOption, TableQueryParams } from '@components';
import {
  Container,
  Stack,
  Typography,
  Grid,
  Button,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import {
  IMPORT_ORDER_FILTER_QUERY_KEY,
  ImportOrderFilterFormFieldsType,
} from '../ImportOrderList/helpers';
import { useNavigate, useLocation } from 'react-router-dom';
import { Toastify, getErrorMessage, isEmpty } from '@shared';
import { useGetAllStoreLazy } from '@queries';

const ImportOrderFilter: React.FC<Props> = ({ searchValues, handleClosePopup }) => {
  const navigate = useNavigate();

  const { search } = useLocation();

  const query = useMemo(() => new URLSearchParams(search), [search]);

  const {
    storeOptions,
    setParams: setStoresParams,
    loading: loadingStores,
    fetchNextPage: fetchNextPageStores,
    setInputSearch: setInputSearchStores,
  } = useGetAllStoreLazy({
    onError: (error) => Toastify.error(error?.message),
  });

  useEffect(() => {
    setStoresParams({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInitialImportOrderFilterValues: ImportOrderFilterFormFieldsType = useMemo(
    () => ({
      storeId: searchValues.storeId || null,
    }),
    [searchValues],
  );

  const handleSubmitFilter = (values: ImportOrderFilterFormFieldsType) => {
    const { storeId } = values;
    query.delete(TableQueryParams._PAGE);

    if (!isEmpty(storeId)) {
      query.set(IMPORT_ORDER_FILTER_QUERY_KEY.STORE_ID, storeId);
    } else {
      query.delete(IMPORT_ORDER_FILTER_QUERY_KEY.STORE_ID);
    }
    navigate({ search: query.toString() });
    handleClosePopup();
  };

  const formik = useFormik<ImportOrderFilterFormFieldsType>({
    initialValues: getInitialImportOrderFilterValues,
    onSubmit: handleSubmitFilter,
  });

  const { setValues, handleSubmit, getFieldProps, setFieldValue, touched, errors } = formik;

  const handleOnChangeStore = (e: unknown, value: SelectOption, r: AutocompleteChangeReason) => {
    setFieldValue(IMPORT_ORDER_FILTER_QUERY_KEY.STORE_ID, value?.value);
  };

  const handleSearch = (_e: unknown, value: string, reason: AutocompleteInputChangeReason) => {
    if (reason !== 'reset') {
      setInputSearchStores(value);
    }
  };

  const handleClearAll = () => {
    setValues({
      storeId: null,
    });
    query.delete(IMPORT_ORDER_FILTER_QUERY_KEY.STORE_ID);
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
                label="Select a store"
                placeholder="Choose a store"
                required
                size="small"
                {...getFieldProps(IMPORT_ORDER_FILTER_QUERY_KEY.STORE_ID)}
                onChange={handleOnChangeStore}
                onInputChange={handleSearch}
                options={storeOptions}
                onFetchNextPage={fetchNextPageStores}
                allowLazyLoad
                filterOptions={(x) => x}
                isGetOptionOnChange
                isLoading={loadingStores}
                onBlur={(event, value, reason) => {
                  if (!value) handleSearch(event, '', reason);
                }}
                noOptionsText={'not found'}
                errorMessage={getFieldErrorMessage(IMPORT_ORDER_FILTER_QUERY_KEY.STORE_ID)}
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
  searchValues: ImportOrderFilterFormFieldsType;
  handleClosePopup?: (..._args: any[]) => void;
};

export default ImportOrderFilter;
