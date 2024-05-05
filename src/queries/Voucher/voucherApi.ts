import { TableParams } from '@components';
import apisauce from 'apisauce';
import axios from 'axios';
import appConfig from 'src/appConfig';
import { AuthService, RoleService, stringify } from 'src/modules/shared';
import { DeleteVoucherPayload, VoucherPayload } from './types';

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

  const getVouchers = (params: TableParams) => {
    const { ...tableParams } = params;
    const queryString = stringify(tableParams);
    // return getMockVoucherList();
    return api.get(`${RoleService.isAdminRole() ? '/admin/voucher' : '/voucher'}?${queryString}`);
  };

  const getVoucherDetail = (id: string) => {
    return api.get(`${RoleService.isAdminRole() ? '/admin/voucher' : 'voucher'}/${id}`);
  };

  const addVoucher = (payload: VoucherPayload) => {
    return api.post(`/admin/voucher`, payload);
  };

  const updateVoucher = (params: VoucherPayload) => {
    const formatPayload = {
      ...params,
    };
    delete formatPayload.id;
    return api.patch(`/admin/voucher/${params.id}`, formatPayload);
  };

  const deleteVoucher = (payload: DeleteVoucherPayload) => {
    return api.delete(`/admin/voucher/${payload.id}`, {});
  };

  return {
    getVouchers,
    addVoucher,
    updateVoucher,
    deleteVoucher,
    getVoucherDetail,
  };
};

export default {
  create,
};
