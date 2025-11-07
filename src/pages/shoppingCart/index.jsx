import { Fragment, useCallback, useEffect, useState } from "react"
import { Box, Container, TextField, Button, Grid } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import Swal from "sweetalert2"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useSelector, useDispatch } from "react-redux"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import {
  EmptyStateText,
  EmptyStateBox,
  DataGridWrapper,
  PageContainer,
  ProductImage,
  FilterContainer,
} from "@styles/dataGrid"
import {
  getCarts,
  updateQuantity,
  cleanUpCartItems,
  deleteCartItem,
  deleteCarts,
} from "@state/slices/cart"
import Footer from "@components/footer"
import LoadingFetching from "@components/loadingFetching"
import UseFormValidation from "@formValidation/use-form-validation"
import { helperStyle } from "@styles/error"
import { AppbarHeader } from "@styles/appbar"
import UseThemMode from "@hooks/use-theme"
import "@pages/shoppingCart/style.css"
import withGuard from "@utils/withGuard"
import UseLoadingStatusUpdateDeleteBtn from "@hooks/use-loading-delete-btn"
import ModalOrderAll from "@components/modalAllProducts"

function ShoppingCart() {
  const dispatch = useDispatch()
  const { Uid } = useSelector((state) => state.auth)
  const { cartItems, countOfCartItems, loadingCarts, cartQuantity } =
    useSelector((state) => state.cart)
  const { mymode } = useSelector((state) => state.mode)
  const { themeMode } = UseThemMode()
  const { t } = useTranslation()
  const { FORM_VALIDATION_SCHEMA_UPDATE_QUANTITY } = UseFormValidation()

  const LoadingStatusDeleteUpdate = UseLoadingStatusUpdateDeleteBtn()
  const [btnEditDisabled, setBtnEditDisabled] = useState(null)
  const { loadingAddOrder } = useSelector((state) => state.customer)
  const { loadingDeleteCarts } = useSelector((state) => state.cart)
  const [btnDeleteDisabled, setBtnDeleteDisabled] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    dispatch(getCarts({ id: Uid }))
    return () => {
      dispatch(cleanUpCartItems())
    }
  }, [dispatch, countOfCartItems, Uid, cartQuantity])

  const handleDeleteCartItems = () => {
    dispatch(deleteCarts({ customerId: Uid }))
      .unwrap()
      .then(() => {
        toast.success(t("cart-deleted"), {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: themeMode,
        })
      })
  }

  const handleDelete = useCallback(
    (cartId) => {
      setBtnEditDisabled(null)
      setBtnDeleteDisabled(cartId)
      Swal.fire({
        title: t("suring"),
        text: t("info-cart"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: t("delete-confirm"),
        cancelButtonText: t("cancel-delete"),
        customClass: {
          confirmButton: "red-confirm-button swal2-confirm",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteCartItem({ customerId: Uid, cartId }))
            .unwrap()
            .then(() => {
              Swal.fire({
                title: t("deleting-cart"),
                icon: "success",
                confirmButtonText: t("ok"),
              })
            })
            .catch((error) => {
              Swal.fire({
                title: t("error-deleting-cart"),
                icon: "warning",
                confirmButtonText: t("ok"),
              })
            })
        } else {
          Swal.fire({
            title: t("keeping-cart"),
            icon: "info",
            confirmButtonText: t("ok"),
          })
        }
      })
    },
    [dispatch, t, Uid]
  )

  const columns = [
    {
      field: "id",
      headerName: t("cart-id"),
      flex: 0.5,
      minWidth: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "image",
      headerName: t("product-img"),
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <ProductImage src={params.value} alt="Product" loading="lazy" />
      ),
    },
    {
      field: "name",
      headerName: t("product-name"),
      flex: 1.5,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "brand",
      headerName: t("product-brand"),
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: t("product-price"),
      flex: 0.8,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "quantity",
      headerName: t("product-quantity"),
      flex: 0.6,
      minWidth: 80,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "totalPrice",
      headerName: t("total-price"),
      flex: 0.8,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "view",
      headerName: t("view-cart"),
      headerAlign: "center",
      align: "center",
      flex: 0.8,
      minWidth: 100,
      renderCell: (params) => (
        <Button
          variant={themeMode === "dark" ? "contained" : "outlined"}
          color="success"
          component={Link}
          to={`/product-view/${params.row.id}`}
          size="small"
        >
          {t("view")}
        </Button>
      ),
    },
    {
      field: "edit",
      headerName: t("edit-quantity"),
      flex: 1.5,
      minWidth: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Formik
          initialValues={{ quantity: params.row.quantity }}
          validationSchema={FORM_VALIDATION_SCHEMA_UPDATE_QUANTITY}
          onSubmit={(values) => {
            setBtnEditDisabled(params.row.id)
            if (params.row.quantity !== values.quantity) {
              dispatch(
                updateQuantity({
                  customerId: Uid,
                  cartId: params.row.id,
                  quantity: values.quantity,
                })
              )
                .unwrap()
                .then(() => {
                  toast.success(t("updated-success"), {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: themeMode,
                  })
                })
            }
          }}
        >
          {({ handleChange, handleSubmit }) => (
            <Form style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Field
                as={TextField}
                type="number"
                name="quantity"
                onChange={handleChange}
                style={{ width: "60%" }}
                size="small"
                required
              />
              <Button
                onClick={handleSubmit}
                variant={themeMode === "dark" ? "contained" : "outlined"}
                color="info"
                size="small"
                disabled={
                  LoadingStatusDeleteUpdate && btnEditDisabled === params.row.id
                }
              >
                {t("edit")}
              </Button>
              <ErrorMessage
                name="quantity"
                component="div"
                style={helperStyle}
              />
            </Form>
          )}
        </Formik>
      ),
    },
    {
      field: "delete",
      headerName: t("delete-cart"),
      headerAlign: "center",
      align: "center",
      flex: 0.8,
      minWidth: 100,
      renderCell: (params) => (
        <Button
          variant={themeMode === "dark" ? "contained" : "outlined"}
          color="error"
          size="small"
          disabled={
            LoadingStatusDeleteUpdate && btnDeleteDisabled === params.row.id
          }
          onClick={() => handleDelete(params.row.id)}
        >
          {t("delete")}
        </Button>
      ),
    },
  ]

  const rows = cartItems?.map((cart) => ({
    id: cart?.id,
    name: cart?.product?.name,
    brand: cart?.product?.brand,
    price: cart?.product?.price,
    image: cart?.product?.cover_image,
    quantity: cart?.quantity,
    totalPrice: (cart?.quantity * cart?.product?.price).toFixed(3),
  }))

  const allProducts = cartItems?.map((cart) => ({
    product_id: cart?.id,
    quantity: cart?.quantity,
  }))

  let totalPrice = 0
  cartItems?.forEach((cart) => {
    totalPrice += cart?.product?.price * cart?.quantity
  })

  return (
    <>
      <PageContainer>
        {loadingCarts ? (
          <EmptyStateBox>
            <LoadingFetching>{t("wait-carts")}</LoadingFetching>
          </EmptyStateBox>
        ) : countOfCartItems !== "0" ? (
          <>
            <AppbarHeader
               data-aos="fade-up"
            >
              {t("product-added-to-cart")}
            </AppbarHeader>

            <DataGridWrapper
              elevation={2}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[5, 10, 15, 20]}
                disableRowSelectionOnClick
                rowHeight={120}
              />
            </DataGridWrapper>

            <Box sx={{ mt: 3 }} data-aos="fade-up" data-aos-delay="150">
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Button
                    onClick={() => setOpenModal(true)}
                    variant={themeMode === "dark" ? "contained" : "outlined"}
                    disabled={loadingAddOrder}
                    fullWidth
                  >
                    {t("place-order-all")}
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    onClick={handleDeleteCartItems}
                    variant={themeMode === "dark" ? "contained" : "outlined"}
                    color="error"
                    disabled={loadingDeleteCarts}
                    fullWidth
                  >
                    {t("delete-carts")}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <EmptyStateBox data-aos="fade-up">
            <EmptyStateText>{t("no-carts")}</EmptyStateText>
          </EmptyStateBox>
        )}
      </PageContainer>
      <ModalOrderAll
        openModalOrder={openModal}
        close={() => setOpenModal(false)}
        allProducts={allProducts}
        totalPrice={totalPrice}
      />
      <Footer />
    </>
  )
}

export default withGuard(ShoppingCart)
