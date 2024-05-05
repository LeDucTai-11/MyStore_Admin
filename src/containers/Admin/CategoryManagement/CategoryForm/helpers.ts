import { CategoryFormFieldsType } from './type';
import * as yup from 'yup';
import { ERROR_MESSAGES } from '@shared/utils/message';

export const initialCategoryFormValues: CategoryFormFieldsType = {
  categoryName: null,
  description: null,
  image: null,
};

export const categoryFormValidationSchema = yup.object({
  categoryName: yup
    .string()
    .nullable()
    .max(30, 'This field must be 30 characters or less')
    .required(ERROR_MESSAGES.FIELD_REQUIRED),
  description: yup.string().nullable().max(150, 'This field must be 150 characters or less'),
});

export enum CategoryToastMessage {
  ADD_SUCCESS = 'New category has been added successfully.',
  UPDATE_SUCCESS = 'Category has been updated successfully.',
}
