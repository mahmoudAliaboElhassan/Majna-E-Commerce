import { useCallback, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { DataGrid } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import { AppbarHeader } from "@styles/appbar"

import { Button } from "@mui/material"
import Swal from "sweetalert2"
import {
  EmptyStateText,
  EmptyStateBox,
  DataGridWrapper,
  PageContainer,
} from "@styles/dataGrid"

import LoadingFetching from "@components/loadingFetching"
import UseThemMode from "@hooks/use-theme"
import UseLoadingStatusUpdateDeleteBtn from "@hooks/use-loading-delete-btn"
import {
  getAllAddresses,
  deleteAddress,
  cleanUpGetAllAddresses,
} from "@state/slices/customer"

// Styled Components matching RootLayout theme

function Addresses() {
  const { t } = useTranslation()
  const { Uid } = useSelector((state) => state.auth)
  const { addresses, loadingGetAddresses, countOfAddresses } = useSelector(
    (state) => state.customer
  )
  const dispatch = useDispatch()
  const { themeMode } = UseThemMode()
  const [deleteId, setDeleteId] = useState(null)
  const LoadingStatusDeleteUpdate = UseLoadingStatusUpdateDeleteBtn()
  const { mymode } = useSelector((state) => state.mode)

  useEffect(() => {
    dispatch(getAllAddresses({ customerId: Uid }))
    return () => {
      dispatch(cleanUpGetAllAddresses())
    }
  }, [Uid, countOfAddresses, dispatch])

  const handleDeleteAddress = useCallback(
    (addressId) => {
      setDeleteId(addressId)
      Swal.fire({
        title: t("suring"),
        text: t("info-address"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: t("delete-confirm"),
        cancelButtonText: t("cancel-delete"),
        background: themeMode === "dark" ? "#1e293b" : "#ffffff",
        color: themeMode === "dark" ? "#f1f5f9" : "#0f172a",
        customClass: {
          confirmButton: "red-confirm-button swal2-confirm",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteAddress({ customerId: Uid, addressId }))
            .unwrap()
            .then(() => {
              Swal.fire({
                title: t("deleting-address"),
                icon: "success",
                confirmButtonText: t("ok"),
                background: themeMode === "dark" ? "#1e293b" : "#ffffff",
                color: themeMode === "dark" ? "#f1f5f9" : "#0f172a",
              })
            })
            .catch((error) => {
              Swal.fire({
                title: t("error-deleting-address"),
                icon: "warning",
                confirmButtonText: t("ok"),
                background: themeMode === "dark" ? "#1e293b" : "#ffffff",
                color: themeMode === "dark" ? "#f1f5f9" : "#0f172a",
              })
            })
        } else {
          Swal.fire({
            title: t("keeping-address"),
            icon: "info",
            confirmButtonText: t("ok"),
            background: themeMode === "dark" ? "#1e293b" : "#ffffff",
            color: themeMode === "dark" ? "#f1f5f9" : "#0f172a",
          })
        }
      })
    },
    [dispatch, t, Uid, themeMode]
  )

  const columns = [
    {
      field: "id",
      headerName: t("id"),
      flex: 0.5,
      minWidth: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "governorate",
      headerName: t("governorate"),
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "city",
      headerName: t("city"),
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "address",
      headerName: t("full-address"),
      flex: 2,
      minWidth: 300,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "edit",
      headerName: t("edit"),
      flex: 0.8,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Button
          variant={themeMode === "dark" ? "contained" : "outlined"}
          component={Link}
          to={`/customer-control-panel/edit-address/${params.row.id}`}
          sx={{ minWidth: "80px" }}
          color="info"
        >
          {params.value}
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: t("delete"),
      flex: 0.8,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Button
          variant={themeMode === "dark" ? "contained" : "outlined"}
          onClick={() => handleDeleteAddress(params.row.id)}
          color="error"
          sx={{ minWidth: "80px" }}
          disabled={deleteId === params.row.id && LoadingStatusDeleteUpdate}
        >
          {params.value}
        </Button>
      ),
    },
  ]

  const rows = addresses?.map(({ id, governorate, city, address }) => ({
    id: id,
    governorate: governorate,
    city: city,
    address: address,
    edit: t("edit"),
    delete: t("delete"),
  }))

  return (
    <PageContainer>
      {loadingGetAddresses ? (
        <EmptyStateBox>
          <LoadingFetching>{t("wait-addresses")}</LoadingFetching>
        </EmptyStateBox>
      ) : addresses?.length ? (
        <>
          <AppbarHeader
            style={{ color: mymode === "dark" ? "#fbbf24" : "black" }}
            data-aos="fade-up"
          >
            {" "}
            {t("your-addresses")}
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
              //   checkboxSelection
              disableRowSelectionOnClick
              rowHeight={100}
            />
          </DataGridWrapper>
        </>
      ) : (
        <EmptyStateBox data-aos="fade-up">
          <EmptyStateText>{t("no-addresses")}</EmptyStateText>
        </EmptyStateBox>
      )}
    </PageContainer>
  )
}

export default Addresses
