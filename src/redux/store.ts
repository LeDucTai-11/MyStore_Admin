import { configureStore } from '@reduxjs/toolkit';
import createRootReducer, { rootState } from './rootReducer';

const store = configureStore({
  reducer: createRootReducer(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
  preloadedState: rootState,
});

export type IRootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default () => ({
  store,
});
