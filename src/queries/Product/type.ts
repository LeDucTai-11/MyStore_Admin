import { TableParams } from '@components';

export interface CategoryResponse {
  id: string;
  name: string;
  description: string;
}

export type ProductResponse = {
  id: string;
  name: string;
  description: string;
  amount: number;
  image: string;
  price: number;
  category: CategoryResponse;
  createdAt: string;
  updatedAt: string;
  productStore?: ProductStore;
};

export type ProductStore = {
  id: string;
  productId: string;
  storeId: string;
  amount: number;
  expirtyDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type ProductListParams = TableParams;

export type ProductPayload = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  categoryId: string;
};

export interface DeleteProductPayload {
  id: string;
}
