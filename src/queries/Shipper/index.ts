import shipperApi from './shipperApi';

export const ShipperApi = shipperApi.create();

export * from './type';
export * from './useGetAllShipper';
export * from './useGetShipperLazy';
export * from './useAddShipper';
export * from './useDeleteShipper';