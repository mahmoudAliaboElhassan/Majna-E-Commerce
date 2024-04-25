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

function ProductTypesSidebar() {
  const { productTypes } = UseProductTypes();
  const [active, setActive] = useState(null);
  const { themeMode } = UseThemMode();
  const { Direction } = UseDirection();

  return (
    <div>
      <div open={true} variant="persistent" anchor={Direction.left}>
        <List
          sx={{
            backgroundColor:
              themeMode === "dark" ? Colors.lightblack : Colors.primary,
            height: "100vh",
            zIndex: 2,
            color: "white",
          }}
        >
          {productTypes &&
            productTypes.map((product, index) => (
              <>
                <h3
                  style={{ color: "white", cursor: "pointer", padding: "5px" }}
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
              </>
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
        </List>
      </div>
    </div>
  );
}

export default ProductTypesSidebar;
