import { phoneRegExp } from '@shared';
import { ERROR_MESSAGES } from '@shared/utils/message';
import * as yup from 'yup';

export enum ProfileFormField {
  'FIRST_NAME' = 'firstName',
  'LAST_NAME' = 'lastName',
  'GENDER' = 'gender',
  'PHONE' = 'phone',
  'EMAIL' = 'email',
  'ADDRESS' = 'address',
  'AVATAR_URL' = 'avatarUrl',
}

export type ProfileFormType = {
  [ProfileFormField.FIRST_NAME]: string;
  [ProfileFormField.LAST_NAME]: string;
  [ProfileFormField.GENDER]: number | 0 | 1;
  [ProfileFormField.PHONE]: string;
  [ProfileFormField.EMAIL]: string;
  [ProfileFormField.ADDRESS]: string;
  [ProfileFormField.AVATAR_URL]: string;
};

export const initialProfileFormValue: ProfileFormType = {
  firstName: '',
  lastName: '',
  gender: 1,
  email: '',
  phone: '',
  address: '',
  avatarUrl: '',
};

export const ProfileFormSchema = yup.object().shape({
  [ProfileFormField.FIRST_NAME]: yup.string().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
  [ProfileFormField.LAST_NAME]: yup.string().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
  [ProfileFormField.GENDER]: yup.number().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
  [ProfileFormField.EMAIL]: yup
    .string()
    .nullable()
    .required(ERROR_MESSAGES.FIELD_REQUIRED)
    .email(ERROR_MESSAGES.INVALID_DATA),
  [ProfileFormField.PHONE]: yup
    .string()
    .nullable()
    .required(ERROR_MESSAGES.FIELD_REQUIRED)
    .matches(phoneRegExp, ERROR_MESSAGES.INVALID_DATA)
    .min(10)
    .max(11),
  [ProfileFormField.ADDRESS]: yup.string().nullable().max(50),
  [ProfileFormField.AVATAR_URL]: yup.string().nullable(),
});

export enum ProfileToastMessage {
  UPDATE_SUCCESS = 'Your profile has been updated successfully.',
}
