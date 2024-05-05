import {
  CustomTableFilterContainer,
  CustomTableSearch,
  DialogContext,
  DialogType,
  EmptyTable,
  Table,
} from '@components';
import { Button, Container, Stack, Typography } from '@mui/material';
import { GetPropertiesParams, ProductResponse, useDeleteProduct, useGetAllProduct } from '@queries';
import { RoleService, Toastify } from '@shared';
import { MUIDataTableOptions } from 'mui-datatables';
import React, { useCallback, useContext, useMemo } from 'react';
import { IoAdd } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import ProductFilter from '../ProductFilter';
import ProductForm from '../ProductForm';
import { PRODUCT_FILTER_QUERY_KEY, ProductFilterFormValue, filterParamsKey } from '../helpers';
import { allColumns } from './allColumns';
import { ProductToastMessage } from '../ProductForm/helpers';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/store';

const ProductManagement: React.FC = () => {
  const { openModal, closeModal, setDialogContent } = useContext(DialogContext);
  const roleId = useSelector((state: IRootState) => state.auth.currentRole);

  const { products, totalRecords, setParams, isFetching, handleInvalidateAllProducts } =
    useGetAllProduct({
      onError: (error) => {
        Toastify.error(error?.message);
      },
    });

  const { onDeleteProduct } = useDeleteProduct({
    onSuccess() {
      handleInvalidateAllProducts();
      Toastify.success(ProductToastMessage.DELETE_SUCCESS);
    },
  });

  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);

  const paramsUrl: ProductFilterFormValue = useMemo(() => {
    const categoryQuery = query.getAll(PRODUCT_FILTER_QUERY_KEY.Categories) || undefined;
    const storeIdQuery = query.get(PRODUCT_FILTER_QUERY_KEY.StoreId) || undefined;

    return {
      categories: categoryQuery,
      storeId: storeIdQuery,
    };
  }, [query]);

  const handleAdd = () => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      title: 'Add New Product',
      data: <ProductForm />,
      maxWidth: 'md',
    });
    openModal();
  };

  const handleEdit = useCallback(
    (rowData: ProductResponse) => {
      setDialogContent({
        type: DialogType.CONTENT_DIALOG,
        title: 'Edit Product',
        data: <ProductForm isEditing productId={rowData.id} />,
        maxWidth: 'md',
      });
      openModal();
    },
    [openModal, setDialogContent],
  );

  const handleDelete = useCallback((rowData: ProductResponse) => {
    setDialogContent({
      type: DialogType.YESNO_DIALOG,
      maxWidth: 'xs',
      contentText: 'Delete Product',
      subContentText: "Are you sure you want to delete this product? This action can't be undone.",
      showIcon: true,
      isWarning: true,
      okText: 'Yes',
      onOk: () => {
        onDeleteProduct({ id: rowData.id });
        closeModal();
      },
    });
    openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleView = useCallback(
    (rowData: ProductResponse) => {
      setDialogContent({
        type: DialogType.CONTENT_DIALOG,
        title: 'Product Detail',
        data: <ProductForm isEditing productId={rowData.id} readonly />,
        maxWidth: 'md',
      });
      openModal();
    },
    [openModal, setDialogContent],
  );

  const handleGetProductList = (params: GetPropertiesParams) => {
    setParams({ ...params });
  };

  const tableOptions: MUIDataTableOptions = useMemo(
    () => ({
      count: totalRecords,
      rowHover: totalRecords > 0,
      filter: false,
      search: false,
    }),
    [totalRecords],
  );

  const columns = useMemo(
    () => allColumns({ handleEdit, handleDelete, handleView, roleId }),
    [handleEdit, handleDelete, handleView, roleId],
  );

  return (
    <Container maxWidth="xl">
      <Stack sx={{ mb: 2, mt: 2 }}>
        <Typography variant="h3" fontWeight={600}>
          Product Management
        </Typography>
      </Stack>
      <Stack alignItems="center" justifyContent="space-between" flexDirection="row">
        <CustomTableSearch placeholder="Search by product name..." />
        <Stack justifyContent="flex-end" direction="row" flexGrow={1} alignItems="center" gap={2}>
          {RoleService.isAdminRole(roleId) && (
            <Button variant="contained" color="primary" startIcon={<IoAdd />} onClick={handleAdd}>
              Add new Product
            </Button>
          )}
          <CustomTableFilterContainer filterParamsKeys={filterParamsKey}>
            <ProductFilter searchValues={paramsUrl} />
          </CustomTableFilterContainer>
        </Stack>
      </Stack>
      <Table
        title=""
        onAction={handleGetProductList}
        isLoading={isFetching}
        data={products}
        tableOptions={tableOptions}
        columns={columns}
        emptyComponent={<EmptyTable />}
        additionalFilterParams={filterParamsKey}
      />
    </Container>
  );
};

export default ProductManagement;
