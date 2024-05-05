import { COLOR_CODE, TableQueryParams } from '@components';
import { Button, Container, Grid, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { RequestStatus, RequestStatusId } from '@queries';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ORDER_REQUEST_FILTER_QUERY_KEY, OrderRequestFilterFormFieldsType } from './helpers';

const OrderRequestFilter: React.FC<Props> = ({ searchValues, handleClosePopup }) => {
  const navigate = useNavigate();

  const { search } = useLocation();

  const query = useMemo(() => new URLSearchParams(search), [search]);

  const getInitialOrderRequestFilterValues: OrderRequestFilterFormFieldsType = useMemo(
    () => ({
      requestStatusId: searchValues.requestStatusId || null,
    }),
    [searchValues],
  );

  const handleSubmitFilter = (values: OrderRequestFilterFormFieldsType) => {
    const { requestStatusId } = values;
    query.delete(TableQueryParams._PAGE);
    if (Number(requestStatusId) === RequestStatusId.PENDING) {
      query.set(
        ORDER_REQUEST_FILTER_QUERY_KEY.REQUEST_STATUS_ID,
        RequestStatusId.PENDING.toString(),
      );
    } else if (Number(requestStatusId) === RequestStatusId.APPROVED) {
      query.set(
        ORDER_REQUEST_FILTER_QUERY_KEY.REQUEST_STATUS_ID,
        RequestStatusId.APPROVED.toString(),
      );
    } else if (Number(requestStatusId) === RequestStatusId.REJECTED) {
      query.set(
        ORDER_REQUEST_FILTER_QUERY_KEY.REQUEST_STATUS_ID,
        RequestStatusId.REJECTED.toString(),
      );
    }
    navigate({ search: query.toString() });
    handleClosePopup();
  };

  const formik = useFormik<OrderRequestFilterFormFieldsType>({
    initialValues: getInitialOrderRequestFilterValues,
    onSubmit: handleSubmitFilter,
  });

  const { values, setValues, handleSubmit, getFieldProps } = formik;

  const handleClearAll = () => {
    setValues({
      requestStatusId: null,
    });
    query.delete(ORDER_REQUEST_FILTER_QUERY_KEY.REQUEST_STATUS_ID);
    navigate({ search: query.toString() });
    handleClosePopup();
  };

  return (
    <Container maxWidth="xs" sx={{ p: 2 }}>
      <Stack direction="row" alignItems="flex-end" mb={2} justifyContent="space-between">
        <Typography variant="h3" mr={3} color={COLOR_CODE.GREY_900} fontWeight="bold">
          Filters
        </Typography>
      </Stack>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack
                direction="column"
                sx={{
                  border: `1px solid ${COLOR_CODE.GREY_300} `,
                  borderRadius: 2,
                }}
              >
                <Typography
                  fontWeight={700}
                  bgcolor={COLOR_CODE.GREY_50}
                  p={1}
                  borderRadius="8px 8px 0 0"
                >
                  Request Status
                </Typography>
                <RadioGroup
                  sx={{ display: 'flex', gap: 2, flexDirection: 'column', padding: 2 }}
                  {...getFieldProps(ORDER_REQUEST_FILTER_QUERY_KEY.REQUEST_STATUS_ID)}
                  value={values?.requestStatusId || null}
                >
                  <Stack flexDirection={'row'} alignItems={'center'} gap={3}>
                    <Radio value={RequestStatusId.PENDING} />
                    <Typography>{RequestStatus[RequestStatusId.PENDING]}</Typography>
                  </Stack>
                  <Stack flexDirection={'row'} alignItems={'center'} gap={3}>
                    <Radio value={RequestStatusId.APPROVED} />
                    <Typography>{RequestStatus[RequestStatusId.APPROVED]}</Typography>
                  </Stack>
                  <Stack flexDirection={'row'} alignItems={'center'} gap={3}>
                    <Radio value={RequestStatusId.REJECTED} />
                    <Typography>{RequestStatus[RequestStatusId.REJECTED]}</Typography>
                  </Stack>
                </RadioGroup>
              </Stack>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button variant="outlined" sx={{ mr: 2 }} onClick={handleClearAll}>
                Reset
              </Button>
              <Button variant="contained" color="primary" onClick={() => handleSubmit()}>
                Apply Filter
              </Button>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Container>
  );
};

type Props = {
  searchValues: OrderRequestFilterFormFieldsType;
  handleClosePopup?: (..._args: any[]) => void;
};

export default OrderRequestFilter;
