import productApi from './productApi';

export const ProductApi = productApi.create();

export * from './type';
export * from './useGetAllProduct';
export * from './useGetProductById';
export * from './useAddProduct';
export * from './useUpdateProduct';
export * from './useDeleteProduct';
