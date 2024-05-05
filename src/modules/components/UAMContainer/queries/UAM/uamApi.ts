import axios from 'axios';
import apisauce from 'apisauce';
import appConfig from 'src/appConfig';
import { ChangePasswordPayload, ForgotPasswordPayload, SignInPayload, SignUpPayload } from './type';
import { ApiKey } from '@queries/keys';

axios.defaults.withCredentials = true;
const create = (baseURL = `${appConfig.API_URL}`) => {
  //
  // Create and configure an apisauce-based api object.
  //

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: 0,
      Accept: 'application/json',
    },
    timeout: appConfig.CONNECTION_TIMEOUT,
  });

  const login = (body: SignInPayload) => {
    return api.post(`${ApiKey.AUTH}/signin`, body, {});
  };

  const signup = (body: SignUpPayload) => {
    return api.post(`${ApiKey.AUTH}/signup`, body, {});
  };

  const forgotPassword = (payload: ForgotPasswordPayload) => {
    const { email } = payload;
    return api.post(`${ApiKey.AUTH}/request-reset-password?email=${email}`, {});
  };

  const resetPassword = (body: ChangePasswordPayload) => {
    return api.post(`${ApiKey.AUTH}/reset-password`, body, {});
  };

  return {
    login,
    signup,
    forgotPassword,
    resetPassword,
  };
};

export default {
  create,
};
