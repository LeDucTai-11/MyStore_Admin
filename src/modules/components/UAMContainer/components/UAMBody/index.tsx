import { IMAGES } from '@appConfig/images';
import Image from '@components/common/Image';
import { Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

const UAMBody: React.FC<Props> = ({ children }) => {
  return (
    <Stack flexDirection={'row'}>
      <Stack sx={{ width: '50vw', height: '100vh' }}>
        <Image src={IMAGES.uamBG} alt="" sx={{ height: '100%' }} />
      </Stack>
      <Stack
        p={5}
        sx={{ width: '50vw', height: '100vh' }}
        justifyContent={'center'}
        className="scale-90"
      >
        {children}
      </Stack>
    </Stack>
  );
};

type Props = PropsWithChildren & {};

export default UAMBody;
