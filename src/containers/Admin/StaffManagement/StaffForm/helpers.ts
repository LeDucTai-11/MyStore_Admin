import { phoneRegExp } from '@shared';
import { ERROR_MESSAGES } from '@shared/utils/message';
import * as yup from 'yup';
import { AddStaffFormFieldsType } from './type';

export const initialAddStaffFormValues: AddStaffFormFieldsType = {
  firstName: null,
  lastName: null,
  gender: 1,
  phoneNumber: null,
  email: null,
  address: null,
};

export const addStaffFormValidationSchema = yup.object({
  firstName: yup.string().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
  lastName: yup.string().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
  gender: yup.boolean().required(ERROR_MESSAGES.FIELD_REQUIRED),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, ERROR_MESSAGES.INVALID_DATA)
    .min(10, 'Phone number must have a minimum of 10 digits')
    .max(11, 'Phone number have a maximum of 11 digits')
    .nullable()
    .required(ERROR_MESSAGES.FIELD_REQUIRED),
  email: yup
    .string()
    .nullable()
    .email(ERROR_MESSAGES.INVALID_DATA)
    .required(ERROR_MESSAGES.FIELD_REQUIRED),
  address: yup.string().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
});

export enum StaffToastMessage {
  ADD_SUCCESS = 'New staff has been added successfully.',
  DELETE_SUCCESS = 'A staff has been deactivated successfully.',
}
