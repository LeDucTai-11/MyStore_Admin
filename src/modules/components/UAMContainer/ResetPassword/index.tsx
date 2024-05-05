import { Button, Stack, Typography } from '@mui/material';
import { UAMBody } from '../components';
import StaffLogoContainer from '../components/StaffLogoContainer';
import { COLOR_CODE } from '@components/configs';
import { useNavigate } from 'react-router-dom';
import { MuiTextField } from '@components/common';
import {
  ChangePasswordFormField,
  ChangePasswordFormType,
  changePasswordSchema,
  initialChangePasswordFormValue,
} from '@components/ChangePassword/helpers';
import { ChangePasswordPayload } from '@components/UAMContainer/queries/UAM';
import { useFormik } from 'formik';
import { Toastify, getErrorMessage } from '@shared';
import { useResetPassword } from '@components';
import { AiFillCheckCircle } from 'react-icons/ai';

const ResetPassword: React.FC<Props> = ({}) => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate({ pathname: '/login' });
  };

  const { resetPassword, isLoading, isSuccess } = useResetPassword({
    onSuccess: () => {
      Toastify.success('Update Successfully!');
    },
    onError: (error) => Toastify.error(error?.message),
  });

  const onChangePassword = (payload: ChangePasswordPayload) => {
    resetPassword(payload);
  };

  const { errors, touched, getFieldProps, handleSubmit } = useFormik<ChangePasswordFormType>({
    initialValues: initialChangePasswordFormValue,
    onSubmit: onChangePassword,
    validationSchema: changePasswordSchema,
  });

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  return (
    <UAMBody>
      <Stack
        gap={2}
        alignItems={'center'}
        height={'100%'}
        mt={isSuccess ? 10 : 0}
        justifyContent={isSuccess ? 'start' : 'center'}
      >
        <StaffLogoContainer />
        {isSuccess ? (
          <Stack sx={{ width: '540px' }} gap={4} mt={10}>
            <Typography textAlign={'center'} mb={1} variant="h1" color={COLOR_CODE.GREY_700}>
              Reset successfully!
            </Typography>
            <Stack flexDirection={'row'} alignItems={'center'} gap={2} justifyContent={'center'}>
              <AiFillCheckCircle size={50} color={COLOR_CODE.PRIMARY} />
              <Typography>
                Congratulations! Your password has been reset successfully. Welcome back to our MALT
                Convenience Store System Management
              </Typography>
            </Stack>
            <Button variant="contained" onClick={handleBackToLogin}>
              LOGIN
            </Button>
          </Stack>
        ) : (
          <form onSubmit={handleSubmit}>
            <Stack
              sx={{ width: '500px', pointerEvents: isLoading ? 'none' : 'auto' }}
              mt={2}
              gap={2}
            >
              <Typography textAlign={'center'} variant="h1" color={COLOR_CODE.GREY_700}>
                Verification Code
              </Typography>
              <Typography textAlign={'center'} mb={3}>
                Check your email and enter your verification code
              </Typography>
              <MuiTextField
                size="small"
                required
                fullWidth
                label="Verification Code"
                placeholder="Enter your Verification Code"
                errorMessage={getFieldErrorMessage(ChangePasswordFormField.TOKEN_RESET)}
                {...getFieldProps(ChangePasswordFormField.TOKEN_RESET)}
              />
              <MuiTextField
                size="small"
                required
                fullWidth
                isPassword
                label="New Password"
                placeholder="Enter your new Password"
                errorMessage={getFieldErrorMessage(ChangePasswordFormField.NEW_PASS)}
                {...getFieldProps(ChangePasswordFormField.NEW_PASS)}
              />
              <Stack gap={1} mt={5}>
                <Button variant="contained" type="submit">
                  CONTINUE
                </Button>
                <Button variant="outlined" onClick={handleBackToLogin}>
                  Back to Login
                </Button>
              </Stack>
            </Stack>
          </form>
        )}
      </Stack>
    </UAMBody>
  );
};

type Props = {};

export default ResetPassword;
