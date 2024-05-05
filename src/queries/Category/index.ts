import categoryApi from './categoryApi';

export const CategoryApi = categoryApi.create();

export * from './useGetAllCategories';
export * from './useGetCategoryDetails';
export * from './useAddCategory';
export * from './useUpdateCategory';
export * from './useGetAllCategoryLazy';
export * from './type';
