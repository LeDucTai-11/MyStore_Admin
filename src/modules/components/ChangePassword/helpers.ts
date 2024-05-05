import * as yup from 'yup';
import { ERROR_MESSAGES } from '@shared/utils/message';

export enum ChangePasswordFormField {
  TOKEN_RESET = 'tokenResetPassword',
  NEW_PASS = 'newPassword',
}

export const changePasswordSchema = yup.object().shape({
  tokenResetPassword: yup.string().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
  newPassword: yup
    .string()
    .nullable()
    .required(ERROR_MESSAGES.FIELD_REQUIRED)
    .min(6, 'Must have at least 6 characters'),
});

export type ChangePasswordFormType = {
  [ChangePasswordFormField.TOKEN_RESET]: string;
  [ChangePasswordFormField.NEW_PASS]: string;
};

export const initialChangePasswordFormValue: ChangePasswordFormType = {
  tokenResetPassword: '',
  newPassword: '',
};
