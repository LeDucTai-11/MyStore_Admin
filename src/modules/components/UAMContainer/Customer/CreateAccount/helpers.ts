import { GenderValue } from '@shared';
import * as yup from 'yup';
import { ERROR_MESSAGES } from '@shared/utils/message';

export type SignUpFormType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: 1 | 0;
};

export enum SignUpFormField {
  'EMAIL' = 'email',
  'PASSWORD' = 'password',
  'ADDRESS' = 'address',
  'FIRST_NAME' = 'firstName',
  'LAST_NAME' = 'lastName',
  'PHONE' = 'phone',
  'GENDER' = 'gender',
}

export const signUpInitialValue: SignUpFormType = {
  [SignUpFormField.EMAIL]: '',
  [SignUpFormField.PASSWORD]: '',
  [SignUpFormField.PHONE]: '',
  [SignUpFormField.FIRST_NAME]: '',
  [SignUpFormField.LAST_NAME]: '',
  [SignUpFormField.GENDER]: null,
};

export const signUpFormSchema = yup.object().shape({
  [SignUpFormField.EMAIL]: yup
    .string()
    .required(ERROR_MESSAGES.FIELD_REQUIRED)
    .nullable()
    .email(ERROR_MESSAGES.INVALID_DATA),
  [SignUpFormField.PASSWORD]: yup
    .string()
    .required(ERROR_MESSAGES.FIELD_REQUIRED)
    .nullable()
    .min(6),
  [SignUpFormField.FIRST_NAME]: yup.string().required(ERROR_MESSAGES.FIELD_REQUIRED).nullable(),
  [SignUpFormField.LAST_NAME]: yup.string().required(ERROR_MESSAGES.FIELD_REQUIRED).nullable(),
  [SignUpFormField.PHONE]: yup
    .string()
    .required(ERROR_MESSAGES.FIELD_REQUIRED)
    .nullable()
    .min(10)
    .max(10),
  [SignUpFormField.GENDER]: yup.number().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
});

export const genderOptions = [
  {
    label: 'Male',
    value: GenderValue.MALE,
  },
  {
    label: 'Female',
    value: GenderValue.FEMALE.toString(),
  },
];
