import axios from 'axios';
import apisauce from 'apisauce';
import appConfig from 'src/appConfig';
import { AddShipperPayload, DeleteShipperPayload, ShipperListParams } from './type';
import { AuthService, RoleService, stringify } from 'src/modules/shared';
import { ApiKey } from '@queries/keys';

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

  const getShipperList = (params: ShipperListParams) => {
    const { ...tableParams } = params;
    const queryString = stringify(tableParams);
    return api.get(
      `${RoleService.isAdminRole() ? '/admin/users' : '/staff/users'}?${queryString}`,
      {},
    );
  };

  const addShipper = (body: AddShipperPayload) => {
    return api.post(`${ApiKey.ADD_SHIPPER}`, body, {});
  };

  const deleteShipper = (payload: DeleteShipperPayload) => {
    return api.delete(`/admin/shipper/${payload.id}`);
  };

  return {
    getShipperList,
    addShipper,
    deleteShipper,
  };
};

export default {
  create,
};
