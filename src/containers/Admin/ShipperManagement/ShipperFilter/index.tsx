import { COLOR_CODE, MuiSelect, SelectOption, TableQueryParams } from '@components';
import { AutocompleteChangeReason, AutocompleteInputChangeReason, Button, Container, Grid, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { Toastify, getErrorMessage, isEmpty } from '@shared';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ShipperFilterFormFieldsType,
  USER_FILTER_QUERY_KEY,
  UserStatusOptions,
  emptyShipperFilterValues,
} from '../ShipperList/helpers';
import { useGetAllStoreLazy } from '@queries';

const ShipperFilter: React.FC<Props> = ({ searchValues, handleClosePopup }) => {
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

  const handleSubmitFilter = (values: ShipperFilterFormFieldsType) => {
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
      ...emptyShipperFilterValues,
    });
    Object.keys(emptyShipperFilterValues).forEach((key) => {
      query.delete(key);
    });
    navigate({ search: query.toString() });
    handleClosePopup();
  };

  const getInitialShipperFilterValues: ShipperFilterFormFieldsType = useMemo(
    () => ({
      active: searchValues.active || null,
      storeId: searchValues.storeId || null,
    }),
    [searchValues],
  );

  const formik = useFormik<ShipperFilterFormFieldsType>({
    initialValues: getInitialShipperFilterValues,
    onSubmit: handleSubmitFilter,
  });
  const { setValues, handleSubmit, getFieldProps, setFieldValue, touched, errors } = formik;

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  const handleOnChangeStore = (e: unknown, value: SelectOption, r: AutocompleteChangeReason) => {
    setFieldValue(USER_FILTER_QUERY_KEY._STORE_ID, value?.value);
  };

  const handleSearch = (_e: unknown, value: string, reason: AutocompleteInputChangeReason) => {
    if (reason !== 'reset') {
      setInputSearchStores(value);
    }
  };

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
            <Grid item xs={12}>
              <MuiSelect
                label="Select a store"
                placeholder="Choose a store"
                required
                size="small"
                {...getFieldProps(USER_FILTER_QUERY_KEY._STORE_ID)}
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
                errorMessage={getFieldErrorMessage(USER_FILTER_QUERY_KEY._STORE_ID)}
              />
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
  searchValues: ShipperFilterFormFieldsType;
  handleClosePopup?: (..._args: any[]) => void;
};

export default ShipperFilter;
