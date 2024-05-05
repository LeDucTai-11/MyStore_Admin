import axios from 'axios';
import apisauce from 'apisauce';
import appConfig from 'src/appConfig';
import { UpdateProfilePayload } from './type';
import { ApiKey } from '@queries/keys';
import { AuthService } from '@shared';
import { ChangePasswordPayload } from '@components';

axios.defaults.withCredentials = true;
const create = (baseURL = `${appConfig.API_URL}`) => {
  //
  // Create and configure an apisauce-based api object.
  //

  const token = AuthService.getTokenFromStorage();
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: 0,
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    timeout: appConfig.CONNECTION_TIMEOUT,
  });

  const getProfile = () => {
    return api.get(`${ApiKey.USERS}/profile`, {});
  };

  const updateProfile = (body: UpdateProfilePayload) => {
    return api.patch(`${ApiKey.USERS}/profile`, body, {});
  };

  const requestChangePassword = () => {
    return api.post(`${ApiKey.USERS}/request-change-password`, {});
  };

  const changePassword = (body: ChangePasswordPayload) => {
    return api.post(`${ApiKey.USERS}/change-password`, body, {});
  };

  return {
    getProfile,
    updateProfile,
    changePassword,
    requestChangePassword,
  };
};

export default {
  create,
};
