import React from 'react';
import { IMAGES } from 'src/appConfig/images';
import { Stack } from '@mui/material';
import './style.scss';
const SplashScreen: React.FC<Props> = () => (
  <Stack className="cmp-splash-screen">
    <img src={IMAGES.logo} alt="" className="cmp-splash-screen__image" />
  </Stack>
);

type Props = {};

export default SplashScreen;
