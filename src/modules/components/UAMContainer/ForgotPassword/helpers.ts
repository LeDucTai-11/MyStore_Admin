import * as yup from 'yup';
import { ERROR_MESSAGES } from '@shared/utils/message';

export enum ForgotPasswordFormField {
  'EMAIL' = 'email',
}

export type ForgotPasswordFormType = {
  email: string;
};

export const ForgotPasswordSchema = yup.object().shape({
  [ForgotPasswordFormField.EMAIL]: yup
    .string()
    .required(ERROR_MESSAGES.FIELD_REQUIRED)
    .nullable()
    .email(ERROR_MESSAGES.INVALID_DATA),
});

export const forgotPasswordInitialValues: ForgotPasswordFormType = {
  [ForgotPasswordFormField.EMAIL]: '',
};
