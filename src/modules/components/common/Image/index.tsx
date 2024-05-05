import { Box, BoxProps } from '@mui/material';
import React from 'react';

const Image: React.FC<Props> = ({ alt = 'unset', src, ...props }) => (
  <Box component="img" alt={alt} src={src} {...props} />
);

type Props = BoxProps & { src: string; alt?: string };

export default Image;
