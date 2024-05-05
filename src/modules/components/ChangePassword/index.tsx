import { MuiTextField } from '@components/common';
import { Button, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import {
  ChangePasswordFormField,
  ChangePasswordFormType,
  changePasswordSchema,
  initialChangePasswordFormValue,
} from './helpers';
import { AuthService, RoleService, Toastify, getErrorMessage } from '@shared';
import React from 'react';
import { DialogContext } from '@components/Dialog';
import { ChangePasswordPayload } from '@components/UAMContainer/queries/UAM';
import { useChangePassword } from '@queries/Profile';
import { useDispatch } from 'react-redux';
import { setAuthenticated, setCurrentRole, setProfile } from '@redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@appConfig/paths';

const ChangePassword: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = React.useContext(DialogContext);

  const { changePassword } = useChangePassword({
    onSuccess: () => {
      Toastify.success('Update successfully, now you will have to login again!');
      setTimeout(() => logout(), 1500);
    },
    onError: (error) => Toastify.error(error?.message),
  });

  const onChangePassword = (payload: ChangePasswordPayload) => {
    changePassword(payload);
  };

  const logout = () => {
    dispatch(setProfile(null));
    dispatch(setCurrentRole(null));
    dispatch(setAuthenticated(false));

    AuthService.clearToken();
    RoleService.setUserRole(null);
    closeModal();
    navigate(PATHS.signIn);
  };

  const { errors, touched, getFieldProps, handleSubmit } = useFormik<ChangePasswordFormType>({
    initialValues: initialChangePasswordFormValue,
    onSubmit: onChangePassword,
    validationSchema: changePasswordSchema,
  });

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  return (
    <>
      <Typography fontSize={18} textAlign={'center'}>
        Check your email and enter your verification code{' '}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack gap={2} pt={1}>
          <MuiTextField
            required
            label="Verification Code"
            errorMessage={getFieldErrorMessage(ChangePasswordFormField.TOKEN_RESET)}
            placeholder="Enter current password"
            fullWidth
            className={`mb-16`}
            {...getFieldProps(ChangePasswordFormField.TOKEN_RESET)}
          />
          <MuiTextField
            required
            label="New Password"
            errorMessage={getFieldErrorMessage(ChangePasswordFormField.NEW_PASS)}
            placeholder="Enter new password"
            fullWidth
            className={`mb-16`}
            isPassword
            {...getFieldProps(ChangePasswordFormField.NEW_PASS)}
          />
          <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Button variant="outlined" type="button" color="inherit" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" color="primary">
              Save
            </Button>
          </Stack>
        </Stack>
      </form>
    </>
  );
};

type Props = {};

export default ChangePassword;
