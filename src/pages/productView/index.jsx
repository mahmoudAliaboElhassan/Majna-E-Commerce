import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  Stack,
} from "@mui/material"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Swal from "sweetalert2"

import {
  getSpecifiedProduct,
  cleanUpGetSpecifiedProduct,
} from "@state/slices/products"
import { postCart, postFavorite } from "@state/slices/cart"
import LoadingFetching from "@components/loadingFetching"
import UseThemMode from "@hooks/use-theme"
import UseDirection from "@hooks/use-direction"
import UseToggle from "@hooks/use-toggle"
import { Colors } from "@styles/theme"
import ModalOrder from "@components/modalOrder"
import Footer from "@components/footer"
import Reviews from "@components/reviews"
import "./style.css"

function ProductInformation() {
  const dispatch = useDispatch()
  const { productId } = useParams()
  const { themeMode } = UseThemMode()
  const { Direction } = UseDirection()
  const { t } = useTranslation()

  // Selectors
  const { Uid } = useSelector((state) => state.auth)
  const { loadingPostCart, loadingAddtoFavorite, countOfCartItems } =
    useSelector((state) => state.cart)
  const { loadingAddOrder } = useSelector((state) => state.customer)
  const { productData, loadingSpecificProduct } = useSelector(
    (state) => state.products
  )

  // Local state
  const [imgNo, setImgNo] = useState(0)
  const [open_modal_order, toggle] = UseToggle()

  // Destructure product data
  const {
    id,
    name,
    brand,
    price,
    category,
    sub_category,
    description,
    inventory,
    added_at,
    album_items,
  } = productData || {}

  const { stores, total_quantity } = inventory || {}

  // Effects
  useEffect(() => {
    dispatch(getSpecifiedProduct({ id: productId }))
    return () => {
      dispatch(cleanUpGetSpecifiedProduct())
    }
  }, [dispatch, productId])

  // Handlers
  const handleImageChange = ({ target: { value } }) => {
    setImgNo(Number(value))
  }

  const closeModalOrder = () => toggle(false)

  const showErrorAlert = (title, text) => {
    Swal.fire({
      title,
      text,
      icon: "error",
      confirmButtonText: t("ok"),
    })
  }

  const showSuccessToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: themeMode,
    })
  }

  const handlePostCart = () => {
    if (!countOfCartItems || Number.parseInt(countOfCartItems) < 10) {
      dispatch(postCart({ customerId: Uid, product_ids: [id] }))
        .unwrap()
        .then(() => showSuccessToast(t("added-success")))
        .catch((error) => {
          const errorMessages = {
            409: t("error-exist-cart"),
            401: t("error-not-authorized-text"),
            403: t("error-not-customer-text"),
          }
          const errorMessage =
            errorMessages[error.response?.status] || error.message
          showErrorAlert(t("error-adding"), errorMessage)
        })
    } else {
      showErrorAlert(t("error-adding"), t("excceeded-10"))
    }
  }

  const handlePostFavorite = () => {
    dispatch(postFavorite({ customerId: Uid, product_ids: [id] }))
      .unwrap()
      .then(() => showSuccessToast(t("favorite-success")))
      .catch((error) => {
        const errorMessages = {
          401: t("error-not-authorized-text-favorite"),
          403: t("error-not-customer-text-favorite"),
        }
        const errorMessage =
          errorMessages[error.response?.status] || error.message
        showErrorAlert(t("error-adding-favorite"), errorMessage)
      })
  }

  // Render loading state
  if (loadingSpecificProduct) {
    return <LoadingFetching>{t("wait-product")}</LoadingFetching>
  }

  // Component renders
  const ProductDetail = ({ label, value }) => (
    <Typography
      variant="h6"
      component="p"
      gutterBottom
      sx={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
        gap: 2,
        py: 0.5,
      }}
    >
      <span style={{ fontWeight: "700" }}>{label}</span>
      <span style={{ textAlign: Direction.right, wordBreak: "break-word" }}>
        {value}
      </span>
    </Typography>
  )

  const ImageThumbnail = ({ url, idx }) => (
    <Box key={idx} sx={{ m: { xs: 0.5, sm: 1 } }}>
      <input
        name="image"
        type="radio"
        value={idx}
        id={`image-${idx}`}
        onChange={handleImageChange}
        checked={imgNo === idx}
        style={{ display: "none" }}
      />
      <label htmlFor={`image-${idx}`} style={{ cursor: "pointer" }}>
        <Box
          component="img"
          src={url}
          alt={`Thumbnail ${idx}`}
          loading="lazy"
          sx={{
            width: { xs: "60px", sm: "80px", md: "100px" },
            height: { xs: "60px", sm: "80px", md: "100px" },
            objectFit: "cover",
            borderRadius: "8px",
            border:
              imgNo === idx
                ? `3px solid ${themeMode === "dark" ? "#fff" : "#000"}`
                : `1px solid ${themeMode === "dark" ? "#444" : "#ddd"}`,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: 3,
            },
          }}
        />
      </label>
    </Box>
  )

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Card
          raised
          component="div"
          sx={{
            maxWidth: "100%",
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: { xs: 2, md: 3 },
            boxShadow:
              themeMode === "dark"
                ? "0 8px 32px rgba(0,0,0,0.4)"
                : "0 8px 32px rgba(0,0,0,0.1)",
          }}
          data-aos="fade-up"
        >
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {/* Product Image Section */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {/* Main Image */}
              <Box
                sx={{
                  width: "100%",
                  height: {
                    xs: "300px",
                    sm: "400px",
                    md: "500px",
                    lg: "600px",
                  },
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: 3,
                }}
                data-aos="zoom-in"
              >
                <CardMedia
                  component="img"
                  image={album_items?.[imgNo]?.url}
                  alt={name || "Product Image"}
                  loading="lazy"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>

              {/* Thumbnail Images */}
              {album_items?.length > 1 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", sm: "flex-start" },
                    flexWrap: "wrap",
                    gap: { xs: 0.5, sm: 1 },
                  }}
                  data-aos="fade-up"
                >
                  {album_items.map(({ url }, idx) => (
                    <ImageThumbnail key={idx} url={url} idx={idx} />
                  ))}
                </Box>
              )}
            </Grid>

            {/* Product Details Section */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 2, sm: 3 },
              }}
              data-aos="fade-left"
            >
              <CardContent sx={{ p: { xs: 0, sm: 1 } }}>
                {/* Product Title */}
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                    textAlign: "center",
                    color: Colors.seconday,
                    mb: 2,
                    letterSpacing: "-0.5px",
                  }}
                >
                  {name}
                </Typography>

                {/* Product Description */}
                <Typography
                  variant="body1"
                  component="p"
                  sx={{
                    fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
                    lineHeight: 1.6,
                    borderBottom: `2px solid ${
                      themeMode === "dark" ? "#444" : "#e0e0e0"
                    }`,
                    pb: 2,
                    mb: 2,
                    color: themeMode === "dark" ? "#ccc" : "#666",
                  }}
                >
                  {description}
                </Typography>

                {/* Product Details */}
                <Stack spacing={1}>
                  <ProductDetail label={t("product-brand")} value={brand} />
                  <ProductDetail
                    label={t("product-category")}
                    value={category}
                  />
                  <ProductDetail
                    label={t("product-subCategory")}
                    value={sub_category}
                  />
                  <ProductDetail
                    label={t("in-store")}
                    value={total_quantity || t("not-exist")}
                  />
                  <ProductDetail
                    label={t("product-price")}
                    value={`${price}$`}
                  />
                  <ProductDetail label={t("data-added")} value={added_at} />
                </Stack>
              </CardContent>

              {/* Action Buttons */}
              <Stack spacing={2} sx={{ mt: "auto" }} data-aos="fade-up">
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{
                    width: "100%",
                    display: "flex",
                    gap: { xs: 0, sm: "10px" },
                  }}
                >
                  <Button
                    variant={themeMode === "dark" ? "contained" : "outlined"}
                    onClick={handlePostCart}
                    disabled={loadingPostCart}
                    fullWidth
                    sx={{
                      py: { xs: 1.5, sm: 1.2 },

                      fontSize: { xs: "0.9rem", sm: "1rem" },
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t("add-to-cart")}
                  </Button>
                  <Button
                    variant={themeMode === "dark" ? "contained" : "outlined"}
                    onClick={handlePostFavorite}
                    disabled={loadingAddtoFavorite}
                    fullWidth
                    sx={{
                      py: { xs: 1.5, sm: 1.2 },
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t("add-favorite")}
                  </Button>
                </Stack>

                <Button
                  variant={themeMode === "dark" ? "contained" : "outlined"}
                  onClick={() => toggle()}
                  fullWidth
                  disabled={!total_quantity || loadingAddOrder}
                  sx={{
                    py: { xs: 1.5, sm: 1.2 },
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  {t("add-order")}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Card>

        {/* Reviews Section */}
        <Box sx={{ mt: { xs: 3, sm: 4, md: 5 } }}>
          <Reviews productId={productId} />
        </Box>
      </Container>

      {/* Modal */}
      <ModalOrder
        openModalOrder={open_modal_order}
        close={closeModalOrder}
        productId={productId}
        maxNumber={total_quantity}
        price={price}
        productName={name}
      />

      {/* Footer */}
      <Footer />
    </>
  )
}

export default ProductInformation
