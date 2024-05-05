import {
  CurrencyInput,
  DatePicker,
  DialogContext,
  Input,
  MuiTextField,
  SegmentedButton,
} from '@components';
import { Button, Grid, Stack } from '@mui/material';
import {
  VoucherType,
  useAddVoucher,
  useGetVoucherDetail,
  useGetVouchers,
  useUpdateVoucher,
} from '@queries';
import { Toastify, formatDate, getErrorMessage, handleKeyDownNumberInput, isEmpty } from '@shared';
import { useFormik } from 'formik';
import { useContext, useMemo, useState } from 'react';
import {
  VoucherFormField,
  VoucherFormType,
  VoucherToastMessage,
  voucherFormInitValue,
  voucherFormSchema,
  voucherTypeOptions,
} from './helpers';

const VoucherForm = ({ voucherId, isEditing, readOnly }: Props) => {
  const { closeModal } = useContext(DialogContext);
  const [segmentedButtonValue, setSegmentedButtonValue] = useState(VoucherType.FIXED);

  const {
    voucherDetail,
    isLoading: isFetchingVoucherDetail,
    handleInvalidateVoucherDetail,
  } = useGetVoucherDetail({
    id: voucherId,
    onSuccessCallback() {
      setSegmentedButtonValue(voucherDetail.type as VoucherType);
    },
  });

  const { handleInvalidateVouchers } = useGetVouchers();

  const { addVoucher, isLoading: isAddingVoucher } = useAddVoucher({
    onSuccess() {
      handleInvalidateVoucherDetail();
      handleInvalidateVouchers();
      Toastify.success(VoucherToastMessage.ADD_SUCCESS);
      closeModal();
    },
    onError(error) {
      Toastify.error(error?.message);
    },
  });

  const { updateVoucher, isLoading: isUpdatingVoucher } = useUpdateVoucher({
    onSuccess() {
      handleInvalidateVoucherDetail();
      handleInvalidateVouchers();
      Toastify.success(VoucherToastMessage.UPDATE_SUCCESS);
      closeModal();
    },
    onError(error) {
      Toastify.error(error.message);
    },
  });

  const getInitValue = useMemo(() => {
    if ((isEditing || readOnly) && !isEmpty(voucherDetail)) {
      return voucherDetail;
    }
    return voucherFormInitValue;
  }, [isEditing, voucherDetail, readOnly]);

  const handleFormSubmit = (formValues: VoucherFormType) => {
    if (!isEmpty(segmentedButtonValue)) {
      if (isEditing) {
        updateVoucher({
          ...formValues,
          startDate: formatDate(formValues.startDate, 'YYYY-MM-DDThh:mm:ssZ'),
          endDate: formatDate(formValues.endDate, 'YYYY-MM-DDThh:mm:ssZ'),
          type: segmentedButtonValue,
        });
      } else {
        addVoucher({
          ...formValues,
          startDate: formatDate(formValues.startDate, 'YYYY-MM-DDThh:mm:ssZ'),
          endDate: formatDate(formValues.endDate, 'YYYY-MM-DDThh:mm:ssZ'),
          type: segmentedButtonValue,
        });
      }
    } else {
      setFieldError(VoucherFormField.DISCOUNT_VALUE, 'Please choose a discount type');
    }
  };

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  const {
    errors,
    touched,
    getFieldProps,
    handleSubmit,
    setFieldValue,
    values,
    setFieldTouched,
    setFieldError,
  } = useFormik<VoucherFormType>({
    initialValues: getInitValue,
    onSubmit: handleFormSubmit,
    validationSchema: voucherFormSchema(segmentedButtonValue),
    enableReinitialize: true,
  });

  const handleChangeMinimumOrder = (_, value) => {
    setFieldValue(VoucherFormField.MIN_VALUE_ORDER, value);
  };

  const handleChangeDiscountValue = (_, value) => {
    setFieldValue(VoucherFormField.DISCOUNT_VALUE, value);
  };

  const isLoading = isFetchingVoucherDetail || isAddingVoucher || isUpdatingVoucher;

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MuiTextField
              required
              label="Voucher code"
              errorMessage={getFieldErrorMessage(VoucherFormField.CODE)}
              placeholder="Voucher code"
              fullWidth
              size="small"
              readOnly={readOnly}
              {...getFieldProps(VoucherFormField.CODE)}
            />
          </Grid>
          <Grid item xs={12}>
            <MuiTextField
              required
              label="Description"
              placeholder="Description"
              errorMessage={getFieldErrorMessage(VoucherFormField.DESC)}
              fullWidth
              multiline
              size="small"
              readOnly={readOnly}
              {...getFieldProps(VoucherFormField.DESC)}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              required
              label="Quantity"
              placeholder="Quantity"
              type="number"
              errorMessage={getFieldErrorMessage(VoucherFormField.QUANTITY)}
              readOnly={readOnly}
              {...getFieldProps(VoucherFormField.QUANTITY)}
            />
          </Grid>
          <Grid item xs={6}>
            <Stack
              flexDirection={'row'}
              alignItems={
                !isEmpty(getFieldErrorMessage(VoucherFormField.DISCOUNT_VALUE)) ? 'center' : 'end'
              }
              gap={2}
            >
              <Grid item xs={8}>
                <CurrencyInput
                  required
                  label="Discount value"
                  placeholder="Discount value"
                  errorMessage={getFieldErrorMessage(VoucherFormField.DISCOUNT_VALUE)}
                  readOnly={readOnly}
                  prefix={segmentedButtonValue === VoucherType.FIXED ? 'VND ' : ''}
                  suffix={segmentedButtonValue === VoucherType.PERCENTAGE ? '%' : ''}
                  {...getFieldProps(VoucherFormField.DISCOUNT_VALUE)}
                  onChange={handleChangeDiscountValue}
                  onKeyDown={handleKeyDownNumberInput}
                  decimalScale={0}
                />
              </Grid>
              <Grid item xs={3.5}>
                <SegmentedButton
                  disabled={readOnly}
                  fullWidth
                  items={voucherTypeOptions}
                  value={segmentedButtonValue}
                  onChange={(_, value) => setSegmentedButtonValue(value)}
                />
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <CurrencyInput
              required
              label="Minimum order value"
              placeholder="Minimum order value"
              errorMessage={getFieldErrorMessage(VoucherFormField.MIN_VALUE_ORDER)}
              readOnly={readOnly}
              prefix="VND "
              {...getFieldProps(VoucherFormField.MIN_VALUE_ORDER)}
              onChange={handleChangeMinimumOrder}
              onKeyDown={handleKeyDownNumberInput}
              decimalScale={0}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              readOnly={readOnly}
              required
              isSmallSize
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              selected={values.startDate ? new Date(values.startDate) : null}
              label="Start date"
              {...getFieldProps(VoucherFormField.START_DATE)}
              errorMessage={getFieldErrorMessage(VoucherFormField.START_DATE)}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              minDate={new Date()}
              maxDate={!isEmpty(values.endDate) ? new Date(values.endDate) : null}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              readOnly={readOnly}
              required
              isSmallSize
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              selected={values.endDate ? new Date(values.endDate) : null}
              label="Expiration date"
              {...getFieldProps(VoucherFormField.EXP_DATE)}
              errorMessage={getFieldErrorMessage(VoucherFormField.EXP_DATE)}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              minDate={!isEmpty(values.startDate) ? new Date(values.startDate) : null}
            />
          </Grid>
        </Grid>
        {!readOnly && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              padding: '8px 0px',
              gap: 2,
              borderRadius: '0 0 16px 16px',
            }}
          >
            <Button variant="outlined" color="inherit" onClick={closeModal} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} variant="contained" color="primary">
              {isEditing ? 'Save' : 'Add'}
            </Button>
          </Stack>
        )}
      </Stack>
    </form>
  );
};

type Props = {
  voucherId?: string;
  isEditing?: boolean;
  readOnly?: boolean;
};
export default VoucherForm;
