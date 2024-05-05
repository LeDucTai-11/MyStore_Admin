import { VoucherType } from '@queries';
import { ERROR_MESSAGES } from '@shared/utils/message';
import * as Yup from 'yup';

export const voucherTypeOptions = [
  {
    id: VoucherType.FIXED,
    label: 'VND',
    value: VoucherType.FIXED,
  },
  {
    id: VoucherType.PERCENTAGE,
    label: '%',
    value: VoucherType.PERCENTAGE,
  },
];

export type VoucherFormType = {
  code: string;
  description: string;
  quantity: number;
  discountValue: number;
  minValueOrder: number;
  startDate: string;
  endDate: string;
};

export enum VoucherFormField {
  CODE = 'code',
  DESC = 'description',
  QUANTITY = 'quantity',
  DISCOUNT_VALUE = 'discountValue',
  MIN_VALUE_ORDER = 'minValueOrder',
  START_DATE = 'startDate',
  EXP_DATE = 'endDate',
}

export const voucherFormInitValue = {
  code: '',
  description: '',
  quantity: 0,
  discountValue: null,
  minValueOrder: null,
  startDate: null,
  endDate: null,
};

export const voucherFormSchema = (voucherType: string) =>
  Yup.object().shape({
    code: Yup.string().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
    description: Yup.string()
      .nullable()
      .required(ERROR_MESSAGES.FIELD_REQUIRED)
      .max(190, 'This field must be 190 characters or less'),
    quantity: Yup.number().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED).min(0),
    discountValue: Yup.number()
      .nullable()
      .required(ERROR_MESSAGES.FIELD_REQUIRED)
      .test('discountValue', 'Value must be greater than 0', (value: number) => Number(value) > 0)
      .test('discountValue', 'Value must be less or equal than 100%', (value: number) =>
        voucherType === VoucherType.PERCENTAGE ? Number(value) <= 100 : true,
      ),
    minValueOrder: Yup.number()
      .nullable()
      .required(ERROR_MESSAGES.FIELD_REQUIRED)
      .test('minValueOrder', 'Value must be greater than 0', (value: number) => Number(value) >= 0),
    startDate: Yup.date().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
    endDate: Yup.date().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
  });

export enum VoucherToastMessage {
  ADD_SUCCESS = 'New voucher has been added successfully.',
  UPDATE_SUCCESS = 'Voucher has been updated successfully.',
  DELETE_SUCCESS = 'Voucher has been deleted successfully.',
}
