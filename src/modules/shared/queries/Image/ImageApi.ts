import axios from 'axios';
import apisauce from 'apisauce';
import appConfig from 'src/appConfig';
import { AuthService } from '@shared';
import { UploadImagePayload } from './type';

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

  const uploadImage = (body: UploadImagePayload) => {
    const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
    let formattedPayload = new FormData();
    const { type, ...payload } = body;
    Object.keys(payload).map((key) => formattedPayload.append(key, body[key]));
    return api.post(`/${type}`, formattedPayload, {
      withCredentials: false,
      headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` },
    });
  };

  return {
    uploadImage,
  };
};

export default {
  create,
};
