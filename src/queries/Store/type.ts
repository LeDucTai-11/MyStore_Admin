import { TableParams } from '@components';

export type StoreListParams = TableParams;

export interface StoreResponse {
  id: string;
  address: string;
  hotline: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export type StorePayload = {
  id?: string;
  address?: string;
  hotline?: string;
};
