import { Fragment, useCallback, useEffect, useState } from "react";

import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { Container, Grid, Card } from "@mui/material";

import Swal from "sweetalert2";

import CartItem from "@components/cart/carItem";
import CartListProducts from "@components/cart/cartListProducts";
import { actGetCategoriesByItems } from "@state/slices/cart";
import {
  getCarts,
  getCartItem,
  updateQuantity,
  cleanUpCartItems,
  cleanUpCartItem,
  deleteCartItem,
} from "@state/slices/cart";

import LoadingFetching from "@components/loadingFetching";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import "./style.css";

function ShoppingCart() {
  const dispatch = useDispatch();
  // const { productFullInfo } = useSelector((state) => state.cart);
  // console.log(productFullInfo);
  const { Uid } = useSelector((state) => state.auth);
  const { cartItems, countOfCartItems, loadingCarts } = useSelector(
    (state) => state.cart
  );
  // const
  useEffect(() => {
    // dispatch(
    // actGetCategoriesByItems({
    //   title: "Mahmoud",
    //   description: "descriptionoftext",
    //   price: null,
    //   cat: "",
    // })
    dispatch(getCarts({ id: Uid }));
    // .unwrap()
    // .then();
    return () => {
      dispatch(cleanUpCartItems());
    };
  }, [dispatch, countOfCartItems]);
  const { t } = useTranslation();

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

  const columns = [
    { field: "id", headerName: t("cart-id"), width: 100 },
    {
      field: "name",
      headerName: t("product-name"),
      width: 150,
    },

    {
      field: "brand",
      headerName: t("product-brand"),
      width: 150,
    },
    {
      field: "image",
      headerName: t("product-img"),
      width: 300,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.value}
          style={{ width: "100%", height: "auto" }}
        />
      ),
    },
    {
      field: "price",
      headerName: t("product-price"),
      width: 150,
    },
    {
      field: "quantity",
      headerName: t("product-quantity"),
      width: 150,
    },
    {
      field: "totalPrice",
      headerName: t("total-price"),
      width: 150,
    },
    {
      field: "view",
      headerName: t("view-cart"),
      renderCell: (params) => (
        <Link to={`/cart-item/${params.row.id}`}>{params.value}</Link>
      ),
    },
    {
      field: "delete",
      headerName: t("delete-cart"),
      renderCell: (params) => (
        <Link onClick={() => handleDelete(params.row.id)}>{params.value}</Link>
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
    totalPrice: cart?.quantity * cart?.product?.price,
    view: t("view"),
    delete: t("delete"),
  }));
  console.log("cartItems[0]?.product?.price");
  console.log(cartItems && cartItems[0]?.product?.price * 2);
  console.log(cartItems);
  return (
    <Box sx={{ p: 2 }}>
      <div data-aos="fade-up">Products added to Cart</div>
      {/* <CartListProducts
        records={cartItems}
        rendercarts={(cart) => <CartItem {...cart} />}
      /> */}
      {/* <button
        onClick={() =>
          dispatch(updateQuantity({ customerId: Uid, cartId: 1, quantity: 5 }))
        }
      >
        update
      </button> */}

      <Container>
        {loadingCarts ? (
          <LoadingFetching>{t("loading-carts")}</LoadingFetching>
        ) : countOfCartItems ? (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={3}
            // checkboxSelection
            rowHeight={150}
            disableSelectionOnClick
          />
        ) : (
          <div>{t("no-carts")}</div>
        )}
      </Container>
      <button
        onClick={() =>
          dispatch(updateQuantity({ customerId: Uid, cartId: 21, quantity: 3 }))
        }
      >
        update
      </button>
    </Box>
  );
}
export default ShoppingCart;
