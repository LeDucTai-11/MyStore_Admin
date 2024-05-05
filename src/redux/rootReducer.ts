// import { RouterState } from 'connected-react-router';
// import { History } from 'history';
import { combineReducers } from 'redux';
import { IAuthState } from './auth/type';
import authReducer, { authState } from './auth/authSlice';

export interface IRootState<TFormData = unknown> {
  auth: IAuthState;
}

export const rootState: IRootState = {
  auth: authState,
};

/* ------------- Assemble The Reducers ------------- */
const createRootReducer = () =>
  combineReducers<IRootState>({
    auth: authReducer,
  });

export default createRootReducer;
