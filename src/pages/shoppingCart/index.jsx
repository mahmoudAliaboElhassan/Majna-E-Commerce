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

import CartItem from "@components/cart/carItem"
import CartListProducts from "@components/cart/cartListProducts"
import {
  getCarts,
  updateQuantity,
  cleanUpCartItems,
  deleteCartItem,
} from "@state/slices/cart"
import Footer from "@components/footer"
import LoadingFetching from "@components/loadingFetching"
import UseFormValidation from "@formValidation/use-form-validation"
import { helperStyle } from "@styles/error"
import { AppbarHeader } from "@styles/appbar"
import { DataGridContainer } from "@styles/dataGrid"
import UseThemMode from "@hooks/use-theme"
import "@pages/shoppingCart/style.css"
import withGuard from "@utils/withGuard"
import { NoCount } from "@styles/products"
import UseLoadingStatusUpdateDeleteBtn from "@hooks/use-loading-delete-btn"
import ModalOrderAll from "@components/modalAllProducts"
import { deleteCarts } from "@state/slices/cart"

function ShoppingCart() {
  const dispatch = useDispatch()
  const { Uid } = useSelector((state) => state.auth)
  const { cartItems, countOfCartItems, loadingCarts, cartQuantity } =
    useSelector((state) => state.cart)
  const { themeMode } = UseThemMode()
  useEffect(() => {
    dispatch(getCarts({ id: Uid }))
    return () => {
      dispatch(cleanUpCartItems())
    }
  }, [dispatch, countOfCartItems, Uid, cartQuantity])
  console.log("countOfCartItems")
  console.log(countOfCartItems !== 0)
  const { t } = useTranslation()
  const { FORM_VALIDATION_SCHEMA_UPDATE_QUANTITY } = UseFormValidation()

  const LoadingStatusDeleteUpdate = UseLoadingStatusUpdateDeleteBtn()
  const [btnEditDisabled, setBtnEditDisabled] = useState(null)
  const { loadingAddOrder } = useSelector((state) => state.customer)
  const { loadingDeleteCarts } = useSelector((state) => state.cart)
  const [btnDeleteDisabled, setBtnDeleteDisabled] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  const handleDeleteCartItems = () => {
    dispatch(deleteCarts({ customerId: Uid }))
      .unwrap()
      .then(() => {
        {
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
        }
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
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: t("product-name"),
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "brand",
      headerName: t("product-brand"),
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "image",
      headerName: t("product-img"),
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.value}
          style={{ width: "100%", height: "auto" }}
          loading="lazy"
        />
      ),
    },
    {
      field: "price",
      headerName: t("product-price"),
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "quantity",
      headerName: t("product-quantity"),
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalPrice",
      headerName: t("total-price"),
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "view",
      headerName: t("view-cart"),
      headerAlign: "center",
      align: "center",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <Button
          variant={themeMode === "dark" ? "contained" : "outlined"}
          color="success"
          component={Link}
          to={`/product-view/${params.row.id}`}
        >
          {t("view")}
        </Button>
      ),
    },
    {
      field: "edit",
      headerName: t("edit-quantity"),
      minWidth: 200,
      flex: 1,
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
                  {
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
                  }
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
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <Button
          variant={themeMode === "dark" ? "contained" : "outlined"}
          color="error"
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
    view: t("view"),
    delete: t("delete"),
    edit: t("edit"),
  }))
  const allProducts = cartItems?.map((cart) => ({
    product_id: cart?.id,
    quantity: cart?.quantity,
  }))

  let totalPrice = 0
  cartItems?.forEach((cart) => {
    totalPrice += cart?.product?.price * cart?.quantity
  })
  console.log("totalPrice", totalPrice)
  return (
    <>
      <Box
        sx={{
          p: 2,
          minHeight: "55vh",
          position: "relative",
        }}
      >
        {" "}
        {/* <ToastContainer /> */}
        <Container>
          {loadingCarts ? (
            <LoadingFetching>{t("wait-carts")}</LoadingFetching>
          ) : countOfCartItems !== "0" ? (
            <>
              <AppbarHeader data-aos="fade-up">
                {t("product-added-to-cart")}
              </AppbarHeader>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5, 10, 15, 20]}
                checkboxSelection
                disableRowSelectionOnClick
                rowHeight={120}
              />
              <Grid container spacing={1}>
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
                    disabled={loadingDeleteCarts}
                    fullWidth
                  >
                    {t("delete-carts")}
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : (
            <NoCount>{t("no-carts")}</NoCount>
          )}
        </Container>
      </Box>
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
