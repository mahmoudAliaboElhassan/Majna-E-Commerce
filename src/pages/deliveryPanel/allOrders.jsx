import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DataGrid } from "@mui/x-data-grid"
import { useTranslation } from "react-i18next"
import { Grid, Box, Button } from "@mui/material"
import { Link } from "react-router-dom"

import {
  EmptyStateText,
  EmptyStateBox,
  DataGridWrapper,
  PageContainer,
  FilterContainer,
} from "@styles/dataGrid"
import { AppbarHeader } from "@styles/appbar"
import { getAllAddresses } from "@state/slices/customer"
import { getDeliveryOrders } from "@state/slices/delivery"
import SelectStatus from "@components/selectStatus"
import LoadingFetching from "@components/loadingFetching"
import UseOrderOptions from "@hooks/use-order-date"
import UseStatusOptions from "@hooks/use-status-options"
import UseThemeMode from "@hooks/use-theme"

function AllDeliveryOrders() {
  const dispatch = useDispatch()
  const { addresses, loadingGetAddresses } = useSelector(
    (state) => state.customer
  )
  const { loadingOrdersDelivery, ordersDelivery } = useSelector(
    (state) => state.delivery
  )
  const { Uid } = useSelector((state) => state.auth)
  const { mymode } = useSelector((state) => state.mode)
  const { t } = useTranslation()
  const { statusDeliveryOptions } = UseStatusOptions()
  const { orderOptions } = UseOrderOptions()
  const [status, setStaus] = useState("Placed")
  const [ordering, setOrderding] = useState("")
  const { themeMode } = UseThemeMode()

  const handleChangeStatus = (e) => {
    setStaus(e.target.value)
  }

  const handleChangeOrdering = (e) => {
    setOrderding(e.target.value)
  }

  useEffect(() => {
    dispatch(getDeliveryOrders({ status, ordering }))
    dispatch(getAllAddresses({ customerId: Uid }))
  }, [dispatch, status, ordering, Uid])

  // Define columns for the DataGrid
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
      field: "status",
      headerName: t("order-status"),
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "ordered_at",
      headerName: t("ordered-at"),
      flex: 1.5,
      minWidth: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "view",
      headerName: t("view-product"),
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Button
          variant={themeMode === "dark" ? "contained" : "outlined"}
          color="success"
          component={Link}
          to={`/delivery-control-panel/order/${params.row.id}`}
          size="small"
        >
          {t("view")}
        </Button>
      ),
    },
  ]

  // Prepare rows for the DataGrid
  const rows = ordersDelivery?.map(
    ({
      id,
      pickup_address_id,
      status,
      ordered_at,
      total_price,
      order_items,
    }) => ({
      id,
      status,
      ordered_at: new Date(ordered_at).toLocaleString(),
    })
  )

  return (
    <PageContainer>
      {loadingOrdersDelivery || loadingGetAddresses ? (
        <EmptyStateBox>
          <LoadingFetching>{t("wait-orders")}</LoadingFetching>
        </EmptyStateBox>
      ) : ordersDelivery?.length ? (
        <>
          <AppbarHeader
            style={{ color: mymode === "dark" ? "#fbbf24" : "black" }}
            data-aos="fade-up"
          >
            {t("here-all-orders")}
          </AppbarHeader>

          <FilterContainer data-aos="fade-up" data-aos-delay="50">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <SelectStatus
                  options={statusDeliveryOptions}
                  status={status}
                  handleChange={handleChangeStatus}
                  label={t("select-status")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectStatus
                  options={orderOptions}
                  status={ordering}
                  handleChange={handleChangeOrdering}
                  label={t("select-order-type")}
                />
              </Grid>
            </Grid>
          </FilterContainer>

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
          <Box sx={{ width: "100%", maxWidth: 400 }}>
            <SelectStatus
              options={statusDeliveryOptions}
              status={status}
              handleChange={handleChangeStatus}
              label={t("select-status")}
            />
          </Box>
          <EmptyStateText>{t("no-orders")}</EmptyStateText>
        </EmptyStateBox>
      )}
    </PageContainer>
  )
}

export default AllDeliveryOrders
