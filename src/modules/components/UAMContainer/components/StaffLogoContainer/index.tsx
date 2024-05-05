import { IMAGES } from '@appConfig/images';
import { PATHS } from '@appConfig/paths';
import { COLOR_CODE } from '@components/configs';
import Image from '@components/common/Image';
import { Stack, Typography } from '@mui/material';
import { TenantService } from '@shared';
import { Link } from 'react-router-dom';

const StaffLogoContainer: React.FC<Props> = ({}) => {
  return (
    <Stack alignItems={'center'} justifyContent={'center'}>
      <Link to={PATHS.root} className="is-flex">
        <Stack gap={3} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
          <Image src={IMAGES.bigLogo} alt="" sx={{ height: 90, width: 90 }} />
          <Typography fontSize={64} variant="h1" color={COLOR_CODE.GREY_900}>
            MALT
          </Typography>
        </Stack>
      </Link>
      <Typography py={2}>{`Convenience Store - ${
        TenantService.isStaff ? 'Staff' : 'Customer'
      } Portal`}</Typography>
    </Stack>
  );
};

type Props = {};

export default StaffLogoContainer;
