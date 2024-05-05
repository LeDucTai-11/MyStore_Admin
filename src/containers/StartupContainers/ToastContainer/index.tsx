import { UserRole } from '@components';
import { useGetAllOrderRequests, useGetAllOrders } from '@queries';
import { IRootState } from '@redux/store';
import { Toastify } from '@shared';
import { getDatabase, off, onValue, ref } from 'firebase/database';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { firebaseApp } from 'src/firebase';

enum RealTimeDbRoute {
  REQUEST_ORDER = '/REQUEST_ORDER',
}

export default () => {
  const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state: IRootState) => state.auth.currentRole) === UserRole.ADMIN;
  const isInitialRender = useRef(true);

  const { handleInvalidateOrderRequests } = useGetAllOrderRequests();

  const { handleInvalidateOrderList } = useGetAllOrders();

  useEffect(() => {
    const db = ref(getDatabase(firebaseApp), RealTimeDbRoute.REQUEST_ORDER);
    onValue(db, (snapshot) => {
      if (snapshot.exists && !isInitialRender.current && isAuthenticated && isAdmin) {
        Toastify.info('A new order request has just been created!', {
          position: 'top-right',
        });
        handleInvalidateOrderRequests();
        handleInvalidateOrderList();
      }

      if (isAuthenticated) isInitialRender.current = false;
    });
    return () => {
      off(db);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};
