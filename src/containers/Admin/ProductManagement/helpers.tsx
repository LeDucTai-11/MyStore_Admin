export enum PRODUCT_FILTER_QUERY_KEY {
  Categories = 'categories',
  StoreId = 'storeId',
}

export enum PRODUCT_FORM_KEY {
  id = 'id',
  name = 'name',
  description = 'description',
  price = 'price',
  categoryId = 'categoryId',
  image = 'image',
}

export const filterParamsKey = [
  PRODUCT_FILTER_QUERY_KEY.Categories,
  PRODUCT_FILTER_QUERY_KEY.StoreId,
];

export type ProductFilterFormValue = {
  categories: string[];
  storeId: string;
};
