import axios from 'axios';
import apisauce from 'apisauce';
import appConfig from 'src/appConfig';
import { AuthService, stringify } from '@shared';
import { StatisticDetailFilterParams, TimeStatisticType } from './types';

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

  const getRevenue = (param: TimeStatisticType) => {
    return api.get(`/admin/statistic/revenue?timeStatisticType=${param}`);
  };

  const getStatisticDetail = (params: StatisticDetailFilterParams) => {
    return api.get(`/admin/statistic/detail?${stringify(params)}`);
  };

  return {
    getRevenue,
    getStatisticDetail,
  };
};

export default {
  create,
};
