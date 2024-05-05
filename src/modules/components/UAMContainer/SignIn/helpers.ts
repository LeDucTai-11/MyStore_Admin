import * as yup from 'yup';
import { ERROR_MESSAGES } from '@shared/utils/message';

export type SignInFormType = {
  username: string;
  password: string;
};

export enum SignInFormField {
  'USERNAME' = 'username',
  'PASSWORD' = 'password',
}

export const signInInitialValues = {
  [SignInFormField.USERNAME]: '',
  [SignInFormField.PASSWORD]: '',
};

export const SignInFormSchema = yup.object().shape({
  [SignInFormField.USERNAME]: yup.string().required(ERROR_MESSAGES.FIELD_REQUIRED).nullable(),
  [SignInFormField.PASSWORD]: yup
    .string()
    .required(ERROR_MESSAGES.FIELD_REQUIRED)
    .nullable()
    .min(6),
});
