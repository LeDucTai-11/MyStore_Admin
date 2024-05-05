import storeApi from './storeApi';

export const StoreApi = storeApi.create();

export * from './useGetAllStores';
export * from './useAddStore';
export * from './useUpdateStore';
export * from './useDeleteStore';
export * from './useGetAllStoreLazy';
export * from './type';
