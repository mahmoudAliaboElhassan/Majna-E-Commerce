import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

import {
  EmptyStateText,
  EmptyStateBox,
  DataGridWrapper,
  PageContainer,
  ProductImage,
} from "@styles/dataGrid"
import LoadingFetching from "@components/loadingFetching"
import {
  getFavorites,
  deleteFavorite,
  cleanUpFavorites,
} from "@state/slices/cart"
import UseThemeMode from "@hooks/use-theme"
import UseLoadingStatusUpdateDeleteBtn from "@hooks/use-loading-delete-btn"
import "@pages/shoppingCart/style.css"
import { AppbarHeader } from "@styles/appbar"
import Footer from "@components/footer"
import withGuard from "@utils/withGuard"

function Favorite() {
  const {
    favoritesArray = [],
    loadingGetFavorites,
    countOfFavoritesProducts,
  } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const [btnDisabled, setBtnDisabled] = useState(null)
  const LoadingStatusDeleteUpdate = UseLoadingStatusUpdateDeleteBtn()
  const { Uid } = useSelector((state) => state.auth)
  const { mymode } = useSelector((state) => state.mode)

  useEffect(() => {
    if (Uid) {
      dispatch(getFavorites({ id: Uid }))
    }
    return () => {
      dispatch(cleanUpFavorites())
    }
  }, [dispatch, Uid, countOfFavoritesProducts])

  const { t } = useTranslation()
  const { themeMode } = UseThemeMode()

  const handleDelete = useCallback(
    (favoriteItemId) => {
      setBtnDisabled(favoriteItemId)
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
              })
            })
            .catch((error) => {
              Swal.fire({
                title: t("error-deleting-favorite"),
                icon: "warning",
                confirmButtonText: t("ok"),
              })
            })
        } else {
          Swal.fire({
            title: t("keeping-favorite"),
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
          onClick={() => handleDelete(params.row.id)}
          disabled={LoadingStatusDeleteUpdate && btnDisabled === params.row.id}
          size="small"
        >
          {t("delete")}
        </Button>
      ),
    },
  ]

  const rows =
    favoritesArray?.map((cart) => ({
      id: cart?.id,
      name: cart?.product?.name,
      brand: cart?.product?.brand,
      price: cart?.product?.price,
      image: cart?.product?.cover_image,
    })) || []

  return (
    <>
      <PageContainer>
        {loadingGetFavorites ? (
          <EmptyStateBox>
            <LoadingFetching>{t("wait-favorite")}</LoadingFetching>
          </EmptyStateBox>
        ) : countOfFavoritesProducts ? (
          <>
            <AppbarHeader
              style={{ color: mymode === "dark" ? "#fbbf24" : "black" }}
              data-aos="fade-up"
            >
              {t("product-added-to-favorite")}
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
          </>
        ) : (
          <EmptyStateBox data-aos="fade-up">
            <EmptyStateText>{t("no-favorites")}</EmptyStateText>
          </EmptyStateBox>
        )}
      </PageContainer>
      <Footer />
    </>
  )
}

export default withGuard(Favorite)
