import { OrderStatus, OrderStatusId, PaymentMethod, PaymentMethodTitle } from '@queries';

export enum ORDER_FILTER_QUERY_KEY {
  ORDER_STATUS_ID = 'orderStatusId',
  PAYMENT_METHOD = 'paymentMethod',
}

export const filterParamsKey = [
  ORDER_FILTER_QUERY_KEY.ORDER_STATUS_ID,
  ORDER_FILTER_QUERY_KEY.PAYMENT_METHOD,
];

export type OrderFilterFormFieldsType = {
  orderStatusId: number;
  paymentMethod: string;
};

export const orderStatusOptions = [
  {
    label: OrderStatus[OrderStatusId.PENDING_CONFIRM],
    value: OrderStatusId.PENDING_CONFIRM,
  },
  {
    label: OrderStatus[OrderStatusId.CONFIRMED],
    value: OrderStatusId.CONFIRMED,
  },
  {
    label: OrderStatus[OrderStatusId.CANCELED],
    value: OrderStatusId.CANCELED,
  },
];

export const paymentMethodOptions = [
  {
    label: PaymentMethodTitle[PaymentMethod.COD],
    value: PaymentMethod.COD,
  },
  {
    label: PaymentMethodTitle[PaymentMethod.BANKING],
    value: PaymentMethod.BANKING,
  },
];
