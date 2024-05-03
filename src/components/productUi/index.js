import { useState } from "react";

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
} from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import Image from "../../assests/image-1.jpg";
import { Colors } from "@styles/theme";
import UseThemMode from "@hooks/use-theme";
import { addToCart } from "@state/slices/cart";

const Product = ({ idx }) => {
  const dispatch = useDispatch();
  const { themeMode } = UseThemMode();
  const { ref, inView } = useInView({ triggerOnce: false });

  return (
    <Grid item xs={12} sm={6} md={4} key={idx}>
      <motion.div
        ref={ref}
        initial={{ x: 50, opacity: 0 }}
        // animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        whileInView={{ x: 0, opacity: 1 }}
        // viewport={{ amount: 0.6, once: false }}
        // transition={{ delay: idx * 0.5, duration: 2 }}
        style={{
          border: `1px solid ${
            themeMode === "dark" ? Colors.light_gray : Colors.shaft
          }`,
          borderRadius: "12px",
        }}
      >
        <Box>
          <Card raised>
            <CardMedia
              image={Image}
              title="Random Image"
              style={{ height: "180px", borderRadius: "12px" }}
              component="img"
              loading="lazy"
              alt="Random Image"
            />
            <CardContent>
              <Typography variant="h4">Heading</Typography>{" "}
              <Typography variant="subtitle1">
                Description this is is mata;
              </Typography>
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
                onClick={() => dispatch(addToCart(idx))}
              >
                Add to Card
              </Button>
            </CardActions>
          </Card>
        </Box>
      </motion.div>{" "}
    </Grid>
  );
};
export default Product;
