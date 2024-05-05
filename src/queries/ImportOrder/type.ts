import { TableParams } from '@components';

export type ImportOrderListParams = TableParams;

export interface ImportOrderListResponse {
  id: string;
  total: number;
  storeName: string;
  createdAt: string;
  updatedAt: string;
}

export type ImportOrderDetailsType = {
  id: string;
  productStoreId: string;
  amount: number;
  importPrice: number;
  createdAt: string;
  productName: string;
};

export interface ImportOrderDetailsResponse {
  id: string;
  total: number;
  importOderDetails: ImportOrderDetailsType[];
  createdAt: string;
}

export enum ExportType {
  CSV = 'CSV',
  EXCEL = 'EXCEL',
  PDF = 'PDF',
}

export interface ExportFileParams {
  id: string;
  exportType: ExportType;
}

export interface ImportProductDetails {
  productStoreId: string;
  amount: number;
  pricePerProduct: number;
}

export interface ImportProductPayload {
  importOrderDetails: ImportProductDetails[];
}
