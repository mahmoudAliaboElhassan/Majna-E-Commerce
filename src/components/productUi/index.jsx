// import { useState, useEffect } from "react";
// import {
//   Typography,
//   Container,
//   Button,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Box,
//   useMediaQuery,
//   CardActionArea,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { useInView } from "react-intersection-observer";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from "sweetalert2";
// import { useTranslation } from "react-i18next";

// import Image from "../../assets/image-1.jpg";
// import { Colors } from "@styles/theme";
// import UseThemMode from "@hooks/use-theme";
// import { postCart } from "@state/slices/cart";
// import "./item.css";

// const Product = ({ id, name, cover_image, price, brand }) => {
//   const dispatch = useDispatch();
//   const { themeMode } = UseThemMode();
//   const { ref, inView } = useInView({ triggerOnce: false });
//   const [isBtnDisabled, setIsBtnDisabled] = useState(false);
//   const { Uid } = useSelector((state) => state.auth);
//   const [idx, setIdx] = useState(null);
//   const handleBtnClick = (id) => {
//     setIdx(id);
//     // console.log("idx");
//     // console.log(idx);
//     // console.log("id");
//     // console.log(id);
//     // console.log(idx === id);
//     dispatch(
//       postCart({
//         customerId: Uid,
//         product_ids: [id],
//       })
//     )
//       .unwrap()
//       .then(() => {
//         {
//           toast.success(t("added-success"), {
//             position: "top-right",
//             autoClose: 1000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: themeMode,
//           });
//         }
//       })
//       .catch((error) => {
//         if (error.response.status === 409) {
//           Swal.fire({
//             title: t("error-adding"),
//             text: t("error-exist-cart"),
//             icon: "error",
//             confirmButtonColor: "#3085d6",
//             confirmButtonText: t("ok"),
//           });
//         } else if (error.response.status === 401) {
//           console.log("Error:", error.message);
//           Swal.fire({
//             title: t("error-adding"),
//             text: t("error-not-authorized-text"),
//             icon: "error",
//             confirmButtonText: t("ok"),
//           });
//         } else if (error.response.status === 403) {
//           console.log("Error:", error.message);
//           Swal.fire({
//             title: t("error-adding"),
//             text: t("error-not-customer-text"),
//             icon: "error",
//             confirmButtonText: t("ok"),
//           });
//         }
//       });
//     setIsBtnDisabled(true);
//   };

//   useEffect(() => {
//     if (!isBtnDisabled) return;
//     const debounce = setTimeout(() => {
//       setIsBtnDisabled(false);
//     }, 300);
//     return () => clearTimeout(debounce);
//   }, [isBtnDisabled]);
//   const { loadingPostCart } = useSelector((state) => state.cart);
//   const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
//   const { t } = useTranslation();
//   return (
//     <Grid item xs={12} sm={6} md={4} key={id}>
//       <ToastContainer />
//       <motion.div
//         ref={ref}
//         initial={{ x: 50, opacity: 0 }}
//         transition={{ duration: 0.5 }}
//         whileInView={{ x: 0, opacity: 1 }}
//       >
//         {/* <Box
//           sx={{
//             border: `1px solid ${
//               themeMode === "dark" ? Colors.light : Colors.dark
//             }`,
//             borderRadius: "8px",
//             transition: "0.4s",
//             // padding: "16px",
//             "&:hover": {
//               boxShadow: "3px 4px 8px rgba(0, 0, 0, 0.2)",
//             },
//           }}
//         >
//           <div className="item">
//             <div className="item-product">
//               <img src={cover_image} alt={name} loading="lazy" />
//             </div>
//             <div className="product-info">
//               <Typography variant="h6" component="p" gutterBottom>
//                 {name.slice(0, 50)}
//               </Typography>
//               <Typography variant="h6" component="p" gutterBottom>
//                 {brand}
//               </Typography>
//             </div>
//             <div className="item-prices">
//               <Typography variant="body1" component="div" color="textPrimary">
//                 {price}$
//               </Typography>
//             </div>
//             <Button
//               variant={themeMode === "dark" ? "contained" : "outlined"}
//               color="primary"
//               onClick={() => handleBtnClick(id)}
//               disabled={loadingPostCart && idx === id}
//               sx={{ marginTop: "8px" }}
//               fullWidth
//             >
//               {t("add-to-cart")}
//             </Button>
//           </div>
//         </Box> */}
//         <Card sx={{ maxWidth: 345 }}>
//           <CardActionArea>
//             <CardMedia
//               component="img"
//               height="140"
//               image={cover_image}
//               alt="green iguana"
//             />
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="div">
//                 {name.slice(0, 20)} ...
//               </Typography>
//               <Typography variant="h6" component="p" gutterBottom>
//                 {brand}
//               </Typography>
//               <Typography variant="body1" component="div" color="textPrimary">
//                 {price}$
//               </Typography>
//             </CardContent>
//           </CardActionArea>
//           <CardActions
//             style={{ display: "flex", justifyContent: "space-between" }}
//           >
//             <Button
//               variant={themeMode === "dark" ? "contained" : "outlined"}
//               color="primary"
//               onClick={() => handleBtnClick(id)}
//               disabled={loadingPostCart && idx === id}
//               fullWidth
//             >
//               {t("add-to-cart")}
//             </Button>
//             <Button
//               variant={themeMode === "dark" ? "contained" : "outlined"}
//               color="primary"
//               fullWidth
//             >
//               {t("view-product")}
//             </Button>
//           </CardActions>
//         </Card>
//       </motion.div>
//     </Grid>
//   );
// };

// export default Product;

import { useState, useEffect } from "react";

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
} from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCardIcon from '@mui/icons-material/AddCard';
import PreviewIcon from '@mui/icons-material/Preview';

import { postCart, postFavorite } from "@state/slices/cart";
import UseThemMode from "@hooks/use-theme";
import "./item.css";

const Product = ({ id, name, cover_image, price, brand }) => {
  const dispatch = useDispatch();
  const { themeMode } = UseThemMode();
  const { ref, inView } = useInView({ triggerOnce: false });
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const { Uid } = useSelector((state) => state.auth);
  const [idx, setIdx] = useState(null);
  const { t } = useTranslation();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { loadingPostCart, loadingAddtoFavorite } = useSelector(
    (state) => state.cart
  );

  const handleBtnClick = (id) => {
    setIdx(id);
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
    setIsBtnDisabled(true);
  };
  const handleFavorite = (id) => {
    setIdx(id);
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
  useEffect(() => {
    if (!isBtnDisabled) return;
    const debounce = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);
    return () => clearTimeout(debounce);
  }, [isBtnDisabled]);

  return (
    <Grid item xs={12} sm={6} md={4} key={id}>
      <ToastContainer />
      <motion.div
        ref={ref}
        initial={{ x: 50, opacity: 0 }}
        transition={{ duration: 0.5 }}
        whileInView={{ x: 0, opacity: 1 }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea component={Link} to={`product-data/${id}`}>
            <CardMedia
              component="img"
              height="140"
              image={cover_image}
              alt={name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name.slice(0, 30)} ...
              </Typography>
              <Typography variant="h6" component="p" gutterBottom>
                {brand}
              </Typography>
              <Typography variant="body1" component="div" color="textPrimary">
                {price}$
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions
            style={{ textAlign: "center", display: "flex", alignItems: "center" }}
          >
            <Grid container spacing={1}>
              <Grid item xs={6} md={6} lg={4}>
                <Button
                  variant={themeMode === "dark" ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => handleBtnClick(id)}
                  disabled={loadingPostCart && idx === id}
                  fullWidth
                // sx={{ whiteSpace: "nowrap" }}  
                >
                  {/* {t("add-to-cart")} */}
                  <AddCardIcon sx={{
                    fontSize: {
                      xs: "1.5em",
                      sm: "1.75em",
                      md: "2em",
                    }
                  }} />
                </Button>
              </Grid>
              <Grid item xs={6} md={6} lg={4}>
                <Button
                  variant={themeMode === "dark" ? "contained" : "outlined"}
                  color="primary"
                  fullWidth
                  component={Link}
                  to={`product-data/${id}`}
                >
                  {/* {t("view-product")} */}
                  <PreviewIcon sx={{
                    fontSize: {
                      xs: "1.5em",
                      sm: "1.75em",
                      md: "2em",
                    }
                  }} />
                </Button>
              </Grid>
              <Grid item xs={12} md={12} lg={4}>
                <Button
                  variant={themeMode === "dark" ? "contained" : "outlined"}
                  color="primary"
                  disabled={loadingAddtoFavorite && idx === id}
                  fullWidth
                  onClick={() => handleFavorite(id)}
                >
                  {/* {t("add-favorite")} */}
                  <FavoriteIcon sx={{
                    fontSize: {
                      xs: "1.5em",
                      sm: "1.75em",
                      md: "2em",
                    }
                  }} />
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </motion.div>
    </Grid>
  );
};

export default Product;
