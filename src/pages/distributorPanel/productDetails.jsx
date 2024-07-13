import React, { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { ProducDetailInfoWrapper, ProducDetailWrapper } from "@styles/products";
import errorImage from "@assets/error.jpg";
import IncDec from "@components/productUi";

function ProductDetails(props) {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [dialogOpen, setDialogOpen] = useState(true);
  const navigate = useNavigate();
  console.log("product details");
  const closeDialog = () => {
    setDialogOpen(false);
  };

  const onAnimationComplete = () => {
    if (!dialogOpen) {
      // If the dialog is closed, navigate away
      navigate("/");
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <Dialog
      component={motion.div}
      initial={{ y: "-100vh", scale: 0.3 }}
      animate={{ y: dialogOpen ? 50 : "-100vh", scale: dialogOpen ? 1 : 0.3 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      exit={{ opacity: 0, x: 100 }}
      onAnimationComplete={onAnimationComplete}
      open={true}
      sx={{
        zIndex: 1,
      }}
    >
      <DialogTitle>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Typography variant="h4">Product Title</Typography>
          <IconButton onClick={closeDialog}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <ProducDetailWrapper matches={isMatch}>
          <img
            src={errorImage}
            alt="Confused Woman"
            className="img-fluid"
            loading="lazy"
          />{" "}
          <ProducDetailInfoWrapper>
            <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
              123.00$
            </Typography>
            <Typography variant="subtitle1">
              Availability 5 in the store
            </Typography>
            <Typography sx={{ lineHeight: 2 }} variant="h4">
              Product Name
            </Typography>{" "}
            <Typography variant="description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              cumque inventore similique facere iusto velit porro, nisi
              temporibus dolore itaque dignissimos nobis at reprehenderit odit
              fugiat non ab quasi ipsa.
            </Typography>
            <IncDec />
          </ProducDetailInfoWrapper>
        </ProducDetailWrapper>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetails;
