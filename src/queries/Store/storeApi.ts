import axios from 'axios';
import apisauce from 'apisauce';
import appConfig from 'src/appConfig';
import { AuthService, RoleService, stringify } from '@shared';
import { ApiKey } from '@queries/keys';
import { StoreListParams, StorePayload } from './type';

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

  const getStoreList = (params: StoreListParams) => {
    const { ...tableParams } = params;
    const queryString = stringify(tableParams);
    return api.get(`${RoleService.isAdminRole() ? ApiKey.STORE : '/store'}?${queryString}`);
  };

  const addStore = (payload: StorePayload) => {
    return api.post(`${ApiKey.STORE}`, payload);
  };

  const updateStore = (payload: StorePayload) => {
    const { id, ...body } = payload;
    return api.patch(`${ApiKey.STORE}/${id}`, body);
  };

  const deleteStore = (payload: StorePayload) => {
    const { id } = payload;
    return api.delete(`${ApiKey.STORE}/${id}`);
  };

  return {
    getStoreList,
    addStore,
    updateStore,
    deleteStore,
  };
};

export default {
  create,
};
