import { DEFAULT_PASSWORD } from '@appConfig/constants';
import { COLOR_CODE, DialogContext, MuiSelect, MuiTextField, SelectOption } from '@components';
import {
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { useGetAllShipper, useGetAllStoreLazy } from '@queries';
import { useAddShipper } from '@queries/Shipper/useAddShipper';
import { Toastify, getErrorMessage } from '@shared';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';

import { AddShipperFormFields, AddShipperFormFieldsType } from './type';
import {
  ShipperToastMessage,
  addShipperFormValidationSchema,
  initialAddShipperFormValues,
} from './helpers';

const ShipperForm = () => {
  const { closeModal } = useContext(DialogContext);
  const [storeId, setStoreId] = useState<string>('');

  const { handleInvalidateAllShippers } = useGetAllShipper();

  const { addShipper, isLoading } = useAddShipper({
    onSuccess: () => {
      handleInvalidateAllShippers();
      Toastify.success(ShipperToastMessage.ADD_SUCCESS);
      closeModal();
    },
    onError: (error) => Toastify.error(error?.message),
  });

  const handleAddShipper = (formValues: AddShipperFormFieldsType) => {
    const { firstName, lastName, gender, phoneNumber, email, address } = formValues;
    addShipper({
      firstName,
      lastName,
      username: email,
      password: DEFAULT_PASSWORD,
      gender: +gender,
      phone: phoneNumber,
      email,
      address,
      storeId
    });
  };

  const { values, errors, touched, getFieldProps, handleSubmit } =
    useFormik<AddShipperFormFieldsType>({
      initialValues: initialAddShipperFormValues,
      validationSchema: addShipperFormValidationSchema,
      onSubmit: () => {
        handleAddShipper(values);
      },
    });

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  const { storeOptions, setParams, loading, fetchNextPage, setInputSearch } = useGetAllStoreLazy({
    onError: (error) => Toastify.error(error.message),
  });

  useEffect(() => {
    setParams({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (_e: unknown, value: string, reason: AutocompleteInputChangeReason) => {
    if (reason !== 'reset') {
      setInputSearch(value);
    }
  };

  const handleOnChange = (e: unknown, value: SelectOption, r: AutocompleteChangeReason) => {
    setStoreId(value?.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <MuiTextField
            required
            fullWidth
            size="small"
            label="First name"
            placeholder="First name"
            errorMessage={getFieldErrorMessage(AddShipperFormFields.FIRST_NAME)}
            {...getFieldProps(AddShipperFormFields.FIRST_NAME)}
          />
        </Grid>
        <Grid item xs={6}>
          <MuiTextField
            required
            fullWidth
            size="small"
            label="Last name"
            placeholder="Last name"
            errorMessage={getFieldErrorMessage(AddShipperFormFields.LAST_NAME)}
            {...getFieldProps(AddShipperFormFields.LAST_NAME)}
          />
        </Grid>

        <Grid item xs={3}>
          <Stack spacing="10px">
            <FormLabel
              id="label-gender"
              className="form__label"
              sx={{ color: COLOR_CODE.GREY_700 }}
            >
              Gender <span className="text-red-500 font-bold text-md">*</span>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="label-gender"
              name="gender"
              {...getFieldProps(AddShipperFormFields.GENDER)}
            >
              <FormControlLabel
                value={1}
                control={<Radio size="small" disableRipple />}
                label="Male"
              />
              <FormControlLabel
                value={0}
                control={<Radio size="small" disableRipple />}
                label="Female"
              />
            </RadioGroup>
            {getFieldErrorMessage(AddShipperFormFields.GENDER) ? (
              <Typography variant="h6" sx={{ color: COLOR_CODE.DANGER }}>
                {getFieldErrorMessage(AddShipperFormFields.GENDER)}
              </Typography>
            ) : null}
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <MuiTextField
            required
            fullWidth
            size="small"
            label="Phone number"
            placeholder="Phone number"
            errorMessage={getFieldErrorMessage(AddShipperFormFields.PHONE_NUMBER)}
            {...getFieldProps(AddShipperFormFields.PHONE_NUMBER)}
          />
        </Grid>
        <Grid item xs={6}>
          <Stack spacing="10px">
            <FormLabel
              id="label-store"
              className="form__label"
              sx={{ color: COLOR_CODE.GREY_700 }}
            >
              Store <span className="text-red-500 font-bold text-md">*</span>
            </FormLabel>
            <Stack>
              <MuiSelect
                label="" 
                placeholder="Choose a store"
                required
                size="small"
                value={storeId}
                onChange={handleOnChange}
                onInputChange={handleSearch}
                options={storeOptions}
                onFetchNextPage={fetchNextPage}
                allowLazyLoad
                filterOptions={(x) => x}
                isGetOptionOnChange
                isLoading={loading}
                onBlur={(event, value, reason) => {
                  if (!value) handleSearch(event, '', reason);
                }}
                noOptionsText={'not found'}
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <MuiTextField
            required
            fullWidth
            size="small"
            label="Email"
            placeholder="Email"
            errorMessage={getFieldErrorMessage(AddShipperFormFields.EMAIL)}
            {...getFieldProps(AddShipperFormFields.EMAIL)}
          />
        </Grid>
        <Grid item xs={12}>
          <MuiTextField
            required
            fullWidth
            multiline
            size="small"
            label="Address"
            placeholder="Address"
            errorMessage={getFieldErrorMessage(AddShipperFormFields.ADDRESS)}
            {...getFieldProps(AddShipperFormFields.ADDRESS)}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Button variant="outlined" color="inherit" disabled={isLoading} onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" disabled={isLoading} type="submit">
              Add
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default ShipperForm;
