import { Button, Stack, Typography, Link } from '@mui/material';
import { UAMBody } from '../components';
import StaffLogoContainer from '../components/StaffLogoContainer';
import { COLOR_CODE } from '@components/configs';
import { MuiTextField } from '@components/common';
import { PATHS } from '@appConfig/paths';
import { useFormik } from 'formik';
import { SignInFormField, SignInFormSchema, SignInFormType, signInInitialValues } from './helpers';
import { Toastify, getErrorMessage } from '@shared';
import { useLogin } from '@components';
import LoadingContainer from '@components/LoadingContainer';
import { AuthService } from '@shared';
import { useNavigate } from 'react-router';
import { isCustomer } from '@shared/services/tenant';
import { Link as RouterLink } from 'react-router-dom';

const SignIn: React.FC<Props> = ({}) => {
  const navigate = useNavigate();
  const handleOnSubmit = (payload: SignInFormType) => {
    login(payload);
  };

  const { touched, errors, getFieldProps, handleSubmit } = useFormik<SignInFormType>({
    initialValues: signInInitialValues,
    validationSchema: SignInFormSchema,
    onSubmit: handleOnSubmit,
  });

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  const { isLoading, login } = useLogin({
    onSuccess: (data) => {
      AuthService.setToken(data.accessToken);
      navigate(PATHS.root);
      window.location.reload();
    },
    onError: (error) => Toastify.error(error?.message),
  });

  if (isLoading || !!AuthService.getTokenFromStorage()) {
    return <LoadingContainer />;
  }

  return (
    <UAMBody>
      {
        <form onSubmit={handleSubmit}>
          <Stack gap={3} alignItems={'center'} justifyContent={'center'}>
            <StaffLogoContainer />
            <Stack sx={{ width: '500px' }} mt={2} gap={2}>
              <Typography textAlign={'center'} variant="h1" color={COLOR_CODE.GREY_700}>
                Welcome
              </Typography>
              <Stack gap={3}>
                <MuiTextField
                  required
                  fullWidth
                  size="small"
                  label="Username"
                  placeholder="Enter your Username"
                  errorMessage={getFieldErrorMessage(SignInFormField.USERNAME)}
                  {...getFieldProps(SignInFormField.USERNAME)}
                />
                <MuiTextField
                  required
                  fullWidth
                  size="small"
                  label="Password"
                  placeholder="Enter your Password"
                  isPassword
                  errorMessage={getFieldErrorMessage(SignInFormField.PASSWORD)}
                  {...getFieldProps(SignInFormField.PASSWORD)}
                />
              </Stack>
            </Stack>
            <Stack width={'500px'} gap={3}>
              <RouterLink to={`${origin}${PATHS.forgotPassword}`}>
                <Typography textAlign={'end'} variant="h6" color={COLOR_CODE.PRIMARY}>
                  FORGOT YOUR PASSWORD
                </Typography>
              </RouterLink>
              <Button variant="contained" type="submit" fullWidth>
                LOGIN
              </Button>
              {isCustomer && (
                <Typography textAlign={'center'}>
                  DON'T HAVE AN ACCOUNT?{'   '}
                  <RouterLink to={`${origin}/signup`}>
                    <strong style={{ color: COLOR_CODE.PRIMARY }}>SIGN UP</strong>
                  </RouterLink>
                </Typography>
              )}
            </Stack>
          </Stack>
        </form>
      }
    </UAMBody>
  );
};

type Props = {};

export default SignIn;
