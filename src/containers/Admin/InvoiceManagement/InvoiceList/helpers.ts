import { formatDate } from '@shared';

export const customInvoiceID = (dateCreated: string) => {
  return `INV_${formatDate(dateCreated, 'DDMMYYTHHmmss')}`;
};

export enum INVOICE_FILTER_QUERY_KEY {
  CREATED_BY = 'createdBy',
}

export const filterParamsKey = [INVOICE_FILTER_QUERY_KEY.CREATED_BY];

export type InvoiceFilterFormFieldsType = {
  createdBy: string;
};
