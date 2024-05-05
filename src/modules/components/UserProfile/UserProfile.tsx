import LoadingContainer from '@components/LoadingContainer';
import UploadImage from '@components/UploadImage';
import { MuiTextField } from '@components/common';
import { COLOR_CODE } from '@components/configs';
import { Button, Container, Grid, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { UpdateProfilePayload, useUpdateProfile } from '@queries/Profile';
import { useGetProfile } from '@queries/Profile/useGetProfile';
import { Toastify, getErrorMessage } from '@shared';
import { useFormik } from 'formik';
import {
  ProfileFormField,
  ProfileFormSchema,
  ProfileFormType,
  ProfileToastMessage,
} from './helper';

const UserProfile: React.FC<Props> = ({}) => {
  const { profile, isLoading, handleInvalidateProfile } = useGetProfile({
    onErrorCallback: (error) => Toastify.error(error?.message),
  });

  const { updateProfile, isLoading: isLoadingUpdate } = useUpdateProfile({
    onSuccess: () => {
      handleInvalidateProfile();
      Toastify.success(ProfileToastMessage.UPDATE_SUCCESS);
    },
    onError: (error) => Toastify.error(error?.message),
  });

  const handleUpdateProfile = (formValue: UpdateProfilePayload) => {
    const { address, firstName, lastName, phone, gender, email, avatarUrl } = formValue;
    updateProfile({ address, firstName, lastName, phone, gender: +gender, email, avatarUrl });
  };

  const { values, errors, touched, getFieldProps, handleSubmit, setFieldValue, resetForm } =
    useFormik<ProfileFormType>({
      initialValues: profile,
      onSubmit: handleUpdateProfile,
      validationSchema: ProfileFormSchema,
      enableReinitialize: true,
    });

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  if (isLoading || isLoadingUpdate) {
    return <LoadingContainer />;
  }

  return (
    <Container maxWidth="xl" style={{ padding: 0 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Stack gap={6} py={7} pl={6} pr={8}>
            <Typography variant="h2" fontWeight={600}>
              My Profile
            </Typography>
            <form onSubmit={handleSubmit}>
              <Stack gap={4}>
                <MuiTextField
                  required
                  fullWidth
                  size="small"
                  label="First name"
                  placeholder="First name"
                  errorMessage={getFieldErrorMessage(ProfileFormField.FIRST_NAME)}
                  {...getFieldProps(ProfileFormField.FIRST_NAME)}
                />
                <MuiTextField
                  required
                  fullWidth
                  size="small"
                  label="Last name"
                  placeholder="Last name"
                  errorMessage={getFieldErrorMessage(ProfileFormField.LAST_NAME)}
                  {...getFieldProps(ProfileFormField.LAST_NAME)}
                />
                <Stack gap={10} flexDirection={'row'} alignItems={'start'}>
                  <Typography variant="h5" color={COLOR_CODE.GREY_700}>
                    Gender <span className="text-red-500 font-bold text-md">*</span>
                  </Typography>
                  <RadioGroup
                    sx={{ display: 'flex', gap: 5, flexDirection: 'row' }}
                    {...getFieldProps(ProfileFormField.GENDER)}
                    value={values?.gender ?? -1}
                  >
                    <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
                      <Radio value={1} />
                      <Typography>Male</Typography>
                    </Stack>
                    <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
                      <Radio value={0} />
                      <Typography>Female</Typography>
                    </Stack>
                  </RadioGroup>
                </Stack>
                <MuiTextField
                  required
                  fullWidth
                  size="small"
                  label="Phone number"
                  placeholder="Phone number"
                  errorMessage={getFieldErrorMessage(ProfileFormField.PHONE)}
                  {...getFieldProps(ProfileFormField.PHONE)}
                />
                <MuiTextField
                  required
                  fullWidth
                  size="small"
                  label="Email"
                  placeholder="Email"
                  errorMessage={getFieldErrorMessage(ProfileFormField.EMAIL)}
                  {...getFieldProps(ProfileFormField.EMAIL)}
                />
                <MuiTextField
                  fullWidth
                  multiline
                  size="small"
                  label="Address"
                  placeholder="Address"
                  errorMessage={getFieldErrorMessage(ProfileFormField.ADDRESS)}
                  {...getFieldProps(ProfileFormField.ADDRESS)}
                />
              </Stack>
              <Stack pt={3} gap={3} justifyContent={'flex-end'} flexDirection={'row'}>
                <Button color="inherit" variant="outlined" onClick={() => resetForm()}>
                  Reset
                </Button>
                <Button color="primary" variant="contained" type="submit">
                  Save
                </Button>
              </Stack>
            </form>
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack py={9}>
            <UploadImage
              type="files/profiles"
              imageUrl={values[ProfileFormField.AVATAR_URL]}
              handleImageUrlChange={(newUrl) => setFieldValue(ProfileFormField.AVATAR_URL, newUrl)}
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

type Props = {};

export default UserProfile;
