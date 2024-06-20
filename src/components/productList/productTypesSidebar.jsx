import React, { useState } from "react";

import { motion } from "framer-motion";
import {
  List,
  Drawer,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import { Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

import { Colors } from "@styles/theme";
import UseProductTypes from "@hooks/use-product-types";
import UseDirection from "@hooks/use-direction";
import UseThemMode from "@hooks/use-theme";
import Category from "@components/category";

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

function ProductTypesSidebar() {
  const { productTypes } = UseProductTypes();
  const [active, setActive] = useState(null);
  const { themeMode } = UseThemMode();
  const { Direction } = UseDirection();

  return (
    <div
      open={true}
      variant="persistent"
      anchor={Direction.left}
      style={{
        height: "100%",
        backgroundColor: themeMode === "light" ? "#ddd" : "#2b1f1f",
        [Direction.borderRight]: `2px solid ${
          themeMode == "dark" ? Colors.light_gray : Colors.shaft
        }`,
        boxShadow: `0 0 0 3px ${themeMode === "dark" ? blue[600] : blue[200]}`,
      }}
    >
      <List
        sx={{
          zIndex: 2,
          // color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <h1 style={{ marginTop: "1.3rem" }}>🛒</h1>
        </div>
        {productTypes &&
          productTypes.map((product, index) => (
            <div key={product.to}>
              <h3
                style={{ cursor: "pointer", padding: "5px" }}
                sx={{ fontSize: { md: "12px", lg: "16px" } }}
                onClick={() => setActive(index)}
                component={Link}
                {...product}
              >
                {product.label}
              </h3>
              <motion.div
                initial={{ height: 0 }}
                transition={{
                  type: "keyframes",
                  ease: "easeInOut",
                  duration: 1.3,
                  delay: 0.7,
                }}
                animate={{
                  opacity: active === index ? 1 : 0,
                  height: active === index ? "auto" : 0,
                }}
              >
                {product.nestedTypes &&
                  product.nestedTypes.map((nestedType, innerIndex) => (
                    <p key={innerIndex}>{nestedType.label}</p>
                  ))}
              </motion.div>
            </div>
          ))}
        {/* <div key={index}>
            <h1 onClick={() => setActive(index)}>{product.label}</h1>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              transition={{
                type: "keyframes",
                ease: "easeInOut",
                duration: 1.3,
                delay: 0.7,
              }}
              animate={{
                opacity: active === index ? 1 : 0,
                height: active === index ? "auto" : 0,
              }}
            >
              {product.nestedTypes &&
                product.nestedTypes.map((nestedType, innerIndex) => (
                  <p key={innerIndex}>{nestedType.label}</p>
                ))}
            </motion.div>
          </div>
          ))} */}
        <Category />
      </List>
    </div>
  );
}

export default ProductTypesSidebar;
