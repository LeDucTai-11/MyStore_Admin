import { IMAGES } from '@appConfig/images';
import { COLOR_CODE, DialogContext, EmptyTable, Image, Input } from '@components';
import {
  Button,
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
import { ProductResponse, useGetAllProduct } from '@queries';
import { formatMoney, isEmpty } from '@shared';
import { useContext, useEffect, useState } from 'react';
import { FaRegSquarePlus, FaSquareCheck } from 'react-icons/fa6';
import { ProductStoreListType } from '../AddInvoice';

const SelectProductDialog = ({
  selectedStoreId,
  selectedProductStoreList,
  setSelectedProductStoreList,
}: Props) => {
  const { closeModal } = useContext(DialogContext);

  const [selectedProduct, setSelectedProduct] = useState<ProductResponse>(null);

  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  const [errorMessage, setErrorMessage] = useState<string>(null);

  const {
    products: productList,
    isFetching: isLoadingProductList,
    setParams: setProductParams,
  } = useGetAllProduct();

  const alreadyAddedProductStore = selectedProductStoreList?.find(
    (productStore) => productStore.productStoreId === selectedProduct?.productStore?.id,
  );

  const handleSelectProduct = (event, product) => {
    event.stopPropagation();
    setSelectedProduct(product);
    setErrorMessage('');
  };

  const handleAddProductToInvoice = (
    selectedProduct: ProductResponse,
    selectedQuantity: number,
  ) => {
    if (selectedQuantity === 0) {
      setErrorMessage('Quantity must be greater than 0.');
    } else if (
      selectedQuantity + alreadyAddedProductStore?.quantity >
      selectedProduct?.productStore?.amount
    ) {
      setErrorMessage(
        `You have added this product to the list with a quantity of ${alreadyAddedProductStore?.quantity}. You cannot add ${selectedQuantity} more because it will exceed the available stock.`,
      );
    } else if (selectedQuantity > selectedProduct?.productStore?.amount) {
      setErrorMessage(
        'You have entered a quantity exceeding the available stock for the selected product.',
      );
    } else if (
      selectedProductStoreList?.some(
        (productStore) => productStore.productStoreId === selectedProduct?.productStore?.id,
      )
    ) {
      const filteredProductStoreList = selectedProductStoreList.filter(
        (productStore) => productStore.productStoreId !== selectedProduct?.productStore?.id,
      );
      setSelectedProductStoreList(() => [
        ...filteredProductStoreList,
        {
          productStoreId: selectedProduct?.productStore?.id,
          productName: selectedProduct?.name,
          image: selectedProduct?.image,
          price: selectedProduct?.price,
          quantity: alreadyAddedProductStore?.quantity + selectedQuantity,
        },
      ]);
      closeModal();
    } else {
      setSelectedProductStoreList((prev) => [
        ...prev,
        {
          productStoreId: selectedProduct?.productStore?.id,
          productName: selectedProduct?.name,
          image: selectedProduct?.image,
          price: selectedProduct?.price,
          quantity: selectedQuantity,
        },
      ]);
      closeModal();
    }
  };

  useEffect(() => {
    setProductParams({ storeId: selectedStoreId });
  }, [selectedStoreId, setProductParams]);

  return (
    <Stack gap={3}>
      <Stack gap="12px">
        <Typography fontSize={16} fontWeight={600}>
          <span className="text-red-500 font-bold text-md">*</span> Select a product from the table
          below
        </Typography>
        <TableContainer sx={{ height: '350px' }}>
          <Table>
            <TableHead sx={{ bgcolor: COLOR_CODE.GREY_50 }}>
              <TableRow>
                <TableCell width="50%" sx={{ color: COLOR_CODE.GREY_700, fontWeight: 600 }}>
                  Product Name
                </TableCell>
                <TableCell width="20%" sx={{ color: COLOR_CODE.GREY_700, fontWeight: 600 }}>
                  Stock
                </TableCell>
                <TableCell width="20%" sx={{ color: COLOR_CODE.GREY_700, fontWeight: 600 }}>
                  Selling Price
                </TableCell>
                <TableCell width="10%" sx={{ color: COLOR_CODE.GREY_700, fontWeight: 600 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoadingProductList ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <EmptyTable />
                  </TableCell>
                </TableRow>
              ) : (
                productList?.map((product) => (
                  <TableRow
                    key={product?.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      opacity: product?.amount < 1 || product?.productStore?.amount < 1 ? 0.4 : 1,
                      backgroundColor:
                        selectedProduct?.productStore?.id === product?.productStore?.id
                          ? COLOR_CODE.PRIMARY_100
                          : COLOR_CODE.WHITE,
                    }}
                  >
                    <TableCell>
                      <Stack flexDirection="row" alignItems="center" gap={1}>
                        <Image
                          src={product?.image || IMAGES.noImage}
                          sx={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'contain',
                          }}
                        />
                        <Typography fontSize={14}>{product?.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {product?.productStore?.amount < 1 || product?.amount < 1 ? (
                        <span className="text-red-500 text-md">Out of stock</span>
                      ) : (
                        product?.productStore?.amount || product?.amount
                      )}
                    </TableCell>
                    <TableCell>{formatMoney(product?.price)}</TableCell>
                    <TableCell>
                      <Stack direction="row" gap={1}>
                        <Tooltip
                          title={product?.id === selectedProduct?.id ? '' : 'Select'}
                          placement="top"
                          arrow
                        >
                          <span>
                            <IconButton
                              disabled={product?.amount < 1 || product?.productStore?.amount < 1}
                              onClick={(event) => handleSelectProduct(event, product)}
                              sx={{ color: COLOR_CODE.PRIMARY_500 }}
                            >
                              {product?.id === selectedProduct?.id ? (
                                <FaSquareCheck size={26} />
                              ) : (
                                <FaRegSquarePlus size={26} />
                              )}
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>

      {!isEmpty(selectedProduct) && (
        <Stack gap={1}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography>Please enter the quantity for the selected product:</Typography>
            <Input
              placeholder="Quantity"
              type="number"
              value={selectedQuantity}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSelectedQuantity(Number(event.target.value))
              }
              min={1}
              max={selectedProduct?.productStore?.amount || null}
              style={{ height: '35px', width: '100px', marginTop: 0 }}
            />
          </Stack>
          {errorMessage && (
            <Typography fontSize={15} color={COLOR_CODE.RED_500}>
              {errorMessage}
            </Typography>
          )}
        </Stack>
      )}

      <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Button variant="outlined" color="inherit" onClick={closeModal}>
          Cancel
        </Button>
        <Tooltip
          arrow
          title={isEmpty(selectedProduct) ? 'You have not selected any product yet!' : ''}
        >
          <span>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isEmpty(selectedProduct)}
              onClick={() => handleAddProductToInvoice(selectedProduct, selectedQuantity)}
            >
              Add Product
            </Button>
          </span>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

type Props = {
  selectedStoreId: string;
  selectedProductStoreList: ProductStoreListType[];
  setSelectedProductStoreList: React.Dispatch<React.SetStateAction<ProductStoreListType[]>>;
};

export default SelectProductDialog;
