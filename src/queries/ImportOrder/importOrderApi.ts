import axios from 'axios';
import apisauce from 'apisauce';
import appConfig from 'src/appConfig';
import { AuthService, stringify } from '@shared';
import { ApiKey } from '@queries/keys';
import { ExportFileParams, ImportOrderListParams, ImportProductPayload } from './type';

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

  const getImportOrderList = (params: ImportOrderListParams) => {
    const { ...tableParams } = params;
    const queryString = stringify(tableParams);
    return api.get(`${ApiKey.IMPORT_ORDER}?${queryString}`);
  };

  const getImportOrderDetails = (params: { id: string }) => {
    return api.get(`${ApiKey.IMPORT_ORDER}/${params.id}`);
  };

  const getProductStoreExportFile = (exportParams: ExportFileParams) => {
    const { id, ...params } = exportParams;
    const queryString = stringify(params);
    return api.get(`/admin/products/stores/${id}?${queryString}`, {});
  };

  const importProduct = (body: ImportProductPayload) => {
    return api.post(`${ApiKey.IMPORT_ORDER}`, body);
  };

  return {
    getImportOrderList,
    getImportOrderDetails,
    getProductStoreExportFile,
    importProduct,
  };
};

export default {
  create,
};
