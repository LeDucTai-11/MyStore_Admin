import { v4 as uuidv4 } from 'uuid';
import { get } from 'lodash';
import { YesNoValue } from './types';
import { isEmpty } from '.';
import { parse } from 'qs';
import { getCapitalize } from './format';

export const getRandomId = (): string => uuidv4();

export const isString = (value: any): value is string => typeof value === 'string';

export const isYesValue = (value) => value === YesNoValue.YES;
export const isNoValue = (value) => value === YesNoValue.NO;

export const getErrorMessage = (
  fieldName: string,
  { touched, errors }: { touched: any; errors: any },
) => {
  if (!fieldName || !touched || !errors) return '';

  const error = get(errors, fieldName);

  return get(touched, fieldName) && error ? getCapitalize(error) : '';
};

export const tableBodyRender = <T>(
  value: T | string,
  defaultValue: T | string = '--',
): T | string => {
  return value ?? defaultValue;
};

export const isURLImage = (url: string) => {
  if (isEmpty(url)) return false;

  const hasExtensionImage = [
    '.png',
    '.jpeg',
    '.jpg',
    '.webp',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/svg',
  ].some((ext) => url?.includes(ext));

  if (hasExtensionImage) {
    return true;
  }

  const state = parse(url?.split('?')[1], { ignoreQueryPrefix: false });
  const contentType = state?.['Content-Type'];
  const isImage = ['image/jpg', 'image/jpeg', 'image/png'].includes(contentType as string);

  return isImage;
};

export const formatValueOrNull = (value: string | null) => {
  return !isEmpty(value) ? value : '--';
};

export const handleKeyDownNumberInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
  const { key } = event;
  const regex = /^[0-9\b]+$/;
  switch (key) {
    case 'ArrowLeft':
      break;
    case 'ArrowRight':
      break;
    case 'Delete':
      break;
    case 'Backspace':
      break;
    default:
      if (!regex.test(key)) {
        event.preventDefault();
      }
      break;
  }
};
