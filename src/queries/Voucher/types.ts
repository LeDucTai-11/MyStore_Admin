export enum VoucherStatus {
  VALID = 'valid',
  INVALID = 'invalid',
}

export enum VoucherType {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
}

export type GetVouchersResponse = {
  id: string;
  code: string;
  minValueOrder: number;
  type: string;
  discountValue: number;
  quantity: string;
  description: string;
  startDate: string;
  endDate: string;
};

export type GetVoucherDetailResponse = {
  id: string;
  code: string;
  description: string;
  minValueOrder: number;
  type: string;
  discountValue: number;
  quantity: number;
  metadata: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type VoucherPayload = {
  id?: string;
  code: string;
  description: string;
  minValueOrder: number;
  type: string;
  discountValue: number;
  quantity: number;
  startDate: string;
  endDate: string;
};

export type DeleteVoucherPayload = {
  id: string;
};
