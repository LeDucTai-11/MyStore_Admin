import { DEFAULT_PASSWORD } from '@appConfig/constants';
import { COLOR_CODE, DialogContext, MuiTextField } from '@components';
import {
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { useGetAllStaff } from '@queries';
import { useAddStaff } from '@queries/Staff/useAddStaff';
import { Toastify, getErrorMessage } from '@shared';
import { useFormik } from 'formik';
import { useContext } from 'react';
import {
  StaffToastMessage,
  addStaffFormValidationSchema,
  initialAddStaffFormValues,
} from './helpers';
import { AddStaffFormFields, AddStaffFormFieldsType } from './type';

const StaffForm = () => {
  const { closeModal } = useContext(DialogContext);

  const { handleInvalidateAllStaffs } = useGetAllStaff();

  const { addStaff, isLoading } = useAddStaff({
    onSuccess: () => {
      handleInvalidateAllStaffs();
      Toastify.success(StaffToastMessage.ADD_SUCCESS);
      closeModal();
    },
    onError: (error) => Toastify.error(error?.message),
  });

  const handleAddStaff = (formValues: AddStaffFormFieldsType) => {
    const { firstName, lastName, gender, phoneNumber, email, address } = formValues;
    addStaff({
      firstName,
      lastName,
      username: email,
      password: DEFAULT_PASSWORD,
      gender: +gender,
      phone: phoneNumber,
      email,
      address,
    });
  };

  const { values, errors, touched, getFieldProps, handleSubmit } =
    useFormik<AddStaffFormFieldsType>({
      initialValues: initialAddStaffFormValues,
      validationSchema: addStaffFormValidationSchema,
      onSubmit: () => {
        handleAddStaff(values);
      },
    });

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

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
            errorMessage={getFieldErrorMessage(AddStaffFormFields.FIRST_NAME)}
            {...getFieldProps(AddStaffFormFields.FIRST_NAME)}
          />
        </Grid>
        <Grid item xs={6}>
          <MuiTextField
            required
            fullWidth
            size="small"
            label="Last name"
            placeholder="Last name"
            errorMessage={getFieldErrorMessage(AddStaffFormFields.LAST_NAME)}
            {...getFieldProps(AddStaffFormFields.LAST_NAME)}
          />
        </Grid>

        <Grid item xs={6}>
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
              {...getFieldProps(AddStaffFormFields.GENDER)}
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
            {getFieldErrorMessage(AddStaffFormFields.GENDER) ? (
              <Typography variant="h6" sx={{ color: COLOR_CODE.DANGER }}>
                {getFieldErrorMessage(AddStaffFormFields.GENDER)}
              </Typography>
            ) : null}
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <MuiTextField
            required
            fullWidth
            size="small"
            label="Phone number"
            placeholder="Phone number"
            errorMessage={getFieldErrorMessage(AddStaffFormFields.PHONE_NUMBER)}
            {...getFieldProps(AddStaffFormFields.PHONE_NUMBER)}
          />
        </Grid>
        <Grid item xs={12}>
          <MuiTextField
            required
            fullWidth
            size="small"
            label="Email"
            placeholder="Email"
            errorMessage={getFieldErrorMessage(AddStaffFormFields.EMAIL)}
            {...getFieldProps(AddStaffFormFields.EMAIL)}
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
            errorMessage={getFieldErrorMessage(AddStaffFormFields.ADDRESS)}
            {...getFieldProps(AddStaffFormFields.ADDRESS)}
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

export default StaffForm;
