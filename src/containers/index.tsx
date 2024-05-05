/* eslint-disable react/self-closing-comp */
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CustomErrorBoundary, CustomDialog } from '@components';
import AuthContainer from './StartupContainers/AuthContainer';
import Screen from './StartupContainers/Screen';
import { IRootState } from '@redux/store';
import { connect } from 'react-redux';
import { CustomRoute, routerGroup } from './helpers';
const LoadingContainer = React.lazy(() => import('../modules/components/LoadingContainer'));
const ToastContainer = React.lazy(() => import('./StartupContainers/ToastContainer'));
const NotFound = React.lazy(() => import('./StartupContainers/NotFound'));

type ContainerProps = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentRole: state.auth.currentRole,
});

const Container: React.FC<ContainerProps> = ({ isAuthenticated, currentRole }) => {
  return (
    <Screen>
      <Suspense fallback={<LoadingContainer />}>
        <Routes>
          {routerGroup.map(({ path, element, isRequireAuth, isOnlyAdminSite = false }, idx) => (
            <Route
              key={`${path}-${idx}`}
              path={path}
              element={
                <CustomRoute
                  currentRole={currentRole}
                  pageRequiredAuth={isRequireAuth}
                  isAuthenticated={isAuthenticated}
                  isOnlyAdminSite={isOnlyAdminSite}
                >
                  {element}
                </CustomRoute>
              }
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <AuthContainer />
      <ToastContainer />
      <CustomDialog />
      <CustomErrorBoundary showErrorMessage></CustomErrorBoundary>
    </Screen>
  );
};

export default connect(mapStateToProps, undefined)(Container);
