import { COLOR_CODE, MuiMultiSelect, MuiSelect, SelectOption, TableQueryParams } from '@components';
import {
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useGetAllCategoryLazy } from '@queries/Category/useGetAllCategoryLazy';
import { getErrorMessage, isEmpty } from '@shared';
import toastify from '@shared/services/toastify';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PRODUCT_FILTER_QUERY_KEY, ProductFilterFormValue } from '../helpers';
import { useGetAllStoreLazy } from '@queries/Store/useGetAllStoreLazy';

const ProductFilter: React.FC<Props> = ({ searchValues, handleClosePopup }) => {
  const {
    categoryOptions,
    setParams: setCategoriesParams,
    loading: loadingCategories,
    fetchNextPage: fetchNextPageCategories,
    setInputSearch: setInputSearchCategories,
  } = useGetAllCategoryLazy({
    onError: (error) => toastify.error(error.message),
  });

  const {
    storeOptions,
    setParams: setStoresParams,
    loading: loadingStores,
    fetchNextPage: fetchNextPageStores,
    setInputSearch: setInputSearchStores,
  } = useGetAllStoreLazy({
    onError: (error) => toastify.error(error.message),
  });

  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    setCategoriesParams({});
    setStoresParams({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const query = useMemo(() => new URLSearchParams(search), [search]);

  const handleSubmitFilter = (values: ProductFilterFormValue) => {
    const { categories, storeId } = values;
    query.delete(TableQueryParams._PAGE);

    if (!isEmpty(categories)) {
      query.delete(PRODUCT_FILTER_QUERY_KEY.Categories);
      categories.forEach((item) => {
        query.append(PRODUCT_FILTER_QUERY_KEY.Categories, item.toString());
      });
    } else {
      query.delete(PRODUCT_FILTER_QUERY_KEY.Categories);
    }

    if (!isEmpty(storeId)) {
      query.set(PRODUCT_FILTER_QUERY_KEY.StoreId, storeId);
    } else {
      query.delete(PRODUCT_FILTER_QUERY_KEY.StoreId);
    }
    navigate({ search: query.toString() });
    handleClosePopup();
  };

  const handleClearAll = () => {
    setValues({
      categories: null,
      storeId: null,
    });
    query.delete(PRODUCT_FILTER_QUERY_KEY.Categories);
    query.delete(PRODUCT_FILTER_QUERY_KEY.StoreId);
    navigate({ search: query.toString() });
    handleClosePopup();
  };

  const initialValue: ProductFilterFormValue = useMemo(
    () => ({
      categories: searchValues.categories || [],
      storeId: searchValues.storeId || null,
    }),
    [searchValues],
  );

  const formik = useFormik<ProductFilterFormValue>({
    initialValues: initialValue,
    onSubmit: handleSubmitFilter,
  });
  const { setValues, handleSubmit, getFieldProps, setFieldValue, touched, errors } = formik;

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  const handleSearch = (_e: unknown, value: string, reason: AutocompleteInputChangeReason) => {
    if (reason !== 'reset') {
      setInputSearchCategories(value);
      setInputSearchStores(value);
    }
  };

  const handleOnChangeCategory = (
    e: unknown,
    value: SelectOption[],
    r: AutocompleteChangeReason,
  ) => {
    setFieldValue(PRODUCT_FILTER_QUERY_KEY.Categories, value.map((v) => v.value) || null);
  };

  const handleOnChangeStore = (e: unknown, value: SelectOption, r: AutocompleteChangeReason) => {
    setFieldValue(PRODUCT_FILTER_QUERY_KEY.StoreId, value?.value);
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
              <MuiMultiSelect
                label="Select categories"
                placeholder="Choose a category"
                required
                size="small"
                {...getFieldProps(PRODUCT_FILTER_QUERY_KEY.Categories)}
                onChange={handleOnChangeCategory}
                onInputChange={handleSearch}
                options={categoryOptions}
                onFetchNextPage={fetchNextPageCategories}
                allowLazyLoad
                filterOptions={(x) => x}
                isGetOptionOnChange
                isLoading={loadingCategories}
                onBlur={(event, value, reason) => {
                  if (!value) handleSearch(event, '', reason);
                }}
                noOptionsText={'not found'}
                errorMessage={getFieldErrorMessage(PRODUCT_FILTER_QUERY_KEY.Categories)}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiSelect
                label="Select a store"
                placeholder="Choose a store"
                required
                size="small"
                {...getFieldProps(PRODUCT_FILTER_QUERY_KEY.StoreId)}
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
                errorMessage={getFieldErrorMessage(PRODUCT_FILTER_QUERY_KEY.StoreId)}
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
  searchValues: ProductFilterFormValue;
  handleClosePopup?: (..._args: any[]) => void;
};

export default ProductFilter;
