import { Stack, Typography } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PATHS } from 'src/appConfig/paths';

const NotFound: React.FC<Props> = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <Stack
      style={{ width: '100vw', height: '100vh', marginBottom: 64 }}
      className="flex-center justify-center full-width full-height text-align-center "
    >
      <Typography fontSize={128} className="fw-bold has-text-danger ">
        404
      </Typography>
      <Typography
        fontSize={32}
        className="fw-bold text-color-black-600 py-32"
        style={{ borderBottom: '1px solid rgba(0,0,0, 0.2)' }}
      >
        Oops! The requested URL: <span className="cmp-nav-link">{pathname}</span> was not found on
        this server.
      </Typography>

      <Typography fontSize={24} className="fw-bold text-color-black-600 my-32">
        Please check the URL.
      </Typography>

      <Typography fontSize={24} className="fw-bold text-color-black-600">
        Otherwise,{' '}
        <Link to={PATHS.root} className="cmp-nav-link text-is-24">
          click here
        </Link>{' '}
        to be redirected to the homepage.
      </Typography>
    </Stack>
  );
};

type Props = {};

export default NotFound;
