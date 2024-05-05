import { VoucherStatus } from '@queries';
import { getTitleCase } from '@shared';

export const VoucherStatusOptions = [
  {
    value: VoucherStatus.VALID,
    label: getTitleCase(VoucherStatus.VALID),
  },
  {
    value: VoucherStatus.INVALID,
    label: getTitleCase(VoucherStatus.INVALID),
  },
];

export type VoucherFilterFormType = {
  valid: string;
};

export enum VoucherFilterFormField {
  VALID = 'valid',
}

export const voucherFilterFormInitValue = {
  valid: null,
};
