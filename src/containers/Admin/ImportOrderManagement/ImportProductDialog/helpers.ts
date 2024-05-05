export type ImportFormat = {
  ProductStoreID: string;
  ProductName: string;
  QuantityImport: number;
};

export const templateKey = ['ProductStoreID', 'ProductName', 'QuantityImport', 'PricePerProduct'];
