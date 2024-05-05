import { RequestStatus, RequestStatusId } from '@queries';
import { getCapitalize } from '@shared';

export enum ORDER_REQUEST_FILTER_QUERY_KEY {
  REQUEST_STATUS_ID = 'requestStatusId',
}

export const filterParamsKey = [ORDER_REQUEST_FILTER_QUERY_KEY.REQUEST_STATUS_ID];

export type OrderRequestFilterFormFieldsType = {
  requestStatusId: number;
};

export const RequestStatusOptions = [
  {
    label: getCapitalize(RequestStatus[RequestStatusId.PENDING]),
    value: RequestStatusId.PENDING,
  },
  {
    label: getCapitalize(RequestStatus[RequestStatusId.APPROVED]),
    value: RequestStatusId.APPROVED,
  },
  {
    label: getCapitalize(RequestStatus[RequestStatusId.REJECTED]),
    value: RequestStatusId.REJECTED,
  },
];
