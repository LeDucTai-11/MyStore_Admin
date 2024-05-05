import axios from 'axios';
import apisauce from 'apisauce';
import appConfig from 'src/appConfig';
import { AuthService, stringify } from '@shared';
import { ApiKey } from '@queries/keys';
import { OrderRequestParams, ProcessOrderRequestPayload } from './type';

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

  const getOrderRequests = (params: OrderRequestParams) => {
    const { ...tableParams } = params;
    const queryString = stringify(tableParams);
    return api.get(`${ApiKey.ORDER_REQUEST}?${queryString}`);
  };

  const getOrderRequestDetails = (id: string) => {
    return api.get(`${ApiKey.ORDER_REQUEST}/${id}`);
  };

  const processOrderRequest = (payload: ProcessOrderRequestPayload) => {
    const { id, requestStatusId } = payload;
    return api.patch(`/admin/order/modify-request-status/${id}`, { requestStatusId });
  };

  return {
    getOrderRequests,
    getOrderRequestDetails,
    processOrderRequest,
  };
};

export default {
  create,
};
