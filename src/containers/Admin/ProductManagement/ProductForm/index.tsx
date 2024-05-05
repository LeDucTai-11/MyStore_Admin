import { IMAGES } from '@appConfig/images';
import {
  COLOR_CODE,
  DialogContext,
  Image,
  MuiInput,
  MuiSelect,
  MuiTextField,
  SelectOption,
} from '@components';
import UploadImage from '@components/UploadImage';
import {
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  Box,
  Button,
  Stack,
} from '@mui/material';
import {
  ProductPayload,
  useAddNewProduct,
  useGetAllCategoryLazy,
  useGetAllProduct,
  useGetProductById,
  useUpdateProduct,
} from '@queries';
import { Toastify, getErrorMessage, handleKeyDownNumberInput } from '@shared';
import toastify from '@shared/services/toastify';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useContext, useEffect, useMemo } from 'react';
import { PRODUCT_FORM_KEY } from '../helpers';
import ProductFormSkeleton from './ProductFormSkeleton';
import { PRODUCT_KEY, ProductSchema, ProductToastMessage, initialProduct } from './helpers';

type Props = {
  productId?: string;
  isEditing?: boolean;
  readonly?: boolean;
};

const ProductForm: React.FC<Props> = ({ productId, isEditing, readonly }) => {
  const handleImageUrlChange = (newUrl: string) => {
    setFieldValue(PRODUCT_FORM_KEY.image, newUrl);
  };

  const { productData, isLoadingProduct } = useGetProductById({
    onError: (error) => Toastify.error(error.message),
    id: productId,
  });

  const { handleInvalidateAllProducts } = useGetAllProduct();

  const { categoryOptions, setParams, loading, fetchNextPage, setInputSearch } =
    useGetAllCategoryLazy({
      onError: (error) => toastify.error(error.message),
    });

  useEffect(() => {
    setParams({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const INITIAL: ProductPayload = useMemo(() => {
    if (productData) {
      return {
        ...initialProduct,
        id: productData.id,
        categoryId: productData.category.id,
        description: productData.description,
        name: productData.name,
        price: productData.price,
        image: productData.image,
      };
    }
    return { ...initialProduct };
  }, [productData]);

  const { closeModal } = useContext(DialogContext);

  const { onAddNewProduct, isLoading: isAdding } = useAddNewProduct({
    onSuccess: () => {
      handleInvalidateAllProducts();
      Toastify.success(ProductToastMessage.ADD_SUCCESS);
      closeModal();
    },
    onError: (error) => Toastify.error(error?.message),
  });

  const { onUpdateProduct, isUpdating } = useUpdateProduct({
    onSuccess: () => {
      handleInvalidateAllProducts();
      Toastify.success(ProductToastMessage.UPDATE_SUCCESS);
      closeModal();
    },
    onError: (error) => Toastify.error(error?.message),
  });

  const handleSearch = (_e: unknown, value: string, reason: AutocompleteInputChangeReason) => {
    if (reason !== 'reset') {
      setInputSearch(value);
    }
  };

  const handleOnChange = (e: unknown, value: SelectOption, r: AutocompleteChangeReason) => {
    setFieldValue(PRODUCT_FORM_KEY.categoryId, value?.value || null);
  };

  const handleSubmitForm = (values: ProductPayload) => {
    const payload: ProductPayload = {
      ...values,
      price: Number(values.price),
    };
    isEditing ? onUpdateProduct(payload) : onAddNewProduct(payload);
  };

  const formik = useFormik<ProductPayload>({
    initialValues: INITIAL,
    validationSchema: ProductSchema,
    onSubmit: handleSubmitForm,
    enableReinitialize: true,
  });

  const { errors, touched, getFieldProps, handleSubmit, setFieldValue, values } = formik;

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  if (isLoadingProduct) return <ProductFormSkeleton readonly={readonly} />;

  return (
    <Stack marginX="-24px">
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: 550,
              overflow: 'hidden',
              overflowY: 'auto',
            }}
          >
            <Stack direction="row" justifyContent="space-between" padding="0px 24px 8px" gap={2}>
              <Stack
                padding="24px"
                gap={2}
                sx={{
                  border: `1px solid ${COLOR_CODE.GREY_300} `,
                  borderRadius: 2,
                  width: '100%',
                }}
              >
                <MuiTextField
                  required
                  label="Product Name"
                  errorMessage={getFieldErrorMessage(PRODUCT_KEY.PRODUCT_NAME)}
                  placeholder="Enter product name"
                  fullWidth
                  multiline
                  size="small"
                  readOnly={readonly}
                  {...getFieldProps(PRODUCT_KEY.PRODUCT_NAME)}
                />
                <MuiTextField
                  required
                  label="Description"
                  errorMessage={getFieldErrorMessage(PRODUCT_KEY.DESCRIPTION)}
                  placeholder="Enter description"
                  fullWidth
                  multiline
                  minRows={5}
                  size="small"
                  readOnly={readonly}
                  {...getFieldProps(PRODUCT_KEY.DESCRIPTION)}
                  InputProps={{
                    inputProps: {
                      maxLength: 255,
                    },
                  }}
                />
                <MuiSelect
                  label="Category"
                  placeholder="Choose a category"
                  required
                  size="small"
                  defaultValue={productData?.category?.name ?? null}
                  errorMessage={getFieldErrorMessage(PRODUCT_FORM_KEY.categoryId)}
                  {...getFieldProps(PRODUCT_FORM_KEY.categoryId)}
                  onChange={handleOnChange}
                  onInputChange={handleSearch}
                  options={categoryOptions}
                  onFetchNextPage={fetchNextPage}
                  allowLazyLoad
                  filterOptions={(x) => x}
                  isGetOptionOnChange
                  isLoading={loading}
                  readOnly={readonly}
                  onBlur={(event, value, reason) => {
                    if (!value) handleSearch(event, '', reason);
                  }}
                  noOptionsText={'not found'}
                />
                {readonly && (
                  <MuiInput
                    required
                    label="Quantity"
                    fullWidth
                    size="small"
                    readOnly={readonly}
                    value={productData.amount}
                  />
                )}
                <MuiInput
                  required
                  label="Price"
                  errorMessage={getFieldErrorMessage(PRODUCT_KEY.PRICE)}
                  placeholder="Enter price"
                  fullWidth
                  size="small"
                  readOnly={readonly}
                  onKeyDown={handleKeyDownNumberInput}
                  {...getFieldProps(PRODUCT_KEY.PRICE)}
                  InputProps={{
                    endAdornment: 'VND',
                  }}
                />
              </Stack>
              <Stack
                padding="24px"
                sx={{
                  border: `1px solid ${COLOR_CODE.GREY_300} `,
                  borderRadius: 2,
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                {readonly ? (
                  <Image
                    src={values.image || IMAGES.noImage}
                    sx={{ height: '100%', objectFit: 'scale-down' }}
                  />
                ) : (
                  <UploadImage
                    importTypeId={`product:${productData?.id}`}
                    imageUrl={values.image}
                    uploadMethod={isEditing ? 'UPDATE' : 'ADD'}
                    handleImageUrlChange={handleImageUrlChange}
                  />
                )}
              </Stack>
            </Stack>
          </Box>
          {!readonly && (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                padding: '16px 24px 0px',
                gap: 2,
                borderRadius: '0 0 16px 16px',
              }}
            >
              <Button
                variant="outlined"
                color="inherit"
                onClick={closeModal}
                disabled={isLoadingProduct || isAdding || isUpdating}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoadingProduct || isAdding || isUpdating}
                variant="contained"
                color="primary"
              >
                {isEditing ? 'Save' : 'Add'}
              </Button>
            </Stack>
          )}
        </Form>
      </FormikProvider>
    </Stack>
  );
};

export default ProductForm;
