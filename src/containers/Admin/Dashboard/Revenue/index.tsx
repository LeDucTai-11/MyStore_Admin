import { COLOR_CODE, Loading, Select } from '@components';
import { Stack, Typography } from '@mui/material';
import {
  RevenueFilterKeys,
  TimeStatisticType,
  timeStatisticOptions,
  useGetRevenue,
} from '@queries';
import { ResponsiveBar } from '@nivo/bar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { getFormatResponse } from './helper';
import { getTitleCase } from '@shared';
import { colorPalettes } from '../styles';

export const RevenueChart = ({ paramsUrl }: Props) => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = useMemo(() => new URLSearchParams(search), [search]);

  const filterValue = paramsUrl?.timeStatisticType || TimeStatisticType.WEEKLY;

  const {
    data = [],
    isFetching,
    handleInvalidateRevenue,
  } = useGetRevenue({
    timeStatisticType: filterValue,
  });

  useEffect(() => {
    query.set(RevenueFilterKeys.TIME_STATISTIC, filterValue);
    navigate({ search: query.toString() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleInvalidateRevenue(filterValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue]);

  const handleChangeFilter = (_, value) => {
    query.set(RevenueFilterKeys.TIME_STATISTIC, value);

    navigate({ search: query.toString() });
  };

  if (isFetching)
    return (
      <Stack alignItems={'center'}>
        <Loading />
      </Stack>
    );

  return (
    <Stack my={3} gap={1} alignItems={'end'} p={3}>
      <Stack width={'20%'}>
        <Select
          placeholder="Select"
          onChange={handleChangeFilter}
          value={filterValue}
          options={timeStatisticOptions}
          isClearable={false}
        />
      </Stack>
      <Stack height={'500px'} width={'100%'}>
        <Typography variant="h3" fontWeight={700} color={COLOR_CODE.GREY_500} pl={2}>
          Revenues/Expenses
        </Typography>
        <ResponsiveBar
          data={getFormatResponse(data, filterValue)}
          theme={{
            legends: {
              text: {
                fontFamily: 'Public Sans',
                fontSize: 12,
                fontWeight: 600,
                textTransform: 'capitalize',
                fill: COLOR_CODE.GREY_300,
              },
            },
            axis: {
              legend: {
                text: {
                  fontFamily: 'Public Sans',
                  fontSize: 16,
                  fontWeight: 600,
                  fill: COLOR_CODE.GREY_500,
                },
              },
            },
            tooltip: {
              container: {
                borderRadius: 8,
                textTransform: 'capitalize',
              },
            },
          }}
          keys={['revenue', 'expense']}
          indexBy={filterValue}
          valueFormat=" >-$0,~s"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          groupMode="grouped"
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={colorPalettes}
          borderRadius={6}
          borderWidth={2}
          enableLabel={false}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1.3]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: getTitleCase(filterValue),
            legendPosition: 'middle',
            legendOffset: 40,
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Total',
            legendPosition: 'middle',
            legendOffset: -53,
            truncateTickAt: 0,
            format: ' >-$0,~s',
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', 2]],
          }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 4,
              symbolBorderWidth: 4,
              symbolShape: 'square',
              symbolSpacing: 10,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              itemTextColor: COLOR_CODE.GREY_700,
            },
          ]}
        />
      </Stack>
    </Stack>
  );
};

export type Props = {
  paramsUrl: any;
};

export default RevenueChart;
