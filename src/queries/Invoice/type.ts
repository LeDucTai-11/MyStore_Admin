import { TableParams } from '@components/common/Table';
import { MetadataType } from '@queries/OrderRequest';

export type InvoiceListParams = TableParams;

// GET INVOICE LIST
type UserType = {
  id: string;
  firstName: string;
  lastName: string;
};

type VoucherType = {
  id: string;
  code: string;
  minValueOrder: number;
  discountValue: number;
  type: string;
  createdAt: string;
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

type StoreType = {
  id: string;
  address: string;
  hotline: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type OrderDetailsType = {
  id: string;
  quantity: number;
  orderPrice: number;
  productStoreId: string;
  orderId: string;
  product: ProductType;
  store: StoreType;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

type OrderType = {
  id: string;
  total: number;
  shipping: number;
  user: UserType;
  voucher: VoucherType;
  orderStatusId: number;
  paymentMethod: string;
  orderDetails: OrderDetailsType[];
  metadata: MetadataType;
  createdAt: string;
  subTotal: number;
  discountValue: number;
};

export interface InvoiceResponse {
  id: string;
  createdBy: string;
  user: UserType;
  order: OrderType;
  createdAt: string;
}

// ADD INVOICE
export type ProductStoresType = {
  productStoreId: string;
  quantity: number;
};

export type ContactType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
};

export type AddInvoicePayload = {
  productStores: ProductStoresType[];
  shippingFee: number;
  voucherId: string;
  contact: ContactType;
  paymentMethod: string;
};
