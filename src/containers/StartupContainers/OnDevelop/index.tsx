import React, { ReactNode } from 'react';
import { IMAGES } from '@appConfig/images';
import { Stack, Typography } from '@mui/material';
import { Image } from '@components';
const OnDevelop: React.FC<Props> = ({
  children = (
    <>
      This page is on the way of development, please come back later. <br /> We are sorry for this
      inconvenience.
    </>
  ),
}) => (
  <Stack alignItems="center" mt="113px">
    <Image src={IMAGES.OnDevelopImg} sx={{ height: '400px' }} />
    <Typography fontSize={52}>Oops!...</Typography>
    <Typography>{children}</Typography>
  </Stack>
);

type Props = {
  children?: ReactNode;
};

export default OnDevelop;
