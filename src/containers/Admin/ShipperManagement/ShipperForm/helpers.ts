import { phoneRegExp } from '@shared';
import { ERROR_MESSAGES } from '@shared/utils/message';
import * as yup from 'yup';
import { AddShipperFormFieldsType } from './type'; 

export const initialAddShipperFormValues: AddShipperFormFieldsType = {
  firstName: null,
  lastName: null,
  gender: 1,
  phoneNumber: null,
  email: null,
  address: null,
};

export const addShipperFormValidationSchema = yup.object({
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

export enum ShipperToastMessage {
  ADD_SUCCESS = 'New shipper has been added successfully.',
  DELETE_SUCCESS = 'A shipper has been deactivated successfully.',
}
