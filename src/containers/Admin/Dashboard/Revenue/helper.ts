import { GetRevenueResponse, TimeStatisticType } from '@queries';
import { BarDatum } from '@nivo/bar';

export type FormatRevenue = {
  revenue: number;
  expense: number;
  [TimeStatisticType.WEEKLY]?: string;
  [TimeStatisticType.MONTHLY]?: string;
};

const getFormatResponse = (data: GetRevenueResponse[], type: TimeStatisticType): BarDatum[] => {
  return data?.map((elm) => {
    const [key, value] = Object.entries(elm)[0];
    return {
      [type]: key,
      ...value,
    };
  });
};

export { getFormatResponse };
