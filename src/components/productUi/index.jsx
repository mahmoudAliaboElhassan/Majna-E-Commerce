import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import Image from "../../assests/image-1.jpg";
import { Colors } from "@styles/theme";
import UseThemMode from "@hooks/use-theme";
import { addToCart } from "@state/slices/cart";

const Product = ({ id, title, image, max, quantity }) => {
  const dispatch = useDispatch();

  const currentRemaining = max - (quantity ?? 0);
  const disabledBtn = currentRemaining <= 0 ? true : false;
  const { themeMode } = UseThemMode();
  const { ref, inView } = useInView({ triggerOnce: false });
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const handleBtnClick = (id) => {
    dispatch(addToCart(id));
    setIsBtnDisabled(true);
  };
  useEffect(() => {
    if (!isBtnDisabled) return;
    setIsBtnDisabled(true);
    const debounce = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);
    return () => clearTimeout(debounce);
  }, [isBtnDisabled]);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
      <motion.div
        ref={ref}
        initial={{ x: 50, opacity: 0 }}
        transition={{ duration: 0.5 }}
        whileInView={{ x: 0, opacity: 1 }}
        style={{
          border: `1px solid ${
            themeMode === "dark" ? Colors.light_gray : Colors.shaft
          }`,
          borderRadius: "12px",
          width: "100%",
          maxWidth: isSmallScreen ? "300px" : "initial",
          // height: isSmallScreen ? "120px" : "180px"
          margin: "auto",
        }}
      >
        <Box>
          <Card raised>
            <CardMedia
              image={image}
              title="Random Image"
              style={{
                height: isSmallScreen ? "120px" : "180px",
                borderRadius: "12px",
              }}
              component="img"
              loading="lazy"
              alt="Random Image"
            />
            <CardContent>
              <Typography variant="h4">Heading</Typography>{" "}
              <Typography variant="subtitle1">{title} </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Button
                variant="success"
                size="small"
                component={Link}
                to={{
                  pathname: "/product/3",
                }}
              >
                View
              </Button>{" "}
              <Button
                variant="success"
                size="small"
                onClick={() => handleBtnClick(id)}
                disabled={isBtnDisabled || disabledBtn}
              >
                {isBtnDisabled ? "loading" : "add to cart"}
              </Button>
            </CardActions>
            <p> Maximum Number is {max}</p>
            <p> quantity taken is {quantity}</p>
            <p> remaining is {currentRemaining}</p>
          </Card>
        </Box>
      </motion.div>{" "}
    </Grid>
  );
};
export default Product;
