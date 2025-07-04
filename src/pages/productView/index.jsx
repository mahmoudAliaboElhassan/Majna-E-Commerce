import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material"; // Use @mui/material instead of @material-ui/core
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import {
  getSpecifiedProduct,
  cleanUpGetSpecifiedProduct,
} from "@state/slices/products";
import { postCart, postFavorite } from "@state/slices/cart";
import LoadingFetching from "@components/loadingFetching";
import UseThemMode from "@hooks/use-theme";
import UseDirection from "@hooks/use-direction";
import UseToggle from "@hooks/use-toggle";
import { Colors } from "@styles/theme";
import ModalOrder from "@components/modalOrder";
import Footer from "@components/footer";
import "./style.css";
import Reviews from "@components/reviews";

function ProductInformation() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { themeMode } = UseThemMode();
  const { Direction } = UseDirection();
  const { Uid } = useSelector((state) => state.auth);
  const { loadingPostCart, loadingAddtoFavorite, countOfCartItems } =
    useSelector((state) => state.cart);
  const [open_modal_order, toggle] = UseToggle();
  const closeModalOrder = () => toggle(false);
  const { loadingAddOrder } = useSelector((state) => state.customer);
  const { t } = useTranslation();

  const { productData, loadingSpecificProduct } = useSelector(
    (state) => state.products
  );

  let id,
    name,
    brand,
    price,
    category,
    sub_category,
    description,
    inventory,
    added_at,
    album_items,
    stores,
    total_quantity;

  if (productData) {
    ({
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
    } = productData);
    if (inventory) {
      ({ stores, total_quantity } = inventory);
    }
  }

  useEffect(() => {
    dispatch(getSpecifiedProduct({ id: productId }));
    return () => {
      dispatch(cleanUpGetSpecifiedProduct());
    };
  }, [dispatch, productId]);

  const [imgNo, setImgNo] = useState(0);
  const handleImageChange = ({ target: { value } }) => {
    setImgNo(Number(value));
  };

  const handlePostCart = () => {
    if (!countOfCartItems || Number.parseInt(countOfCartItems) < 10) {
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
          });
        })
        .catch((error) => {
          const errorMessages = {
            409: t("error-exist-cart"),
            401: t("error-not-authorized-text"),
            403: t("error-not-customer-text"),
          };

          const errorMessage =
            errorMessages[error.response.status] || error.message;
          Swal.fire({
            title: t("error-adding"),
            text: errorMessage,
            icon: "error",
            confirmButtonText: t("ok"),
          });
        });
    } else {
      Swal.fire({
        title: t("error-adding"),
        text: t("excceeded-10"),
        icon: "error",
        confirmButtonText: t("ok"),
      });
    }
  };

  const handlePostFavorite = () => {
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
        });
      })
      .catch((error) => {
        const errorMessages = {
          401: t("error-not-authorized-text-favorite"),
          403: t("error-not-customer-text-favorite"),
        };

        const errorMessage =
          errorMessages[error.response.status] || error.message;
        Swal.fire({
          title: t("error-adding-favorite"),
          text: errorMessage,
          icon: "error",
          confirmButtonText: t("ok"),
        });
      });
  };

  return (
    <>
      {loadingSpecificProduct ? (
        <LoadingFetching>{t("wait-product")}</LoadingFetching>
      ) : (
        <Container>
          <Card
            raised
            component="div"
            sx={{ maxWidth: "100%", p: 2 }}
            data-aos="fade-up"
          >
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                data-aos="zoom-in"
              >
                <CardMedia
                  component="img"
                  image={album_items?.[imgNo]?.url} // Access the URL using the imgNo index
                  alt={"Product Image"}
                  loading="lazy"
                  height="500"
                  style={{ width: "100%", height: "100vh" }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                data-aos="fade-right"
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    sx={{
                      fontStyle: "italic",
                      letterSpacing: "-2px",
                      textAlign: "center",
                      color: Colors.seconday,
                      marginBottom: "-4px",
                    }}
                  >
                    {name}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="p"
                    gutterBottom
                    sx={{
                      fontSize: {
                        xs: "23px",
                        sm: "19px",
                        md: "20px",
                        lg: "23px",
                      },
                      borderBottom: `1px solid ${
                        themeMode === "dark" ? "white" : "black"
                      }`,
                      py: 2,
                    }}
                  >
                    {description}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="p"
                    gutterBottom
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontWeight: "700" }}>
                      {t("product-brand")}{" "}
                    </span>
                    {brand}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="p"
                    gutterBottom
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontWeight: "700" }}>
                      {t("product-category")}{" "}
                    </span>
                    {category}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="p"
                    gutterBottom
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontWeight: "700" }}>
                      {t("product-subCategory")}{" "}
                    </span>
                    <span style={{ textAlign: `${[Direction.right]}` }}>
                      {sub_category}
                    </span>
                  </Typography>
                  <Typography
                    variant="h6"
                    component="p"
                    gutterBottom
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontWeight: "700" }}>{t("in-store")} </span>
                    <span style={{ textAlign: "center" }}>
                      {" "}
                      {total_quantity ? total_quantity : t("not-exist")}
                    </span>
                  </Typography>
                  <Typography
                    variant="h6"
                    component="p"
                    gutterBottom
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontWeight: "700" }}>
                      {t("product-price")}{" "}
                    </span>
                    {price}$
                  </Typography>
                  <Typography
                    variant="h6"
                    component="p"
                    gutterBottom
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontWeight: "700" }}>
                      {t("data-added")}{" "}
                    </span>
                    <span style={{ textAlign: `${[Direction.right]}` }}>
                      {added_at}
                    </span>
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                  data-aos="fade-up"
                >
                  {album_items?.length > 1 &&
                    album_items?.map(({ url }, idx) => (
                      <Box key={idx} sx={{ m: 1 }}>
                        <input
                          name="image"
                          type="radio"
                          value={idx}
                          id={`image-${idx}`}
                          onChange={handleImageChange}
                          style={{ display: "none" }}
                        />
                        <label
                          htmlFor={`image-${idx}`}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={url}
                            alt={`Thumbnail ${idx}`}
                            loading="lazy"
                            style={{
                              width: "100px",
                              height: "100px",
                              margin: "5px",
                              border:
                                imgNo === idx
                                  ? `3px solid ${
                                      themeMode === "dark" ? "white" : "black"
                                    }`
                                  : null,
                            }}
                          />
                        </label>
                      </Box>
                    ))}
                </Box>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                  data-aos="fade-up"
                >
                  <Button
                    variant={themeMode === "dark" ? "contained" : "outlined"}
                    onClick={handlePostCart}
                    disabled={loadingPostCart}
                    fullWidth
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    {t("add-to-cart")}{" "}
                  </Button>
                  <Button
                    variant={themeMode === "dark" ? "contained" : "outlined"}
                    onClick={handlePostFavorite}
                    disabled={loadingAddtoFavorite}
                    fullWidth
                    sx={{ mx: 2, whiteSpace: "nowrap" }}
                  >
                    {t("add-favorite")}{" "}
                  </Button>
                </CardActions>{" "}
                <Button
                  variant={themeMode === "dark" ? "contained" : "outlined"}
                  onClick={() => toggle()}
                  fullWidth
                  sx={{ mx: 2, whiteSpace: "nowrap" }}
                  disabled={!total_quantity || loadingAddOrder}
                  data-aos="fade-up"
                >
                  {t("add-order")}
                </Button>
              </Grid>
            </Grid>
          </Card>
          <Reviews productId={productId} />
        </Container>
      )}
      <ModalOrder
        openModalOrder={open_modal_order}
        close={closeModalOrder}
        productId={productId}
        maxNumber={total_quantity}
        price={price}
        productName={name}
      />
      <Footer />{" "}
    </>
  );
}

export default ProductInformation;
