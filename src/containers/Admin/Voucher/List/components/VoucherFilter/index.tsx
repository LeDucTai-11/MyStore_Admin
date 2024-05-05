import { COLOR_CODE, TableQueryParams } from '@components';
import { Button, Container, Grid, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { Callback, isEmpty } from '@shared';
import { useFormik } from 'formik';
import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  VoucherFilterFormField,
  VoucherFilterFormType,
  voucherFilterFormInitValue,
} from './helpers';

const VoucherFilter = ({ searchValues, handleClosePopup }: Props) => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const query = useMemo(() => new URLSearchParams(search), [search]);

  const initialValue: VoucherFilterFormType = useMemo(
    () => ({
      valid: searchValues.valid || null,
    }),
    [searchValues],
  );

  const handleSubmitFilter = () => {
    Object.keys(values).forEach((key) => {
      if (isEmpty(values[key])) {
        query.delete(key);
      } else {
        return query.set(key, values[key].toString());
      }
    });

    query.delete(TableQueryParams._PAGE);

    navigate({ search: query.toString() });
    return handleClosePopup();
  };

  const { values, handleSubmit, setValues, getFieldProps } = useFormik<VoucherFilterFormType>({
    initialValues: initialValue,
    onSubmit: handleSubmitFilter,
  });

  const handleClearAll = useCallback(() => {
    setValues(voucherFilterFormInitValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="xs" sx={{ p: 2 }}>
      <Stack direction="row" alignItems="flex-end" mb={2} justifyContent="space-between">
        <Typography variant="h3" mr={3} color={COLOR_CODE.GREY_900} fontWeight="bold">
          Filters
        </Typography>
      </Stack>

      <form autoComplete="off">
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
                Status
              </Typography>
              <RadioGroup
                sx={{ display: 'flex', gap: 2, flexDirection: 'column', mx: 2 }}
                {...getFieldProps(VoucherFilterFormField.VALID)}
                value={values?.valid ?? null}
              >
                <Stack flexDirection={'row'} alignItems={'center'} gap={3} mt={1}>
                  <Radio value={'true'} />
                  <Typography>Valid</Typography>
                </Stack>
                <Stack flexDirection={'row'} alignItems={'center'} gap={3} mb={1}>
                  <Radio value={'false'} />
                  <Typography>Invalid</Typography>
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
      </form>
    </Container>
  );
};

type Props = {
  searchValues: VoucherFilterFormType;
  handleClosePopup?: Callback;
};

export default VoucherFilter;
