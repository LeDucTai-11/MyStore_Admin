import { UseQueryOptions } from '@tanstack/react-query';

export enum ApiKey {
  USERS = '/users',
  PROFILE = 'users/profile',
  USERS_LIST = '/admin/users',
  PRODUCTS = '/admin/products',
  ADD_STAFF = '/admin/cashiers',
  ADD_SHIPPER = 'admin/shipper',
  AUTH = '/auth',
  CATEGORY = '/admin/category',
  IMAGE = '/admin/files',
  STORE = '/admin/stores',
  IMPORT_ORDER = '/admin/import-order',
  ORDER = '/admin/order',
  ORDER_REQUEST = '/admin/order-request',
  PRODUCTS_STORE_EXPORT = '/admin/products/stores',
  VOUCHER = 'voucher',
  INVOICE = 'invoice',
  STATISTIC = 'statistic',
  REVENUE = 'revenue',
  // STAFF
}

export type QueryOptions<T> = Omit<UseQueryOptions, 'QueryKey'> & { QueryKey: T };
