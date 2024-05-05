import { useContext, useMemo } from 'react';
import { Stack, Grid, Button } from '@mui/material';
import { DialogContext, MuiTextField } from '@components';
import { useFormik } from 'formik';
import { getErrorMessage, isEmpty, Toastify } from '@shared';
import { StoreResponse, useAddStore, useGetAllStores, useUpdateStore } from '@queries/Store';
import { StoreFormFields, StoreFormFieldsType } from './type';
import { initialStoreFormValues, storeFormValidationSchema, StoreToastMessage } from './helpers';

type PropsType = {
  store: StoreResponse;
};

const StoreForm = ({ store }: PropsType) => {
  const isEdit = !isEmpty(store);

  const { closeModal } = useContext(DialogContext);

  const { handleInvalidateStoreList } = useGetAllStores();

  const { addStore, isLoading: isAdding } = useAddStore({
    onSuccess: () => {
      handleInvalidateStoreList();
      Toastify.success(StoreToastMessage.ADD_SUCCESS);
      closeModal();
    },
    onError: (error) => Toastify.error(error?.message),
  });

  const { updateStore, isLoading: isUpdating } = useUpdateStore({
    onSuccess: () => {
      handleInvalidateStoreList();
      Toastify.success(StoreToastMessage.UPDATE_SUCCESS);
      closeModal();
    },
    onError: (error) => Toastify.error(error?.message),
  });

  const handleSubmitStore = (formValues: StoreFormFieldsType) => {
    const { address, hotline } = formValues;
    isEdit ? updateStore({ id: store.id, address, hotline }) : addStore({ address, hotline });
  };

  const getInitialStoreFormValues = useMemo((): StoreFormFieldsType => {
    if (isEdit && store) {
      return { address: store.address, hotline: store.hotline };
    }
    return { ...initialStoreFormValues };
  }, [isEdit, store]);

  const { values, errors, touched, getFieldProps, handleSubmit } = useFormik<StoreFormFieldsType>({
    initialValues: getInitialStoreFormValues,
    validationSchema: storeFormValidationSchema,
    onSubmit: () => {
      handleSubmitStore(values);
    },
    enableReinitialize: true,
  });

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  const isSubmitting = isAdding || isUpdating;

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <MuiTextField
            required
            fullWidth
            size="small"
            label="Store address"
            disabled={isSubmitting}
            errorMessage={getFieldErrorMessage(StoreFormFields.ADDRESS)}
            {...getFieldProps(StoreFormFields.ADDRESS)}
          />
        </Grid>
        <Grid item xs={12}>
          <MuiTextField
            required
            fullWidth
            size="small"
            label="Hotline"
            disabled={isSubmitting}
            errorMessage={getFieldErrorMessage(StoreFormFields.HOTLINE)}
            {...getFieldProps(StoreFormFields.HOTLINE)}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Button variant="outlined" color="inherit" disabled={isSubmitting} onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" disabled={isSubmitting} type="submit">
              {isEdit ? 'Save' : 'Add'}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default StoreForm;
