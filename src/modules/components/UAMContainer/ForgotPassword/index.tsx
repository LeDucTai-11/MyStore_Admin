import { Button, Stack, Typography } from '@mui/material';
import { UAMBody } from '../components';
import StaffLogoContainer from '../components/StaffLogoContainer';
import { COLOR_CODE } from '@components/configs';
import { MuiTextField } from '@components/common';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  ForgotPasswordFormField,
  ForgotPasswordFormType,
  ForgotPasswordSchema,
  forgotPasswordInitialValues,
} from './helpers';
import { Toastify, getErrorMessage } from '@shared';
import { useForgotPassword } from '../queries/UAM';
import LoadingContainer from '@components/LoadingContainer';

const ForgotPassword: React.FC<Props> = ({}) => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate({ pathname: '/login' });
  };

  const { forgotPassword, isLoading } = useForgotPassword({
    onSuccess: () => {
      Toastify.success('A token has been successfully send to your email!');
      navigate({ pathname: '/reset-password' });
    },
    onError: (error) => {
      Toastify.error(error.message);
    },
  });

  const handleForgotPassword = (payload: ForgotPasswordFormType) => {
    forgotPassword(payload);
  };

  const { touched, errors, getFieldProps, handleSubmit } = useFormik<ForgotPasswordFormType>({
    initialValues: forgotPasswordInitialValues,
    onSubmit: handleForgotPassword,
    validationSchema: ForgotPasswordSchema,
  });

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  if (isLoading) {
    return <LoadingContainer />;
  }

  return (
    <UAMBody>
      <Stack gap={3} alignItems={'center'} justifyContent={'center'}>
        <StaffLogoContainer />
        <form onSubmit={handleSubmit}>
          <Stack sx={{ width: '500px' }} mt={2} gap={2}>
            <Typography textAlign={'center'} variant="h1" color={COLOR_CODE.GREY_700}>
              Reset Password
            </Typography>
            <Typography textAlign={'center'} mb={3}>
              Please enter the email associated with your account and we’ll send you instructions to
              reset your password.
            </Typography>
            <MuiTextField
              size="small"
              required
              label="Email"
              placeholder="Enter your Email"
              errorMessage={getFieldErrorMessage(ForgotPasswordFormField.EMAIL)}
              {...getFieldProps(ForgotPasswordFormField.EMAIL)}
            />
            <Stack gap={1} mt={4}>
              <Button variant="contained" type="submit">
                CONTINUE
              </Button>
              <Button variant="outlined" onClick={handleBackToLogin}>
                Back to Login
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </UAMBody>
  );
};

type Props = {};

export default ForgotPassword;
