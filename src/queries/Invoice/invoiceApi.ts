import { AuthService, RoleService, stringify } from '@shared';
import apisauce from 'apisauce';
import axios from 'axios';
import appConfig from 'src/appConfig';
import { AddInvoicePayload, InvoiceListParams } from './type';

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

  const getInvoiceList = (params: InvoiceListParams) => {
    const { ...tableParams } = params;
    const queryString = stringify(tableParams);
    return api.get(`${RoleService.isAdminRole() ? '/admin/bill' : '/staff/bill'}?${queryString}`);
  };

  const getInvoiceDetails = (id: string) => {
    return api.get(`${RoleService.isAdminRole() ? '/admin/bill' : '/staff/bill'}/${id}`);
  };

  const addInvoice = (payload: AddInvoicePayload) => {
    return api.post(`${RoleService.isAdminRole() ? '/admin/order' : '/staff/order'}`, payload);
  };

  return {
    getInvoiceList,
    getInvoiceDetails,
    addInvoice,
  };
};

export default {
  create,
};
