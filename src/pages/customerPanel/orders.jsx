import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DataGrid } from "@mui/x-data-grid"
import { useTranslation } from "react-i18next"
import { AppbarHeader } from "@styles/appbar"

import { Grid, Box } from "@mui/material"
import {
  EmptyStateText,
  EmptyStateBox,
  DataGridWrapper,
  PageContainer,
  ProductImage,
  FilterContainer,
} from "@styles/dataGrid"

import { getAllOrders, getAllAddresses } from "@state/slices/customer"
import SelectStatus from "@components/selectStatus"
import LoadingFetching from "@components/loadingFetching"
import UseOrderOptions from "@hooks/use-order-date"
import UseStatusOptions from "@hooks/use-status-options"

// Styled Components matching RootLayout theme

function AllOrders() {
  const dispatch = useDispatch()
  const { loadingGetOrders, allOrders, addresses, loadingGetAddresses } =
    useSelector((state) => state.customer)
  const { Uid } = useSelector((state) => state.auth)
  const { t } = useTranslation()
  const [status, setStatus] = useState("")
  const [ordering, setOrdering] = useState("")

  const { mymode } = useSelector((state) => state.mode)
  const handleChangeStatus = (e) => {
    setStatus(e.target.value)
  }

  const handleChangeOrdering = (e) => {
    setOrdering(e.target.value)
  }

  const { statusOptions } = UseStatusOptions()
  const { orderOptions } = UseOrderOptions()

  useEffect(() => {
    dispatch(getAllOrders({ customerId: Uid, status, ordering }))
    dispatch(getAllAddresses({ customerId: Uid }))
  }, [dispatch, Uid, status, ordering])

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
      field: "pickup_address_id",
      headerName: t("order-address"),
      flex: 1.5,
      minWidth: 200,
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
      field: "unit_price",
      headerName: t("unit-price"),
      flex: 0.8,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "quantity",
      headerName: t("quantity"),
      flex: 0.6,
      minWidth: 80,
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "total_price",
      headerName: t("total-price-order"),
      flex: 0.8,
      minWidth: 120,
      type: "number",
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
      field: "ordered_at",
      headerName: t("ordered-at"),
      flex: 1.5,
      minWidth: 180,
      headerAlign: "center",
      align: "center",
    },
  ]

  // Prepare rows for the DataGrid
  const rows = allOrders?.map(
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
      total_price,
      ordered_at: new Date(ordered_at).toLocaleString(),
      quantity: order_items?.[0]?.quantity,
      unit_price: order_items?.[0]?.unit_price,
      image: order_items?.[0]?.product?.cover_image,
      pickup_address_id:
        addresses?.find((address) => address.id === pickup_address_id)
          ?.address || t("address-not-found"),
    })
  )

  return (
    <PageContainer>
      {loadingGetOrders || loadingGetAddresses ? (
        <EmptyStateBox>
          <LoadingFetching>{t("wait-orders")}</LoadingFetching>
        </EmptyStateBox>
      ) : allOrders?.length ? (
        <>
          <AppbarHeader
            style={{ color: mymode === "dark" ? "#fbbf24" : "black" }}
            data-aos="fade-up"
          >
            {" "}
            {t("your-orders")}
          </AppbarHeader>

          <FilterContainer data-aos="fade-up" data-aos-delay="50">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <SelectStatus
                  options={statusOptions}
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
              //   checkboxSelection
              disableRowSelectionOnClick
              rowHeight={120}
            />
          </DataGridWrapper>
        </>
      ) : (
        <EmptyStateBox data-aos="fade-up">
          <Box sx={{ width: "100%", maxWidth: 400 }}>
            <SelectStatus
              options={statusOptions}
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

export default AllOrders
