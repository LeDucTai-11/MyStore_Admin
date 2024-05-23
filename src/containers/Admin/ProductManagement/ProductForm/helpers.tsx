import { ProductPayload } from '@queries';
import * as yup from 'yup';
import { ERROR_MESSAGES } from '@shared/utils/message';

export enum ProductToastMessage {
  ADD_SUCCESS = 'New product has been added successfully.',
  UPDATE_SUCCESS = 'Product has been updated successfully.',
  DELETE_SUCCESS = 'Product has been deleted successfully.',
}

export const initialProduct: ProductPayload = {
  id: null,
  name: null,
  description: null,
  price: 0,
  image: null,
  categoryId: null,
};

export const ProductSchema = yup.object().shape({
  id: yup.string().required(ERROR_MESSAGES.FIELD_REQUIRED).nullable(),
  name: yup.string().required(ERROR_MESSAGES.FIELD_REQUIRED).nullable(),
  description: yup
    .string()
    .required(ERROR_MESSAGES.FIELD_REQUIRED)
    // .max(180, 'This field must be 180 characters or less')
    .nullable(),
  price: yup.number().required(ERROR_MESSAGES.FIELD_REQUIRED).nullable().min(0),
  categoryId: yup.string().required(ERROR_MESSAGES.FIELD_REQUIRED).nullable(),
});

export enum PRODUCT_KEY {
  PRODUCT_ID = 'id',
  PRODUCT_NAME = 'name',
  DESCRIPTION = 'description',
  PRICE = 'price',
  CATEGORY_ID = 'categoryId',
  AMOUNT = 'amount',
}
