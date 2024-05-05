import { COLOR_CODE, DateRangePicker, Loading } from '@components';
import { Grid, Stack, Typography } from '@mui/material';
import { LuScanLine } from 'react-icons/lu';
import { cardStyles } from '../styles';
import { IoWalletOutline } from 'react-icons/io5';
import { formatDate, formatMoney } from '@shared';
import { CiMoneyBill } from 'react-icons/ci';
import { BsCart2 } from 'react-icons/bs';
import { ResponsiveBar } from '@nivo/bar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import {
  StatisticDetailFilterKey,
  StatisticDetailFilterParams,
  useGetStatisticDetail,
} from '@queries';
import StoreList from '../StoreList';
import { formatTopSellProduct } from './helpers';

const StatisticDetail = ({ paramsUrl }: Props) => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = useMemo(() => new URLSearchParams(search), [search]);

  const { data, isFetching, setParams } = useGetStatisticDetail({});
  const {
    totalProducts = 0,
    expenses = 0,
    revenues = 0,
    stores = [],
    topSellProducts = [],
    totalOrders = 0,
  } = data || {};

  const filterValue: StatisticDetailFilterParams = useMemo(
    () => ({
      startDate:
        paramsUrl?.startDate ||
        formatDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 'YYYY-MM-DDThh:mm:ssZ'),
      endDate: paramsUrl?.endDate || formatDate(new Date(), 'YYYY-MM-DDThh:mm:ssZ'),
    }),
    [paramsUrl],
  );

  useEffect(() => {
    setParams(filterValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue]);

  useEffect(() => {
    query.set(
      StatisticDetailFilterKey.START_DATE,
      formatDate(filterValue.startDate, 'YYYY-MM-DDThh:mm:ssZ'),
    );
    query.set(
      StatisticDetailFilterKey.END_DATE,
      formatDate(filterValue.endDate, 'YYYY-MM-DDThh:mm:ssZ'),
    );

    navigate({ search: query.toString() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeFilter = (_, value: [Date, Date]) => {
    const [startDate, endDate] = value;
    query.set(StatisticDetailFilterKey.START_DATE, formatDate(startDate, 'YYYY-MM-DDThh:mm:ssZ'));
    query.set(StatisticDetailFilterKey.END_DATE, formatDate(endDate, 'YYYY-MM-DDThh:mm:ssZ'));

    navigate({ search: query.toString() });
  };

  if (isFetching)
    return (
      <Stack alignItems={'center'}>
        <Loading />
      </Stack>
    );

  return (
    <>
      <Stack gap={1} px={3} pb={5} alignItems={'end'}>
        <Stack width={'20%'}>
          <DateRangePicker
            onChange={handleChangeFilter}
            selecteds={[new Date(filterValue.startDate), new Date(filterValue.endDate)]}
          />
        </Stack>
        <Grid container columnSpacing={3}>
          <Grid item xs={6}>
            <Grid container rowSpacing={2} columnSpacing={2}>
              <Grid item xs={6}>
                <Stack sx={{ ...cardStyles }}>
                  <Stack p={0.5} bgcolor={COLOR_CODE.DANGER_BG} width={'28px'} borderRadius={1}>
                    <LuScanLine size={20} color={COLOR_CODE.DANGER} />
                  </Stack>
                  <Typography variant="body2" color={COLOR_CODE.GREY_600}>
                    Product Sold
                  </Typography>
                  <Typography variant="h3" fontWeight={700}>
                    {totalProducts}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack sx={{ ...cardStyles }}>
                  <Stack p={0.5} bgcolor={'#FAE1CF'} width={'28px'} borderRadius={1}>
                    <IoWalletOutline size={20} color={'#E46A11'} />
                  </Stack>
                  <Typography variant="body2" color={COLOR_CODE.GREY_600}>
                    Expense
                  </Typography>
                  <Typography variant="h3" fontWeight={700}>
                    {formatMoney(expenses)}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack sx={{ ...cardStyles }}>
                  <Stack p={0.5} bgcolor={COLOR_CODE.PRIMARY_200} width={'28px'} borderRadius={1}>
                    <CiMoneyBill size={20} color={COLOR_CODE.PRIMARY} />
                  </Stack>
                  <Typography variant="body2" color={COLOR_CODE.GREY_600}>
                    Revenue
                  </Typography>
                  <Typography variant="h3" fontWeight={700}>
                    {formatMoney(revenues)}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack sx={{ ...cardStyles }}>
                  <Stack p={0.5} bgcolor={COLOR_CODE.SUCCESS_BG} width={'28px'} borderRadius={1}>
                    <BsCart2 size={20} color={COLOR_CODE.SUCCESS} />
                  </Stack>
                  <Typography variant="body2" color={COLOR_CODE.GREY_600}>
                    Total Orders
                  </Typography>
                  <Typography variant="h3" fontWeight={700}>
                    {totalOrders}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Stack width={'100%'} height={'100%'}>
              <Typography variant="h3" fontWeight={700} color={COLOR_CODE.GREY_500} pl={2}>
                Revenue by product
              </Typography>
              <ResponsiveBar
                data={formatTopSellProduct(topSellProducts)}
                indexBy={'name'}
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
                keys={['Total Sold']}
                // keys={topSellProducts.slice(0, 5).map(({ product }) => product.name)}
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                groupMode="stacked"
                layout="horizontal"
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={[
                  // COLOR_CODE.PRIMARY,
                  // COLOR_CODE.PRIMARY_400,
                  // '#03396c',
                  // '#005b96',
                  // COLOR_CODE.PRIMARY_600,
                  COLOR_CODE.PRIMARY_400,
                ]}
                borderRadius={3}
                enableLabel={false}
                borderColor={{
                  from: 'color',
                  modifiers: [['darker', 1]],
                }}
                borderWidth={2}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 0,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Total Sold',
                  legendPosition: 'middle',
                  legendOffset: 40,
                  truncateTickAt: 0,
                }}
                axisLeft={{
                  tickSize: 0,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Product Name',
                  legendPosition: 'middle',
                  legendOffset: -30,
                  truncateTickAt: 0,
                  renderTick: () => null,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                  from: 'color',
                  modifiers: [['darker', 2]],
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
      <StoreList stores={stores} />
    </>
  );
};

type Props = { paramsUrl: any };

export default StatisticDetail;
