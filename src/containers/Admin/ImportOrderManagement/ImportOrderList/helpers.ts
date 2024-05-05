import dayjs from 'dayjs';

export const customImportOrderID = (storeAddress: string, createdAt: string): string => {
  const storeStreet = storeAddress
    .split(',')[0]
    .split(' ')
    .reduce((result, currVal) => (result += currVal.charAt(0)));
  const dateTime = dayjs(createdAt).format('DDMMYYTHH:mm:ss');
  return `${storeStreet}_${dateTime}`;
};

export enum IMPORT_ORDER_FILTER_QUERY_KEY {
  STORE_ID = 'storeId',
}

export const filterParamsKey = [IMPORT_ORDER_FILTER_QUERY_KEY.STORE_ID];

export type ImportOrderFilterFormFieldsType = {
  storeId: string;
};
