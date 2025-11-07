import React, { useState, useEffect, useCallback } from "react"

import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { DataGrid } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"
import Swal from "sweetalert2"

import {
  EmptyStateText,
  EmptyStateBox,
  DataGridWrapper,
  PageContainer,
} from "@styles/dataGrid"
import {
  cleanUpStores,
  getStores,
  deleteStore,
} from "@state/slices/distributor"
import "@pages/shoppingCart/style.css"
import LoadingFetching from "@components/loadingFetching"
import UseThemMode from "@hooks/use-theme"
import { AppbarHeader } from "@styles/appbar"
import UseLoadingStatusUpdateDeleteBtn from "@hooks/use-loading-delete-btn"

function AllStores() {
  const { t } = useTranslation()
  const { Uid } = useSelector((state) => state.auth)
  const { stores, loadingStores, countOfStores } = useSelector(
    (state) => state.distributor
  )
  const { mymode } = useSelector((state) => state.mode)
  const dispatch = useDispatch()
  const { themeMode } = UseThemMode()
  const [btnDisabled, setbtnDisabled] = useState(null)
  const LoadingStatusDeleteUpdate = UseLoadingStatusUpdateDeleteBtn()

  useEffect(() => {
    dispatch(getStores({ Uid }))
    return () => {
      dispatch(cleanUpStores())
    }
  }, [countOfStores, dispatch, Uid])

  const handleDelete = useCallback(
    (storeId) => {
      setbtnDisabled(storeId)
      Swal.fire({
        title: t("suring"),
        text: t("info-store"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: t("delete-confirm"),
        cancelButtonText: t("cancel-delete"),
        customClass: {
          confirmButton: "red-confirm-button swal2-confirm",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteStore({ Uid, storeId }))
            .unwrap()
            .then(() => {
              Swal.fire({
                title: t("deleting-store"),
                icon: "success",
                confirmButtonText: t("ok"),
              })
            })
            .catch((error) => {
              if (error.response.status === 409) {
                Swal.fire({
                  title: t("store-related"),
                  icon: "warning",
                  confirmButtonText: t("ok"),
                })
              }
            })
        } else {
          Swal.fire({
            title: t("keeping-store"),
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
      headerName: t("id"),
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "storeName",
      headerName: t("storeName"),
      width: 300,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "governorate",
      headerName: t("governorate"),
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "city",
      headerName: t("storeCity"),
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "address",
      headerName: t("storeAddress"),
      headerAlign: "center",
      align: "center",
      width: 500,
    },
    {
      field: "edit",
      headerName: t("edit"),
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: (params) => (
        <Button
          variant={themeMode === "dark" ? "contained" : "outlined"}
          component={Link}
          to={`/distributor-control-panel/edit-store/${params.row.id}`}
          style={{ width: "30%" }}
          color="info"
        >
          {params.value}
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: t("delete"),
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
  ]

  // Transform stores data into rows for the DataGrid
  const rows = stores?.map(({ id, name, governorate, city, address }) => ({
    id: id,
    storeName: name,
    governorate: governorate,
    city: city,
    address: address,
    edit: t("edit"),
  }))

  return (
    <>
      <PageContainer>
        {loadingStores ? (
          <EmptyStateBox>
            <LoadingFetching>{t("loading-stores")}</LoadingFetching>
          </EmptyStateBox>
        ) : stores?.length ? (
          <>
            <AppbarHeader
              data-aos="fade-up"
              style={{ color: mymode === "dark" ? "#fbbf24" : "black" }}
            >
              {t("your-stores")}
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
            <EmptyStateText>{t("no-stores")}</EmptyStateText>
          </EmptyStateBox>
        )}
      </PageContainer>
    </>
  )
}

export default AllStores
