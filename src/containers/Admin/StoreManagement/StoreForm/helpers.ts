import { StoreFormFieldsType } from './type';
import * as yup from 'yup';
import { ERROR_MESSAGES } from '@shared/utils/message';
import { phoneRegExp } from '@shared/utils/validation';

export const initialStoreFormValues: StoreFormFieldsType = {
  address: null,
  hotline: null,
};

export const storeFormValidationSchema = yup.object({
  address: yup
    .string()
    .nullable()
    .max(100, 'This field must be 100 characters or less')
    .required(ERROR_MESSAGES.FIELD_REQUIRED),
  hotline: yup
    .string()
    .nullable()
    .matches(phoneRegExp, ERROR_MESSAGES.INVALID_DATA)
    .min(11, 'Hotline must have 11 digits')
    .max(11, 'Hotline have a maximum of 11 digits')
    .required(ERROR_MESSAGES.FIELD_REQUIRED),
});

export enum StoreToastMessage {
  ADD_SUCCESS = 'New store has been added successfully.',
  UPDATE_SUCCESS = 'Store has been updated successfully.',
  DELETE_SUCCESS = 'Store has been deleted successfully.',
}
