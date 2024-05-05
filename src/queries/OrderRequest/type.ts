import { TableParams } from '@components/common/Table';

export type OrderRequestParams = TableParams;

export enum RequestType {
  CREATE = 'create',
  CANCEL = 'cancel',
}

export enum RequestStatusId {
  PENDING = 1,
  APPROVED = 2,
  REJECTED = 3,
}

export const RequestStatus = {
  [RequestStatusId.PENDING]: 'Pending',
  [RequestStatusId.APPROVED]: 'Approved',
  [RequestStatusId.REJECTED]: 'Rejected',
};

export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
};

export type MetadataType = {
  Information: {
    address: string;
    lastName: string;
    firstName: string;
    phoneNumber: string;
  };
};

type VoucherType = {
  id: string;
  code: string;
  description: string;
  minValueOrder: number;
  discountValue: number;
  type: string;
};

type ProductType = {
  id: string;
  name: string;
  image: string;
  description: string;
  amount: number;
  price: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

type OrderDetailsType = {
  id: string;
  quantity: number;
  orderPrice: number;
  orderId: string;
  productStoreId: string;
  product: ProductType;
};

type OrderType = {
  id: string;
  total: number;
  shipping: number;
  address: string;
  createdBy: string; // userId
  cancelExpiredAt: string;
  orderStatusId: number;
  paymentMethod: string;
  voucherId: string;
  metadata: MetadataType;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  subTotal: number;
  discountValue: number;
  voucher: VoucherType;
  orderDetails: OrderDetailsType[];
};

export interface OrderRequestResponse {
  id: string;
  typeOfRequest: string;
  user: UserType;
  requestStatusId: number;
  order: OrderType;
  createdAt: string;
}

export type ProcessOrderRequestPayload = {
  id: string;
  requestStatusId: number;
};
