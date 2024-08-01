import { Fragment, useCallback, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import LoadingFetching from "@components/loadingFetching";
import {
  getFavorites,
  deleteFavorite,
  cleanUpFavorites,
} from "@state/slices/cart";
import UseThemeMode from "@hooks/use-theme";
import { DataGridContainer } from "@styles/dataGrid";
import "../shoppingCart/style.css";
import { AppbarHeader } from "@styles/appbar";


function Favorite() {
  const { favoritesArray = [], loadingGetFavorites, countOfFavoritesProducts } = useSelector((state) => state.cart); // Default to empty array
  const dispatch = useDispatch();
  const { Uid } = useSelector((state) => state.auth);

  useEffect(() => {
    if (Uid) {
      dispatch(getFavorites({ id: Uid }));
    }
    return () => {
      dispatch(cleanUpFavorites());
    };
  }, [dispatch, Uid, countOfFavoritesProducts]);

  const { t } = useTranslation();
  const { themeMode } = UseThemeMode();

  const handleDelete = useCallback(
    (favoriteItemId) => {
      Swal.fire({
        title: t("suring"),
        text: t("info-favorite"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: t("delete-cart-confirm"),
        cancelButtonText: t("cancel-delete-cart"),
        customClass: {
          confirmButton: "red-confirm-button swal2-confirm",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteFavorite({ customerId: Uid, favoriteItemId }));
          Swal.fire({
            title: t("deleting-favorite"),
            icon: "success",
            confirmButtonText: t("ok"),
          });
        } else {
          Swal.fire({
            title: t("keeping-favorite"),
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
    {
      field: "view",
      headerName: t("view-cart"),
      width: 80,
      renderCell: (params) => (
        <Link to={`/product-data/${params.row.id}`}>{t("view")}</Link>
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

  const rows = favoritesArray?.map((cart) => ({
    id: cart?.id,
    name: cart?.product?.name,
    brand: cart?.product?.brand,
    price: cart?.product?.price,
    image: cart?.product?.cover_image,
  })) || []; // Ensure rows is an array

  return (
    <Box sx={{ p: 2 }}>
      <Container>
        {loadingGetFavorites ? (
          <LoadingFetching>{t("wait-favorite")}</LoadingFetching>
        ) : countOfFavoritesProducts ? (
          <>
            <AppbarHeader data-aos="fade-up">{t('product-added-to-favorite')}</AppbarHeader>
            <DataGridContainer>
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
            </DataGridContainer>
          </>
        ) : (
          <div>{t("no-favorites")}</div>
        )}
      </Container>
    </Box>
  );
}

export default Favorite;
