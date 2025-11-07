import { useEffect, useState, useCallback } from "react"

import { useDispatch, useSelector } from "react-redux"
import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import Swal from "sweetalert2"
import { DataGrid } from "@mui/x-data-grid"

import "@pages/shoppingCart/style.css"
import {
  EmptyStateText,
  EmptyStateBox,
  DataGridWrapper,
  PageContainer,
} from "@styles/dataGrid"
import LoadingFetching from "@components/loadingFetching"
import UseLoadingStatusUpdateDeleteBtn from "@hooks/use-loading-delete-btn"
import { getAlbumItems, deleteAlbum } from "@state/slices/album"
import UseThemMode from "@hooks/use-theme"
import { AppbarHeader } from "@styles/appbar"

function Albums() {
  const dispatch = useDispatch()
  const { productId } = useParams()
  const { themeMode } = UseThemMode()
  const { mymode } = useSelector((state) => state.mode)
  const [btnDisabled, setbtnDisabled] = useState()
  const { t } = useTranslation()
  const { albumItems, loadingGetAlbumItems, countOfAlbumItems } = useSelector(
    (state) => state.album
  )
  const LoadingStatusDeleteUpdate = UseLoadingStatusUpdateDeleteBtn()

  useEffect(() => {
    dispatch(getAlbumItems({ productId: productId }))
  }, [countOfAlbumItems, dispatch, productId])

  const handleDelete = useCallback(
    (albumId) => {
      setbtnDisabled(albumId)
      Swal.fire({
        title: t("suring"),
        text: t("info-album"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: t("delete-confirm"),
        cancelButtonText: t("cancel-delete"),
        customClass: {
          confirmButton: "red-confirm-button swal2-confirm",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteAlbum({ albumId, productId }))
            .unwrap()
            .then(() => {
              Swal.fire({
                title: t("deleting-album"),
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
            title: t("keeping-album"),
            icon: "info",
            confirmButtonText: t("ok"),
          })
        }
      })
    },
    [dispatch, t, productId]
  )

  const columns = [
    {
      field: "id",
      headerName: t("album-id"),
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "image",
      headerName: t("product-img"),
      width: 400,
      headerAlign: "center",
      align: "center",
      flex: 1,
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
      field: "isCover",
      headerName: t("is_cover"),
      width: 200,
      headerAlign: "center",
      align: "center",
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
          to={`/distributor-control-panel/album/${productId}/${params.row.id}`}
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
      flex: 1,
      width: 200,
      renderCell: (params) => (
        <Button
          variant={themeMode === "dark" ? "contained" : "outlined"}
          color="error"
          disabled={
            (btnDisabled === params.row.id && LoadingStatusDeleteUpdate) ||
            params.row.isCover === true
          }
          onClick={() => handleDelete(params.row.id)}
        >
          {t("delete")}
        </Button>
      ),
    },
  ]

  const rows = albumItems?.map(({ id, is_cover, url }) => ({
    id,
    image: url,
    edit: t("edit"),
    delete: t("delete"),
    isCover: is_cover,
  }))

  return (
    <>
      <PageContainer>
        {loadingGetAlbumItems ? (
          <EmptyStateBox>
            <LoadingFetching>{t("loading-albums")}</LoadingFetching>
          </EmptyStateBox>
        ) : albumItems?.length ? (
          <>
            <AppbarHeader
              data-aos="fade-up"
              style={{ color: mymode === "dark" ? "#fbbf24" : "black" }}
            >
              {t("product-albums")}
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
                rowHeight={200}
              />
            </DataGridWrapper>
            {albumItems.length < 3 && (
              <Button
                variant={themeMode === "dark" ? "contained" : "outlined"}
                color="info"
                fullWidth
                component={Link}
                to={`/distributor-control-panel/add-brand/${productId}`}
                sx={{ mt: 2 }}
              >
                {t("add-album-item")}
              </Button>
            )}
          </>
        ) : (
          <EmptyStateBox data-aos="fade-up">
            <EmptyStateText>{t("no-albums")}</EmptyStateText>
          </EmptyStateBox>
        )}
      </PageContainer>
    </>
  )
}

export default Albums
