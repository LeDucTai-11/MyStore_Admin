import { Container, Stack, Typography } from '@mui/material';
import React, { ReactNode, useMemo } from 'react';
import { RevenueFilterKeys, StatisticDetailFilterKey } from '@queries';
import RevenueChart from './Revenue';
import StatisticDetail from './StatisticDetail';
import { useSearchParams } from 'react-router-dom';

const Dashboard: React.FC<Props> = () => {
  const [searchParams] = useSearchParams();

  const paramsUrl = useMemo(
    () => ({
      timeStatisticType: searchParams.get(RevenueFilterKeys.TIME_STATISTIC),
      startDate: searchParams.get(StatisticDetailFilterKey.START_DATE),
      endDate: searchParams.get(StatisticDetailFilterKey.END_DATE),
    }),
    [searchParams],
  );

  return (
    <Container maxWidth="xl">
      <Stack sx={{ mb: 2, mt: 3 }}>
        <Typography variant="h3" fontWeight={600}>
          Dashboard
        </Typography>
      </Stack>
      <RevenueChart paramsUrl={paramsUrl} />
      <StatisticDetail paramsUrl={paramsUrl} />
    </Container>
  );
};

type Props = {
  children?: ReactNode;
};

export default Dashboard;
