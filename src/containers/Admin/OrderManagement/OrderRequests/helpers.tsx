import { Chip } from '@mui/material';
import { RequestStatus, RequestStatusId, RequestType } from '@queries';
import { getCapitalize, isEmpty } from '@shared';

export const customRequestTypeRender = (typeOfRequest: string) => {
  if (isEmpty(typeOfRequest)) return '--';
  switch (typeOfRequest) {
    case RequestType.CREATE:
      return <Chip label={`${getCapitalize(RequestType.CREATE)} order`} color="primary" />;
    case RequestType.CANCEL:
      return <Chip label={`${getCapitalize(RequestType.CANCEL)} order`} />;
    default:
      return '--';
  }
};

export const customRequestStatusRender = (requestStatusId: number) => {
  if (isEmpty(requestStatusId)) return '--';
  switch (requestStatusId) {
    case RequestStatusId.PENDING:
      return <Chip label={getCapitalize(RequestStatus[RequestStatusId.PENDING])} color="warning" />;
    case RequestStatusId.APPROVED:
      return (
        <Chip label={getCapitalize(RequestStatus[RequestStatusId.APPROVED])} color="success" />
      );
    case RequestStatusId.REJECTED:
      return <Chip label={getCapitalize(RequestStatus[RequestStatusId.REJECTED])} color="error" />;
    default:
      return '--';
  }
};

export enum ProcessOrderRequestMessage {
  PROCESS_SUCCESS = 'An order request has been processed successfully!',
}
