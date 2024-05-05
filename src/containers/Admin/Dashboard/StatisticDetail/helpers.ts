import { BarDatum } from '@nivo/bar';
import { TopSellProduct } from '@queries';

export const formatTopSellProduct = (products: TopSellProduct[]): BarDatum[] => {
  return products
    .map(({ product, totalQuantitySold }) => {
      return {
        'Total Sold': totalQuantitySold,
        name: product.name,
        [product.name]: product.id,
      };
    })
    .slice(0, 5);
};
