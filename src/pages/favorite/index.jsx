import { useCallback, useEffect, useState } from "react";

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
import UseLoadingStatusUpdateDeleteBtn from "@hooks/use-loading-delete-btn";
import { DataGridContainer } from "@styles/dataGrid";
import "@pages/shoppingCart/style.css";
import { AppbarHeader } from "@styles/appbar";
import Footer from "@components/footer";
import withGuard from "@utils/withGuard";
import { NoCount } from "@styles/products";

function Favorite() {
  const {
    favoritesArray = [],
    loadingGetFavorites,
    countOfFavoritesProducts,
  } = useSelector((state) => state.cart); // Default to empty array
  const dispatch = useDispatch();
  const [btnDisabled, setBtnDisabled] = useState(null);
  const LoadingStatusDeleteUpdate = UseLoadingStatusUpdateDeleteBtn();
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
      setBtnDisabled(favoriteItemId);
      Swal.fire({
        title: t("suring"),
        text: t("info-favorite"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: t("delete-confirm"),
        cancelButtonText: t("cancel-delete"),
        customClass: {
          confirmButton: "red-confirm-button swal2-confirm",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteFavorite({ customerId: Uid, favoriteItemId }))
            .unwrap()
            .then(() => {
              Swal.fire({
                title: t("deleting-favorite"),
                icon: "success",
                confirmButtonText: t("ok"),
              });
            })
            .catch((error) => {
              Swal.fire({
                title: t("error-deleting-favorite"),
                icon: "warning",
                confirmButtonText: t("ok"),
              });
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
    {
      field: "id",
      headerName: t("cart-id"),
      width: 200,
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
          loading="lazy"
          style={{ width: "100%", height: "auto" }}
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
      field: "view",
      headerName: t("view-cart"),
      headerAlign: "center",
      align: "center",
      minWidth: 150,
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
      field: "delete",
      headerName: t("delete-cart"),
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <Button
          variant={themeMode === "dark" ? "contained" : "outlined"}
          color="error"
          onClick={() => handleDelete(params.row.id)}
          disabled={LoadingStatusDeleteUpdate && btnDisabled === params.row.id}
        >
          {t("delete")}
        </Button>
      ),
    },
  ];

  const rows =
    favoritesArray?.map((cart) => ({
      id: cart?.id,
      name: cart?.product?.name,
      brand: cart?.product?.brand,
      price: cart?.product?.price,
      image: cart?.product?.cover_image,
    })) || []; // Ensure rows is an array

  return (
    <>
      <Box
        sx={{
          p: 2,
          minHeight: "55vh",
          position: "relative",
        }}
      >
        <Container>
          {loadingGetFavorites ? (
            <LoadingFetching>{t("wait-favorite")}</LoadingFetching>
          ) : countOfFavoritesProducts ? (
            <>
              <AppbarHeader data-aos="fade-up">
                {t("product-added-to-favorite")}
              </AppbarHeader>
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
            <NoCount>{t("no-favorites")}</NoCount>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default withGuard(Favorite);
