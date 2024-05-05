import dayjs from 'dayjs';

/* eslint-disable use-isnan */
export const isEmpty = (value: any): boolean =>
  value instanceof Date
    ? !dayjs(value).isValid()
    : !value ||
      value === undefined ||
      value === null ||
      Number.isNaN(value) ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value === '') ||
      (Array.isArray(value) && value.length === 0);

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const isNumeric = (num: any) => !isNaN(num);
