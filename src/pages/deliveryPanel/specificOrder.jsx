import { useEffect } from "react"

import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Paper,
  Chip,
} from "@mui/material"
import { useTranslation } from "react-i18next"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import StorefrontIcon from "@mui/icons-material/Storefront"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"

import UseThemeMode from "@hooks/use-theme"
import { AppbarHeader } from "@styles/appbar"
import { getSpecificOrder, updateSpecificOrder } from "@state/act/actDelivery"
import UseDirection from "@hooks/use-direction"
import LoadingFetching from "@components/loadingFetching"
import { EmptyStateBox, PageContainer } from "@styles/dataGrid"

function SpecificOrder() {
  const dispatch = useDispatch()
  const { orderId } = useParams()
  const { themeMode } = UseThemeMode()
  const { mymode } = useSelector((state) => state.mode)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { Direction } = UseDirection()

  useEffect(() => {
    dispatch(getSpecificOrder({ orderId }))
  }, [dispatch, orderId])

  const {
    specificOrderData,
    loadingUpdateOrderStatus,
    loadingSpecificOrderData,
  } = useSelector((state) => state.delivery)

  const orderItems = specificOrderData?.order_items
  const statusChangedTo =
    specificOrderData?.status === "Placed" ? "Shipped" : "Delivered"

  const handleStatus = () => {
    dispatch(updateSpecificOrder({ orderId, status: statusChangedTo }))
      .unwrap()
      .then(() => {
        toast.success(t(`updated-${statusChangedTo}`), {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: themeMode,
        })
        navigate("/delivery-control-panel")
      })
  }

  const InfoRow = ({ icon, label, value }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        mb: 2,
        p: 2,
        borderRadius: 2,
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(251, 191, 36, 0.05)"
            : "rgba(245, 158, 11, 0.05)",
      }}
    >
      {icon}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: (theme) =>
              theme.palette.mode === "dark" ? "#fbbf24" : "#f59e0b",
            mb: 0.5,
          }}
        >
          {label}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  )

  return (
    <PageContainer>
      {loadingSpecificOrderData ? (
        <EmptyStateBox>
          <LoadingFetching>{t("wait-order")}</LoadingFetching>
        </EmptyStateBox>
      ) : (
        <>
          <AppbarHeader
            data-aos="fade-up"
            style={{ color: mymode === "dark" ? "#fbbf24" : "black" }}
          >
            {t("order-details")}
          </AppbarHeader>

          {/* Order Summary Section */}
          <Paper
            elevation={2}
            data-aos="fade-up"
            data-aos-delay="100"
            sx={{
              p: 3,
              mb: 3,
              border: (theme) =>
                `1px solid ${
                  theme.palette.mode === "dark"
                    ? "rgba(251, 191, 36, 0.15)"
                    : "rgba(245, 158, 11, 0.15)"
                }`,
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(251, 191, 36, 0.05) 0%, rgba(245, 158, 11, 0.02) 100%)"
                  : "linear-gradient(135deg, rgba(245, 158, 11, 0.03) 0%, rgba(217, 119, 6, 0.01) 100%)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "#fbbf24" : "#f59e0b",
                }}
              >
                {t("order-summary")}
              </Typography>
              <Chip
                label={specificOrderData?.status}
                color={
                  specificOrderData?.status === "Delivered"
                    ? "success"
                    : specificOrderData?.status === "Shipped"
                    ? "info"
                    : "warning"
                }
                icon={<LocalShippingIcon />}
              />
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <InfoRow
                  icon={<AttachMoneyIcon sx={{ color: "#f59e0b" }} />}
                  label={t("total-price-order")}
                  value={`${specificOrderData?.total_price}$`}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoRow
                  icon={<LocationOnIcon sx={{ color: "#f59e0b" }} />}
                  label={t("governorate")}
                  value={specificOrderData?.pickup_address?.governorate}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoRow
                  icon={<LocationOnIcon sx={{ color: "#f59e0b" }} />}
                  label={t("city")}
                  value={specificOrderData?.pickup_address?.city}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoRow
                  icon={<LocationOnIcon sx={{ color: "#f59e0b" }} />}
                  label={t("full-order-address")}
                  value={specificOrderData?.pickup_address?.address}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Products Section */}
          {orderItems?.map(
            ({ quantity, unit_price, product, stores }, index) => (
              <Paper
                key={index}
                elevation={2}
                data-aos="fade-up"
                data-aos-delay={200 + index * 100}
                sx={{
                  p: 3,
                  mb: 3,
                  border: (theme) =>
                    `1px solid ${
                      theme.palette.mode === "dark"
                        ? "rgba(251, 191, 36, 0.15)"
                        : "rgba(245, 158, 11, 0.15)"
                    }`,
                  background: (theme) =>
                    theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, rgba(251, 191, 36, 0.05) 0%, rgba(245, 158, 11, 0.02) 100%)"
                      : "linear-gradient(135deg, rgba(245, 158, 11, 0.03) 0%, rgba(217, 119, 6, 0.01) 100%)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 3,
                    fontWeight: 700,
                    color: (theme) =>
                      theme.palette.mode === "dark" ? "#fbbf24" : "#f59e0b",
                  }}
                >
                  {t("product-details")}
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <CardMedia
                      component="img"
                      image={product?.cover_image}
                      alt={product?.name}
                      sx={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                        borderRadius: 2,
                        boxShadow: (theme) =>
                          theme.palette.mode === "dark"
                            ? "0 4px 12px rgba(251, 191, 36, 0.1)"
                            : "0 4px 12px rgba(245, 158, 11, 0.1)",
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={8}>
                    <Box sx={{ mb: 3 }}>
                      <InfoRow
                        icon={null}
                        label={t("product-name")}
                        value={product?.name}
                      />
                      <InfoRow
                        icon={null}
                        label={t("product-brand")}
                        value={product?.brand}
                      />
                      <InfoRow
                        icon={null}
                        label={t("product-quantity")}
                        value={quantity}
                      />
                      <InfoRow
                        icon={null}
                        label={t("product-price")}
                        value={`${unit_price}$`}
                      />
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: (theme) =>
                          theme.palette.mode === "dark" ? "#fbbf24" : "#f59e0b",
                      }}
                    >
                      <StorefrontIcon />
                      {stores.length > 1
                        ? t("stores-details")
                        : t("store-details")}
                    </Typography>

                    {stores?.map(({ store }, storeIndex) => (
                      <Box
                        key={storeIndex}
                        sx={{
                          mb: 2,
                          p: 2,
                          borderRadius: 2,
                          border: (theme) =>
                            `1px solid ${
                              theme.palette.mode === "dark"
                                ? "rgba(251, 191, 36, 0.2)"
                                : "rgba(245, 158, 11, 0.2)"
                            }`,
                          background: (theme) =>
                            theme.palette.mode === "dark"
                              ? "rgba(251, 191, 36, 0.03)"
                              : "rgba(245, 158, 11, 0.03)",
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600, mb: 0.5 }}
                            >
                              {t("store-name")}
                            </Typography>
                            <Typography variant="body1">
                              {store?.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600, mb: 0.5 }}
                            >
                              {t("store-city")}
                            </Typography>
                            <Typography variant="body1">
                              {store?.city}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600, mb: 0.5 }}
                            >
                              {t("store-governorate")}
                            </Typography>
                            <Typography variant="body1">
                              {store?.governorate}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600, mb: 0.5 }}
                            >
                              {t("store-address")}
                            </Typography>
                            <Typography variant="body1">
                              {store?.address}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    ))}
                  </Grid>
                </Grid>
              </Paper>
            )
          )}

          {/* Action Button */}
          <Button
            variant={themeMode === "dark" ? "contained" : "outlined"}
            color="primary"
            fullWidth
            size="large"
            disabled={loadingUpdateOrderStatus}
            onClick={handleStatus}
            data-aos="fade-up"
            sx={{
              py: 2,
              fontSize: "1.1rem",
              fontWeight: 600,

              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: (theme) =>
                  theme.palette.mode === "dark"
                    ? "0 8px 24px rgba(251, 191, 36, 0.3)"
                    : "0 8px 24px rgba(245, 158, 11, 0.2)",
              },
              transition: "all 0.3s ease",
            }}
          >
            {t(`change-${statusChangedTo}`)}
          </Button>
        </>
      )}
    </PageContainer>
  )
}

export default SpecificOrder
