import { useState, useEffect } from "react"
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  useMediaQuery,
  CardActionArea,
  IconButton,
  Chip,
  Rating,
} from "@mui/material"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { useInView } from "react-intersection-observer"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Swal from "sweetalert2"
import { useTranslation } from "react-i18next"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"

import { postCart, postFavorite } from "@state/slices/cart"
import UseThemMode from "@hooks/use-theme"
import UseMediaQueryHook from "@hooks/use-media-query"

import "./item.css"

const Product = ({ id, name, cover_image, price, brand }) => {
  const dispatch = useDispatch()
  const { themeMode } = UseThemMode()
  const { ref, inView } = useInView({ triggerOnce: false })
  const [isBtnDisabled, setIsBtnDisabled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const { Uid, token, role } = useSelector((state) => state.auth)
  const [idx, setIdx] = useState(null)
  const { t } = useTranslation()
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"))
  const { loadingPostCart, loadingAddtoFavorite, countOfCartItems } =
    useSelector((state) => state.cart)

  const handleBtnClick = (id) => {
    setIsBtnDisabled(true)
    if (!countOfCartItems || Number.parseInt(countOfCartItems) < 10) {
      setIdx(id)
      dispatch(
        postCart({
          customerId: Uid,
          product_ids: [id],
        })
      )
        .unwrap()
        .then(() => {
          toast.success(t("added-success"), {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: themeMode,
          })
        })
        .catch((error) => {
          const errorMessages = {
            409: t("error-exist-cart"),
            401: t("error-not-authorized-text"),
            403: t("error-not-customer-text"),
          }

          const errorMessage =
            errorMessages[error.response.status] || error.message
          Swal.fire({
            title: t("error-adding"),
            text: errorMessage,
            icon: "error",
            confirmButtonText: t("ok"),
          })
        })
    } else {
      Swal.fire({
        title: t("error-adding"),
        text: t("excceeded-10"),
        icon: "error",
        confirmButtonText: t("ok"),
      })
    }
  }

  const handleFavorite = (id) => {
    setIdx(id)
    dispatch(
      postFavorite({
        customerId: Uid,
        product_ids: [id],
      })
    )
      .unwrap()
      .then(() => {
        toast.success(t("favorite-success"), {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: themeMode,
        })
      })
      .catch((error) => {
        const errorMessages = {
          401: t("error-not-authorized-text-favorite"),
          403: t("error-not-customer-text-favorite"),
        }

        const errorMessage =
          errorMessages[error.response.status] || error.message
        Swal.fire({
          title: t("error-adding-favorite"),
          text: errorMessage,
          icon: "error",
          confirmButtonText: t("ok"),
        })
      })
  }

  useEffect(() => {
    if (!isBtnDisabled) return
    const debounce = setTimeout(() => {
      setIsBtnDisabled(false)
    }, 300)
    return () => clearTimeout(debounce)
  }, [isBtnDisabled])

  const { isMatch } = UseMediaQueryHook()

  // Noon's signature yellow color
  const noonYellow = "#FEEE00"
  const noonDarkYellow = "#E6D400"

  return (
    <Grid item xs={12} lg={3} md={4} sm={6} key={id}>
      <motion.div
        ref={ref}
        initial={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileInView={{ y: 0, opacity: 1 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Card
          sx={{
            maxWidth: { xs: "100%", sm: 345 },
            mx: "auto",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            borderRadius: "12px",
            boxShadow: isHovered
              ? "0 8px 24px rgba(0,0,0,0.12)"
              : "0 2px 8px rgba(0,0,0,0.08)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isHovered ? "translateY(-8px)" : "translateY(0)",
            border: "1px solid",
            borderColor:
              themeMode === "dark"
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.08)",
            position: "relative",
            overflow: "visible",
          }}
        >
          {/* Favorite Button - Top Right */}
          <IconButton
            onClick={() => handleFavorite(id)}
            disabled={loadingAddtoFavorite && idx === id}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 2,
              backgroundColor: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              "&:hover": {
                backgroundColor: "white",
                transform: "scale(1.1)",
              },
              "&:disabled": {
                backgroundColor: "#E0E0E0",
                color: "#999",
              },
              transition: "all 0.2s",
            }}
          >
            {isFavorited ? (
              <FavoriteIcon sx={{ color: "#FF4458", fontSize: "1.3rem" }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: "#666", fontSize: "1.3rem" }} />
            )}
          </IconButton>

          {/* Free Delivery Badge */}
          <Chip
            icon={<LocalShippingIcon sx={{ fontSize: "0.9rem !important" }} />}
            label="Free Delivery"
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              zIndex: 2,
              backgroundColor: noonYellow,
              color: "#000",
              fontWeight: 600,
              fontSize: "0.7rem",
              height: "24px",
              "& .MuiChip-icon": {
                color: "#000",
              },
            }}
          />

          {/* Product Image */}
          <CardActionArea
            component={Link}
            to={`product-view/${id}`}
            sx={{ flexGrow: 0 }}
          >
            <Box
              sx={{
                position: "relative",
                paddingTop: "100%",
                backgroundColor: "#F7F7F7",
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                loading="lazy"
                image={cover_image}
                alt={name}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  padding: "16px",
                  transition: "transform 0.3s ease",
                  transform: isHovered ? "scale(1.05)" : "scale(1)",
                }}
              />
            </Box>
          </CardActionArea>

          {/* Product Details */}
          <CardContent
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              pb: 1,
              px: { xs: 2, sm: 2 },
            }}
          >
            {/* Brand */}
            <Typography
              variant="caption"
              sx={{
                color: themeMode === "dark" ? "#999" : "#666",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                fontSize: "0.7rem",
              }}
            >
              {brand}
            </Typography>

            {/* Product Name */}
            <CardActionArea component={Link} to={`product-view/${id}`}>
              <Typography
                variant="body1"
                component="h3"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: "0.9rem", sm: "0.95rem" },
                  lineHeight: 1.4,
                  height: { xs: "60px", sm: isMatch ? "60px" : "70px" },
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  color: themeMode === "dark" ? "#fff" : "#1a1a1a",
                  mb: 1,
                }}
              >
                {isMatch ? name.slice(0, 50) : name.slice(0, 60)}
                {name.length > (isMatch ? 50 : 60) && "..."}
              </Typography>
            </CardActionArea>

            {/* Rating */}
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}
            >
              <Rating
                value={4.5}
                precision={0.5}
                size="small"
                readOnly
                sx={{ fontSize: "1rem" }}
              />
              <Typography
                variant="caption"
                sx={{ color: "#666", fontSize: "0.75rem" }}
              >
                (128)
              </Typography>
            </Box>

            {/* Price */}
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.15rem", sm: "1.25rem" },
                  color: themeMode === "dark" ? noonYellow : "#000",
                }}
              >
                ${price}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#999",
                  textDecoration: "line-through",
                  fontSize: "0.85rem",
                }}
              >
                ${(price * 1.2).toFixed(2)}
              </Typography>
            </Box>
          </CardContent>

          {/* Action Buttons */}
          <CardActions
            sx={{
              padding: { xs: "12px 16px 16px", sm: "12px 16px 16px" },
              gap: 1,
              display: "flex",
            }}
          >
            {/* Add to Cart Button */}
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleBtnClick(id)}
              disabled={loadingPostCart && idx === id}
              startIcon={<AddShoppingCartIcon />}
              sx={{
                backgroundColor: noonYellow,
                fontWeight: 700,
                textTransform: "none",
                fontSize: { xs: "0.85rem", sm: "0.9rem" },
                borderRadius: "8px",
                py: { xs: 1, sm: 1.2 },
                "&:hover": {
                  backgroundColor: noonDarkYellow,
                },
                "&:disabled": {
                  backgroundColor: "#E0E0E0",
                  color: "#999",
                },
                boxShadow: "none",
              }}
            >
              {t("add-to-cart")}
            </Button>

            {/* View Details Button */}
            <IconButton
              component={Link}
              to={`product-view/${id}`}
              sx={{
                border: "2px solid",
                borderColor:
                  themeMode === "dark" ? "rgba(255,255,255,0.2)" : "#E0E0E0",
                borderRadius: "8px",
                color: themeMode === "dark" ? "#fff" : "#666",
                "&:hover": {
                  backgroundColor:
                    themeMode === "dark" ? "rgba(255,255,255,0.05)" : "#F5F5F5",
                  borderColor: noonYellow,
                },
                transition: "all 0.2s",
              }}
            >
              <RemoveRedEyeIcon />
            </IconButton>
          </CardActions>
        </Card>
      </motion.div>
    </Grid>
  )
}

export default Product
