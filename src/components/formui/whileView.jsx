import React from "react";

import { motion } from "framer-motion";
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
import { useInView } from "react-intersection-observer";

const WhileView = () => {
  const { ref, inView } = useInView({ triggerOnce: true });
  console.log("ref is");
  console.log(ref);
  console.log("in view");
  console.log(inView);
  return (
    <div
      style={{
        // height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <motion.div
        ref={ref}
        initial={{ y: -30, opacity: 0 }}
        // animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7 }}
        whileInView={{ y: 0, opacity: 1 }}
        // style={{ marginBottom: "5px" }}
      >
        <Box> Content coming from the bottom</Box>
      </motion.div>
    </div>
  );
};

export default WhileView;
