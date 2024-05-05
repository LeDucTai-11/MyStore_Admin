import { useContext, useMemo } from 'react';
import { Stack, Grid, Button } from '@mui/material';
import { DialogContext, MuiTextField, Loading, COLOR_CODE } from '@components';
import { useFormik } from 'formik';
import { CategoryFormFieldsType, CategoryFormFields } from './type';
import {
  initialCategoryFormValues,
  categoryFormValidationSchema,
  CategoryToastMessage,
} from './helpers';
import { getErrorMessage, isEmpty, Toastify } from '@shared';
import {
  useAddCategory,
  useUpdateCategory,
  useGetCategoryDetails,
  useGetAllCategories,
} from '@queries/Category';
import UploadImage from '@components/UploadImage';

type PropsType = {
  categoryId: string;
};

const CategoryForm = ({ categoryId }: PropsType) => {
  const isEdit = !isEmpty(categoryId);

  const { closeModal } = useContext(DialogContext);

  const { category, isFetching } = useGetCategoryDetails(categoryId, {
    onError: (error) => Toastify.error(error?.message),
  });

  const { handleInvalidateCategoryList } = useGetAllCategories();

  const { addCategory, isLoading: isAdding } = useAddCategory({
    onSuccess: () => {
      handleInvalidateCategoryList();
      Toastify.success(CategoryToastMessage.ADD_SUCCESS);
      closeModal();
    },
    onError: (error) => Toastify.error(error?.message),
  });

  const { updateCategory, isLoading: isUpdating } = useUpdateCategory({
    onSuccess: () => {
      handleInvalidateCategoryList();
      Toastify.success(CategoryToastMessage.UPDATE_SUCCESS);
      closeModal();
    },
    onError: (error) => Toastify.error(error?.message),
  });

  const handleSubmitCategory = (formValues: CategoryFormFieldsType) => {
    const { categoryName, description } = formValues;
    isEdit
      ? updateCategory({ id: category?.id, name: categoryName, image: values.image, description })
      : addCategory({ name: categoryName, image: values.image, description });
  };

  const getInitialCategoryFormValues = useMemo((): CategoryFormFieldsType => {
    if (isEdit && category) {
      return {
        categoryName: category.name,
        description: category.description,
        image: category.image,
      };
    }
    return { ...initialCategoryFormValues };
  }, [isEdit, category]);

  const { values, errors, touched, setFieldValue, getFieldProps, handleSubmit } =
    useFormik<CategoryFormFieldsType>({
      initialValues: getInitialCategoryFormValues,
      validationSchema: categoryFormValidationSchema,
      onSubmit: () => {
        handleSubmitCategory(values);
      },
      enableReinitialize: true,
    });

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  const isSubmitting = isAdding || isUpdating;

  const handleImageUrlChange = (newUrl: string) => {
    setFieldValue(CategoryFormFields.IMAGE, newUrl);
  };

  return isFetching ? (
    <Loading variant="primary" size="small" />
  ) : (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Stack direction="row" justifyContent="space-between" gap={2}>
        <Stack
          padding="24px"
          justifyContent="center"
          gap={1}
          sx={{
            border: `1px solid ${COLOR_CODE.GREY_300} `,
            borderRadius: 2,
            width: '100%',
          }}
        >
          <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <MuiTextField
                required
                fullWidth
                size="small"
                label="Category name"
                placeholder="Category name"
                disabled={isSubmitting}
                errorMessage={getFieldErrorMessage(CategoryFormFields.CATEGORY_NAME)}
                {...getFieldProps(CategoryFormFields.CATEGORY_NAME)}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiTextField
                fullWidth
                multiline
                minRows={5}
                size="small"
                label="Description"
                placeholder="Description"
                disabled={isSubmitting}
                errorMessage={getFieldErrorMessage(CategoryFormFields.DESCRIPTION)}
                {...getFieldProps(CategoryFormFields.DESCRIPTION)}
              />
            </Grid>
          </Grid>
        </Stack>
        <Stack
          padding="24px"
          gap={1}
          sx={{
            border: `1px solid ${COLOR_CODE.GREY_300} `,
            borderRadius: 2,
            width: '100%',
          }}
        >
          <UploadImage
            importTypeId={`category:${category?.id}`}
            imageUrl={values.image}
            uploadMethod={isEdit ? 'UPDATE' : 'ADD'}
            handleImageUrlChange={handleImageUrlChange}
          />
        </Stack>
      </Stack>
      <Stack
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        marginTop={3}
      >
        <Button variant="outlined" color="inherit" disabled={isSubmitting} onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" disabled={isSubmitting} type="submit">
          {isEdit ? 'Save' : 'Add'}
        </Button>
      </Stack>
    </form>
  );
};

export default CategoryForm;
