import { useState, useEffect, useCallback } from "react"

import { Button } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import Swal from "sweetalert2"
import "react-toastify/dist/ReactToastify.css"
import { Link } from "react-router-dom"

import "@pages/shoppingCart/style.css"
import UseThemMode from "@hooks/use-theme"
import { AppbarHeader } from "@styles/appbar"
import {
  EmptyStateText,
  EmptyStateBox,
  DataGridWrapper,
  PageContainer,
  ProductImage,
} from "@styles/dataGrid"
import LoadingFetching from "@components/loadingFetching"
import UseLoadingStatusUpdateDeleteBtn from "@hooks/use-loading-delete-btn"
import {
  getUploadedProducts,
  deleteUploadedProduct,
  cleanUpUploadedProducts,
} from "@state/slices/distributor"

function UploadedProducts() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { themeMode } = UseThemMode()
  const { Uid } = useSelector((state) => state.auth)
  const { mymode } = useSelector((state) => state.mode)
  const {
    uploadedProducts,
    loadingGetUploadedProducts,
    countOfUploadedProducts,
  } = useSelector((state) => state.distributor)
  const [btnDisabled, setbtnDisabled] = useState(null)
  const LoadingStatusDeleteUpdate = UseLoadingStatusUpdateDeleteBtn()

  useEffect(() => {
    dispatch(getUploadedProducts({ distributorId: Uid }))
    return () => dispatch(cleanUpUploadedProducts())
  }, [dispatch, countOfUploadedProducts, Uid])

  const handleDelete = useCallback(
    (productId) => {
      setbtnDisabled(productId)
      Swal.fire({
        title: t("suring"),
        text: t("info-product"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: t("delete-confirm"),
        cancelButtonText: t("cancel-delete"),
        customClass: {
          confirmButton: "red-confirm-button swal2-confirm",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteUploadedProduct({ distributorId: Uid, productId }))
            .unwrap()
            .then(() => {
              Swal.fire({
                title: t("deleting-product"),
                icon: "success",
                confirmButtonText: t("ok"),
              })
            })
            .catch((error) => {
              Swal.fire({
                title: t("error-deleting-product"),
                icon: "warning",
                confirmButtonText: t("ok"),
              })
            })
        } else {
          Swal.fire({
            title: t("keeping-product"),
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
      headerName: t("product-id"),
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: t("product-name"),
      width: 250,
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
        <ProductImage
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
      field: "albums",
      headerName: t("view-albums"),
      headerAlign: "center",
      align: "center",
      width: 200,
      renderCell: (params) => (
        <Button
          variant={themeMode === "dark" ? "contained" : "outlined"}
          color="success"
          component={Link}
          to={`/distributor-control-panel/albums/${params.row.id}`}
        >
          {t("view")}
        </Button>
      ),
    },
    {
      field: "view",
      headerName: t("view-product"),
      headerAlign: "center",
      align: "center",
      width: 200,
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
      headerName: t("edit-product"),
      headerAlign: "center",
      align: "center",
      width: 200,
      renderCell: (params) => (
        <Button
          variant={themeMode === "dark" ? "contained" : "outlined"}
          color="info"
          component={Link}
          to={`/distributor-control-panel/edit-product/${params.row.id}`}
        >
          {t("edit")}
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: t("delete-product"),
      headerAlign: "center",
      align: "center",
      width: 200,
      renderCell: (params) => (
        <Button
          variant={themeMode === "dark" ? "contained" : "outlined"}
          color="error"
          disabled={btnDisabled === params.row.id && LoadingStatusDeleteUpdate}
          onClick={() => handleDelete(params.row.id)}
        >
          {t("delete")}
        </Button>
      ),
    },
  ]

  const rows = uploadedProducts?.map(
    ({ id, name, brand, price, cover_image }) => ({
      id,
      name,
      brand,
      price,
      image: cover_image,
      view: t("view-product"),
      edit: t("edit"),
      delete: t("delete"),
      albums: t("albums"),
    })
  )

  return (
    <>
      <PageContainer>
        {loadingGetUploadedProducts ? (
          <EmptyStateBox>
            <LoadingFetching>{t("wait-uploaded-products")}</LoadingFetching>
          </EmptyStateBox>
        ) : countOfUploadedProducts ? (
          <>
            <AppbarHeader
              data-aos="fade-up"
              style={{ color: mymode === "dark" ? "#fbbf24" : "black" }}
            >
              {t("uploaded-products")}
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
            <EmptyStateText>{t("no-product-uploaded")}</EmptyStateText>
          </EmptyStateBox>
        )}
      </PageContainer>
    </>
  )
}

export default UploadedProducts
