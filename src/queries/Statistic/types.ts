import { OptionType } from '@shared';

export enum TimeStatisticType {
  'WEEKLY' = 'weekly',
  'MONTHLY' = 'monthly',
}

export const timeStatisticOptions: OptionType[] = [
  {
    label: 'Weekly',
    value: TimeStatisticType.WEEKLY,
  },
  {
    label: 'Monthly',
    value: TimeStatisticType.MONTHLY,
  },
];

export enum RevenueFilterKeys {
  TIME_STATISTIC = 'timeStatisticType',
}

export type RevenueFilterParams = {
  timeStatisticType: TimeStatisticType;
};

export type GetRevenueResponse = {
  [key: string]: {
    revenue: number;
    expense: number;
  };
};

// ==================== Statistic Detail =========================//

export enum StatisticDetailFilterKey {
  START_DATE = 'startDate',
  END_DATE = 'endDate',
}

export type StatisticDetailFilterParams = {
  startDate: string;
  endDate: string;
};

export type GetStatisticDetailResponse = {
  totalProducts: number;
  revenues: number;
  expenses: number;
  totalOrders: number;
  topSellProducts: TopSellProduct[];
  stores: GetStatisticDetailStoresResponse[];
};
export type GetStatisticDetailStoresResponse = {
  address: string;
  revenue: number;
  expense: number;
};
export type TopSellProduct = {
  totalQuantitySold: number;
  product: Product;
};
type Product = {
  id: string;
  name: string;
  image: string;
  description: string;
  amount: number;
  price: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};
