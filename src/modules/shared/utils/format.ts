import { startCase, capitalize } from 'lodash';
import dayjs from 'dayjs';
import { isEmpty } from './validation';
import _ from 'lodash';
import parsePhoneNumber from 'libphonenumber-js';

export const formatPhoneNumber = (
  mobile: string,
  type: 'formatInternational' | 'formatNational' | 'getURI' = 'formatNational',
) => {
  if (!mobile) return '';
  try {
    const phoneNumber = parsePhoneNumber(mobile);
    switch (type) {
      case 'formatInternational':
        return phoneNumber.formatInternational();
      case 'formatNational':
        return phoneNumber.formatNational();
      case 'getURI':
        return phoneNumber.getURI();
      default:
        return phoneNumber.formatInternational().replace(/^(\+\d+)/, '($1)');
    }
  } catch (error) {
    return '';
  }
};

export const getFullName = ({ firstName = '', middleName = '', lastName = '' } = {}) =>
  `${firstName}${middleName ? ` ${middleName} ` : ' '}${lastName ? lastName : ''}`;

export const getStartCase = (value: string) => (value ? startCase(value.toLowerCase()) : '');

export const getCapitalize = (value: string) => (value ? capitalize(value) : '');

export const getDate = (dateString: string): string => dayjs(dateString).format('DD/MM/YYYY');

export const formatMoney = (value: number, defaultValue = '') => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(value)) return defaultValue;

  return value.toLocaleString('vi', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 2,
  });
};

export const formatFileSize = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};

export const formatDate = (
  value: string | number | Date | dayjs.Dayjs,
  format = 'DD/MM/YYYY',
  { initValueFormat = '' } = {},
) => {
  if (!value) return '';
  if (!isEmpty(initValueFormat)) {
    return dayjs(value, initValueFormat).format(format);
  }

  return dayjs(value).format(format);
};

export const getFileName = (fileName = '') =>
  fileName.length > 70 ? `${fileName.slice(0, 40)}...${fileName.slice(-7)}` : fileName;

export const moneyReg = /[\d,]+\.{0,1}\d{0,}/;

export const MoneyInputDetect = (value: number | string) => `${value}`.match(moneyReg)?.[0] || '';

export const convertCurrencyInputToString = (value: string) => value.replace(/[^0-9.-]+/g, '');

export const capitalizeWords = (string: string) =>
  string.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());

export const getTitleCase = (str: string): string => {
  if (!str) return '';
  return _.startCase(_.toLower(str));
};

export const formatTextEllipsisStyles = (numberLine = 2) => {
  return {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: numberLine,
    WebkitBoxOrient: 'vertical',
  };
};
