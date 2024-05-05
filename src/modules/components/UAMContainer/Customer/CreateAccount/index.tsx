import { UAMBody } from '@components/UAMContainer/components';
import StaffLogoContainer from '@components/UAMContainer/components/StaffLogoContainer';
import { MuiTextField, Select } from '@components/common';
import { COLOR_CODE } from '@components/configs';
import { Button, FormLabel, Grid, Stack, Typography } from '@mui/material';
import { AuthService, Toastify, getErrorMessage } from '@shared';
import {
  SignUpFormField,
  signUpFormSchema,
  SignUpFormType,
  genderOptions,
  signUpInitialValue,
} from './helpers';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUp } from '@components';
import { PATHS } from '@appConfig/paths';
import LoadingContainer from '@components/LoadingContainer';
import { AiFillCheckCircle } from 'react-icons/ai';

const CreateAccount: React.FC<Props> = ({}) => {
  const navigate = useNavigate();
  const handleOnSubmit = (formValue: SignUpFormType) => {
    signup({ ...formValue, username: formValue.email, gender: +formValue.gender });
  };

  const { touched, errors, getFieldProps, handleSubmit, setFieldValue, setFieldTouched } =
    useFormik<SignUpFormType>({
      initialValues: signUpInitialValue,
      validationSchema: signUpFormSchema,
      onSubmit: handleOnSubmit,
    });

  const handleMoveToHomePage = () => {
    navigate(PATHS.root);
    window.location.reload();
  };

  const { isLoading, signup, isSuccess } = useSignUp({
    onSuccess: (data) => {
      Toastify.success('Created successfully!');
      AuthService.setToken(data.accessToken);
    },
    onError: (error) => {
      if (typeof error.message === 'string') {
        Toastify.error(error?.message);
      } else {
        for (const msg of error?.message as Array<string>) {
          Toastify.error(msg);
        }
      }
    },
  });

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  if (isLoading) {
    return <LoadingContainer />;
  }

  return (
    <UAMBody>
      {
        <Stack alignItems={'center'}>
          {isSuccess ? (
            <Stack sx={{ width: '540px' }} gap={4} mt={10}>
              <Typography textAlign={'center'} mb={1} variant="h1" color={COLOR_CODE.GREY_700}>
                Create account successfully!
              </Typography>
              <Stack flexDirection={'row'} alignItems={'center'} gap={2} justifyContent={'center'}>
                <AiFillCheckCircle size={40} color={COLOR_CODE.PRIMARY} />
                <Typography>Welcome to the MALT Convenience Store Portal.</Typography>
              </Stack>
              <Button variant="contained" onClick={handleMoveToHomePage}>
                GO TO HOMEPAGE
              </Button>
            </Stack>
          ) : (
            <form onSubmit={handleSubmit}>
              <StaffLogoContainer />
              <Stack gap={1} alignItems={'center'} justifyContent={'start'} width={'100%'}>
                <Stack sx={{ width: '500px' }} mt={2} gap={2}>
                  <Typography textAlign={'center'} variant="h1" color={COLOR_CODE.GREY_700}>
                    Create Account
                  </Typography>
                  <Stack gap={3} mt={1}>
                    <Grid container gap={1} justifyContent={'space-between'}>
                      <Grid item xs={5.8}>
                        <MuiTextField
                          required
                          label="First name"
                          fullWidth
                          size="small"
                          placeholder="First name"
                          errorMessage={getFieldErrorMessage(SignUpFormField.FIRST_NAME)}
                          {...getFieldProps(SignUpFormField.FIRST_NAME)}
                        />
                      </Grid>
                      <Grid item xs={5.8}>
                        <MuiTextField
                          required
                          label="Last name"
                          fullWidth
                          size="small"
                          placeholder="Last name"
                          errorMessage={getFieldErrorMessage(SignUpFormField.LAST_NAME)}
                          {...getFieldProps(SignUpFormField.LAST_NAME)}
                        />
                      </Grid>
                    </Grid>
                    <Grid container gap={1} justifyContent={'space-between'}>
                      <Grid item xs={5.8}>
                        <Stack spacing={1}>
                          <FormLabel id="label-role" className="form__label">
                            Gender <span className="text-red-500 font-bold text-md">*</span>
                          </FormLabel>
                          <Select
                            options={genderOptions}
                            className={'cmp-select--size-small'}
                            placeholder="Gender"
                            errorMessage={getFieldErrorMessage(SignUpFormField.GENDER)}
                            {...getFieldProps(SignUpFormField.GENDER)}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={5.8}>
                        <MuiTextField
                          required
                          label="Phone number"
                          fullWidth
                          size="small"
                          placeholder="Phone number"
                          errorMessage={getFieldErrorMessage(SignUpFormField.PHONE)}
                          {...getFieldProps(SignUpFormField.PHONE)}
                        />
                      </Grid>
                    </Grid>
                    <MuiTextField
                      required
                      label="Email"
                      fullWidth
                      size="small"
                      placeholder="Email"
                      errorMessage={getFieldErrorMessage(SignUpFormField.EMAIL)}
                      {...getFieldProps(SignUpFormField.EMAIL)}
                    />
                    <MuiTextField
                      required
                      label="Password"
                      fullWidth
                      size="small"
                      placeholder="Password"
                      isPassword
                      errorMessage={getFieldErrorMessage(SignUpFormField.PASSWORD)}
                      {...getFieldProps(SignUpFormField.PASSWORD)}
                    />
                  </Stack>
                </Stack>
                <Stack width={'500px'} gap={3} mt={2}>
                  <Button variant="contained" fullWidth type="submit">
                    CONTINUE
                  </Button>
                  <Typography textAlign={'center'}>
                    ALREADY HAVE AN ACCOUNT?{'   '}
                    <Link to={`${origin}${PATHS.signIn}`}>
                      <strong style={{ color: COLOR_CODE.PRIMARY }}>LOG IN</strong>
                    </Link>
                  </Typography>
                </Stack>
              </Stack>
            </form>
          )}
        </Stack>
      }
    </UAMBody>
  );
};

type Props = {};

export default CreateAccount;
