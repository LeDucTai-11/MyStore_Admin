import LoadingContainer from '@components/LoadingContainer';
import { Input } from '@components/common';
import { Button, Stack, Typography } from '@mui/material';
import { useGetProfile } from '@queries/Profile/useGetProfile';
import { useRequestChangePassword } from '@queries/Profile/useRequestChangePassword';
import { Toastify } from '@shared';
import React, { useState } from 'react';
import ChangePassword from '.';

export const EmailVerify: React.FC<Props> = ({}) => {
  const [isVerify, setIsVerify] = useState<boolean>(false);
  const { profile } = useGetProfile({
    onErrorCallback: (error) => Toastify.error(error?.message),
  });

  const { email } = profile || {};

  const { requestChangePassword, isSuccess, isLoading } = useRequestChangePassword({
    onError: (error) => {
      Toastify.error(error.message);
    },
    onSuccess: () => Toastify.success('Please check your email to get a token!'),
  });

  const handleConfirmPassword = () => {
    requestChangePassword({});
  };

  if (isLoading) {
    return <LoadingContainer />;
  }

  if (isVerify || isSuccess) {
    return <ChangePassword />;
  }

  return (
    <Stack gap={2}>
      <Typography>
        Confirm the email associated with your account and we'll send you instructions to reset your
        password.
      </Typography>
      <Input placeholder="Enter your email" value={email} disabled />
      <Button variant="contained" onClick={handleConfirmPassword}>
        CONTINUE
      </Button>
      <Button variant="outlined" sx={{ fontWeight: 500 }} onClick={() => setIsVerify(true)}>
        Already has a verify code? Click here!
      </Button>
    </Stack>
  );
};

type Props = {};
