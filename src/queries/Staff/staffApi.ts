import axios from 'axios';
import apisauce from 'apisauce';
import appConfig from 'src/appConfig';
import { AddStaffPayload, DeleteStaffPayload, StaffListParams } from './type';
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

  const getStaffList = (params: StaffListParams) => {
    const { ...tableParams } = params;
    const queryString = stringify(tableParams);
    return api.get(
      `${RoleService.isAdminRole() ? '/admin/users' : '/staff/users'}?${queryString}`,
      {},
    );
  };

  const addStaff = (body: AddStaffPayload) => {
    return api.post(`${ApiKey.ADD_STAFF}`, body, {});
  };

  const deleteStaff = (payload: DeleteStaffPayload) => {
    return api.delete(`/admin/cashiers/${payload.id}`);
  };

  return {
    getStaffList,
    addStaff,
    deleteStaff,
  };
};

export default {
  create,
};
