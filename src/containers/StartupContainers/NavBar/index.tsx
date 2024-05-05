import { IMAGES } from '@appConfig/images';
import { PATHS } from '@appConfig/paths';
import { AppBar, Stack, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
// import { useProfile } from 'src/queries';
import UserMenu from './UserMenu';
import { Image, COLOR_CODE } from '@components';
import { useGetProfile } from '@queries/Profile/useGetProfile';
import LoadingContainer from '@components/LoadingContainer';

const Navbar: React.FC<Props> = () => {
  const { profile, isLoading } = useGetProfile({});

  if (isLoading) {
    return <LoadingContainer />;
  }

  return (
    <>
      <AppBar
        variant="elevation"
        elevation={0}
        position="fixed"
        style={{ background: COLOR_CODE.WHITE }}
      >
        <Toolbar variant="regular">
          <Stack
            width="100%"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" justifyItems="center" gap={1}>
              <Link to={PATHS.root} className="is-flex">
                <Image src={IMAGES.logo} sx={{ height: '34px' }} />
              </Link>
              <Typography fontSize={24} color={COLOR_CODE.GREY_900}>
                MALT
              </Typography>
            </Stack>

            <UserMenu profile={profile} />
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

type Props = {};

export default Navbar;
