import { MINI_SIDE_BAR_WIDTH, NAVBAR_HEIGHT, SIDE_BAR_WIDTH } from '@appConfig/constants';
import { Stack } from '@mui/material';
import { IRootState } from '@redux/rootReducer';
import React, { HTMLProps } from 'react';
import { useProSidebar } from 'react-pro-sidebar';
import { connect } from 'react-redux';
const Sidebar = React.lazy(() => import('../SideBar'));
const Navbar = React.lazy(() => import('../NavBar'));

const Screen: React.FC<Props> = ({ isAuthenticated, children }) => {
  const { collapsed } = useProSidebar();

  return (
    <Stack
      sx={
        isAuthenticated
          ? {
              paddingTop: `${NAVBAR_HEIGHT}px`,
              paddingLeft: `${collapsed ? MINI_SIDE_BAR_WIDTH : SIDE_BAR_WIDTH}px`,
              transition: 'all 0.2s linear',
            }
          : {}
      }
    >
      {isAuthenticated && (
        <>
          <Navbar />
          <Sidebar />
        </>
      )}
      {children}
    </Stack>
  );
};

type Props = ReturnType<typeof mapStateToProps> & HTMLProps<HTMLDivElement>;

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, undefined)(Screen);
