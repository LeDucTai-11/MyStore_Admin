import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { ONE_HOUR } from './appConfig/constants';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@emotion/react';
import { theme } from 'src/modules/components/configs';
import Container from './containers';
import { BrowserRouter } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import LoadingContainer from './modules/components/LoadingContainer';
import { DialogProvider } from '@components';
import { Provider } from 'react-redux';
import createStore from '@redux/store';

const { store } = createStore();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: ONE_HOUR,
      onError(err: unknown | Error) {
        // if ((err as Error)?.message === ErrorService.MESSAGES.forbidden) {
        //   return ErrorService.handler({
        //     message: 'You do not have permission to access this data.',
        //   });
        // }
        // ErrorService.handler(err);
        return err;
      },
    },
    mutations: {
      onError(err: unknown | Error) {
        // if ((err as Error)?.message === ErrorService.MESSAGES.forbidden) {
        //   return ErrorService.handler({
        //     message: 'You do not have permission to trigger this action.',
        //   });
        // }
        // ErrorService.handler(err);
        return err;
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <DialogProvider>
          <QueryClientProvider client={queryClient}>
            <ProSidebarProvider>
              <BrowserRouter>
                <Suspense fallback={<LoadingContainer />}>
                  <Container />
                </Suspense>
              </BrowserRouter>
            </ProSidebarProvider>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </DialogProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
