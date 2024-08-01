import { Fragment, useCallback, useEffect, useState } from "react";

import { Box, Container, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";

import CartItem from "@components/cart/carItem";
import CartListProducts from "@components/cart/cartListProducts";
import {
  getCarts,
  updateQuantity,
  cleanUpCartItems,
  deleteCartItem,
} from "@state/slices/cart";
import LoadingFetching from "@components/loadingFetching";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./style.css";
import UseFormValidation from "@formValidation/use-form-validation";
import { helperStyle } from "@styles/error";
import { AppbarHeader } from "@styles/appbar";
import { DataGridContainer } from "@styles/dataGrid"
import UseThemMode from "@hooks/use-theme";

function ShoppingCart() {
  const dispatch = useDispatch();
  const { Uid } = useSelector((state) => state.auth);
  const {
    cartItems,
    countOfCartItems,
    loadingCarts,
    loadingEditCartQuantity,
    cartQuantity,
  } = useSelector((state) => state.cart);
  const { themeMode } = UseThemMode();
  useEffect(() => {
    dispatch(getCarts({ id: Uid }));
    return () => {
      dispatch(cleanUpCartItems());
    };
  }, [dispatch, countOfCartItems, Uid, cartQuantity]);

  const { t } = useTranslation();
  const { FORM_VALIDATION_SCHEMA_UPDATE_QUANTITY } = UseFormValidation();
  console.log("loadingEditCartQuantity");
  console.log(loadingEditCartQuantity);
  const handleDelete = useCallback(
    (cartId) => {
      Swal.fire({
        title: t("suring"),
        text: t("info"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: t("delete-cart-confirm"),
        cancelButtonText: t("cancel-delete-cart"),
        customClass: {
          confirmButton: "red-confirm-button swal2-confirm",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteCartItem({ customerId: Uid, cartId }));
          Swal.fire({
            title: t("deleting-cart"),
            icon: "success",
            confirmButtonText: t("ok"),
          });
        } else {
          Swal.fire({
            title: t("keeping-cart"),
            icon: "info",
            confirmButtonText: t("ok"),
          });
        }
      });
    },
    [dispatch, t, Uid]
  );
  const [idx, setIdx] = useState(null);
  const columns = [
    { field: "id", headerName: t("cart-id"), width: 100 },
    { field: "name", headerName: t("product-name"), width: 150 },
    { field: "brand", headerName: t("product-brand"), width: 150 },
    {
      field: "image",
      headerName: t("product-img"),
      width: 200,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.value}
          style={{ width: "100%", height: "auto" }}
        />
      ),
    },
    { field: "price", headerName: t("product-price"), width: 100 },
    { field: "quantity", headerName: t("product-quantity"), width: 100 },
    { field: "totalPrice", headerName: t("total-price"), width: 150 },
    {
      field: "view",
      headerName: t("view-cart"),
      renderCell: (params) => (
        <Link to={`/cart-item/${params.row.id}`}>{t("view")}</Link>
      ),
    },
    {
      field: "edit",
      headerName: t("edit-quantity"),
      width: 200,
      renderCell: (params) => (
        <Formik
          initialValues={{ quantity: params.row.quantity }}
          validationSchema={FORM_VALIDATION_SCHEMA_UPDATE_QUANTITY}
          onSubmit={(values) => {
            setIdx(params.row.id);
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
                    });
                  }
                });
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
                disabled={loadingEditCartQuantity && idx === params.row.id}
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
      renderCell: (params) => (
        <Button
          variant={themeMode === "dark" ? "contained" : "outlined"}
          color="error"
          onClick={() => handleDelete(params.row.id)}
        >
          {t("delete")}
        </Button>
      ),
    },
  ];

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
  }));
  return (
    <Box sx={{ p: 2 }}>
      <ToastContainer />
      <Container>
        {loadingCarts ? (
          <LoadingFetching>{t("wait-carts")}</LoadingFetching>
        ) : countOfCartItems ? (
          <>
            <AppbarHeader data-aos="fade-up">{t('product-added-to-cart')}</AppbarHeader>
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
          </>
        ) : (
          <div>{t("no-carts")}</div>
        )}
      </Container>
    </Box>
  );
}

export default ShoppingCart;
