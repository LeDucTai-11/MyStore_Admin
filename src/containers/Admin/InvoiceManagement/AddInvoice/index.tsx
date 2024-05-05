import { IMAGES } from '@appConfig/images';
import { PATHS } from '@appConfig/paths';
import {
  COLOR_CODE,
  DialogContext,
  DialogType,
  EmptyTable,
  Image,
  MuiSelect,
  SelectOption,
} from '@components';
import {
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  Button,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  PaymentMethod,
  ProductStoresType,
  useAddInvoice,
  useGetAllInvoices,
  useGetAllStoreLazy,
} from '@queries';
import { Toastify, formatMoney, isEmpty } from '@shared';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { IoAdd, IoLocation, IoTrash } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import SelectProductDialog from '../SelectProductDialog';
import { InvoiceToastMessage } from './helpers';

const AddInvoiceForm = () => {
  const { openModal, setDialogContent } = useContext(DialogContext);

  const navigate = useNavigate();

  const [selectedStoreId, setSelectedStoreId] = useState<string>(null);

  const [selectedProductStoreList, setSelectedProductStoreList] = useState<ProductStoreListType[]>(
    [],
  );

  const {
    storeOptions,
    setParams: setStoresParams,
    loading: loadingStores,
    fetchNextPage: fetchNextPageStores,
    setInputSearch: setInputSearchStores,
  } = useGetAllStoreLazy({
    onError: (error) => Toastify.error(error?.message),
  });

  const { handleInvalidateInvoiceList } = useGetAllInvoices();

  const { addInvoice, isLoading: isAddingInvoice } = useAddInvoice({
    onSuccess: () => {
      handleInvalidateInvoiceList();
      Toastify.success(InvoiceToastMessage.ADD_SUCCESS);
      navigate(PATHS.invoice);
    },
    onError: (error) => Toastify.error(error?.message),
  });

  useEffect(() => {
    setStoresParams({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChangeStore = (e: unknown, value: SelectOption, r: AutocompleteChangeReason) => {
    setSelectedStoreId(value?.value);
  };

  const handleSearchStore = (_e: unknown, value: string, reason: AutocompleteInputChangeReason) => {
    if (reason !== 'reset') {
      setInputSearchStores(value);
    }
  };

  const getProductStore = (productInInvoice: ProductStoreListType): ProductStoresType => {
    return {
      productStoreId: productInInvoice?.productStoreId,
      quantity: productInInvoice?.quantity,
    };
  };

  const handleAddInvoice = () => {
    addInvoice({
      contact: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
      },
      productStores: selectedProductStoreList?.flatMap((productInInvoice) =>
        getProductStore(productInInvoice),
      ),
      voucherId: null,
      shippingFee: 0,
      paymentMethod: PaymentMethod.COD,
    });
  };

  const handleOpenSelectProductDialog = useCallback(
    (selectedStoreId, selectedProductStoreList, setSelectedProductStoreList) => {
      setDialogContent({
        type: DialogType.CONTENT_DIALOG,
        title: 'Select Product',
        data: (
          <SelectProductDialog
            selectedStoreId={selectedStoreId}
            selectedProductStoreList={selectedProductStoreList}
            setSelectedProductStoreList={setSelectedProductStoreList}
          />
        ),
        maxWidth: 'lg',
      });
      openModal();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleRemoveProductFromInvoice = (selectedProductStore: ProductStoreListType) => {
    setSelectedProductStoreList((prev) =>
      prev.filter(
        (productStore) => productStore.productStoreId !== selectedProductStore.productStoreId,
      ),
    );
  };

  const grandTotal = useMemo(
    () =>
      selectedProductStoreList?.reduce(
        (total, curProduct) => total + curProduct.price * curProduct.quantity,
        0,
      ),
    [selectedProductStoreList],
  );

  const renderProductList = () => {
    return (
      <TableContainer>
        <Table>
          <TableHead sx={{ bgcolor: COLOR_CODE.GREY_50 }}>
            <TableRow>
              <TableCell width="35%" sx={{ color: COLOR_CODE.GREY_700, fontWeight: 600 }}>
                Product Name
              </TableCell>
              <TableCell width="15%" sx={{ color: COLOR_CODE.GREY_700, fontWeight: 600 }}>
                Quantity
              </TableCell>
              <TableCell width="20%" sx={{ color: COLOR_CODE.GREY_700, fontWeight: 600 }}>
                Price
              </TableCell>
              <TableCell width="20%" sx={{ color: COLOR_CODE.GREY_700, fontWeight: 600 }}>
                Total Price
              </TableCell>
              <TableCell width="10%" sx={{ color: COLOR_CODE.GREY_700, fontWeight: 600 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isEmpty(selectedProductStoreList) ? (
              <TableRow
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell colSpan={5} align="center">
                  <EmptyTable />
                </TableCell>
              </TableRow>
            ) : (
              selectedProductStoreList?.map((selectedProductStore) => (
                <TableRow
                  key={selectedProductStore.productStoreId}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell>
                    <Stack flexDirection="row" alignItems="center" gap={1}>
                      <Image
                        src={selectedProductStore.image || IMAGES.noImage}
                        sx={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'contain',
                        }}
                      />
                      <Typography fontSize={14}>{selectedProductStore.productName}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{selectedProductStore.quantity}</TableCell>
                  <TableCell>{formatMoney(selectedProductStore.price)}</TableCell>
                  <TableCell>
                    {formatMoney(selectedProductStore.price * selectedProductStore.quantity)}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" gap={1}>
                      <Tooltip title="Remove" placement="top" arrow>
                        <span>
                          <IconButton
                            onClick={(event) => {
                              event.stopPropagation();
                              handleRemoveProductFromInvoice(selectedProductStore);
                            }}
                          >
                            <IoTrash color={COLOR_CODE.GREY_600} size={20} />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
            {!isEmpty(selectedProductStoreList) && (
              <TableRow
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell>{}</TableCell>
                <TableCell>{}</TableCell>
                <TableCell>{}</TableCell>
                <TableCell sx={{ color: COLOR_CODE.GREY_700, fontWeight: 600, fontSize: 17 }}>
                  Grand Total
                </TableCell>
                <TableCell sx={{ color: COLOR_CODE.PRIMARY_500, fontWeight: 600, fontSize: 20 }}>
                  {formatMoney(grandTotal)}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Grid container spacing={3} paddingY={3} paddingX={5}>
      <Grid item xs={12}>
        <Typography variant="h3" fontWeight={600}>
          Add New Invoice
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Stack gap={2}>
          <Stack width="100%" direction="row" alignItems="center" gap={1}>
            <Stack minWidth="10%" direction="row" alignItems="center" gap={1}>
              <IoLocation size={18} color={COLOR_CODE.PRIMARY_500} />
              <Typography color={COLOR_CODE.PRIMARY_500} fontSize={16}>
                Store address
              </Typography>
            </Stack>
            <MuiSelect
              fullWidth
              placeholder="Select your store address"
              size="small"
              value={selectedStoreId}
              onChange={handleOnChangeStore}
              onInputChange={handleSearchStore}
              options={storeOptions}
              onFetchNextPage={fetchNextPageStores}
              allowLazyLoad
              filterOptions={(x) => x}
              isGetOptionOnChange
              isLoading={loadingStores}
              onBlur={(event, value, reason) => {
                if (!value) handleSearchStore(event, '', reason);
              }}
              noOptionsText={'not found'}
            />
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack gap={2} sx={{ border: `1px solid ${COLOR_CODE.GREY_300}`, borderRadius: '10px' }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap="10px"
            padding="16px 16px 0"
          >
            <Typography fontSize={17} color={COLOR_CODE.GREY_700} sx={{ fontWeight: 600 }}>
              Product list
            </Typography>
            <Stack>
              <Tooltip
                arrow
                title={isEmpty(selectedStoreId) ? 'Select your store address to add product' : ''}
              >
                <span style={{ width: '100%' }}>
                  <Button
                    variant="contained"
                    color="success"
                    endIcon={<IoAdd />}
                    disabled={isEmpty(selectedStoreId)}
                    onClick={() =>
                      handleOpenSelectProductDialog(
                        selectedStoreId,
                        selectedProductStoreList,
                        setSelectedProductStoreList,
                      )
                    }
                    sx={{ textTransform: 'none', fontSize: 15 }}
                  >
                    Add product
                  </Button>
                </span>
              </Tooltip>
            </Stack>
          </Stack>
          {renderProductList()}
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Button
            variant="outlined"
            color="inherit"
            disabled={isAddingInvoice}
            onClick={() => navigate(PATHS.invoice)}
          >
            Cancel
          </Button>
          <Tooltip
            arrow
            title={isEmpty(selectedProductStoreList) ? 'There are no products in the list' : ''}
          >
            <span>
              <Button
                variant="contained"
                color="primary"
                disabled={isEmpty(selectedProductStoreList) || isAddingInvoice}
                onClick={() => handleAddInvoice()}
              >
                Create Invoice
              </Button>
            </span>
          </Tooltip>
        </Stack>
      </Grid>
    </Grid>
  );
};

export type ProductStoreListType = ProductStoresType & {
  productName: string;
  image: string;
  price: number;
};

export default AddInvoiceForm;
