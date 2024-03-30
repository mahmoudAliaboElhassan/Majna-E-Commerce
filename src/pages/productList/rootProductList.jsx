import React from "react";

import { Outlet } from "react-router-dom";
import {
  Typography,
  Button,
  Container,
  Grid,
  Box,
  Card,
  Modal,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";


import ProductTypesSidebar from "../../components/productList/productTypesSidebar";
function RootProductList() {
  return (
    <div>
      <Grid container>
        <Grid item xs={2} md={2} lg={2}>
          <ProductTypesSidebar />
        </Grid>
        <Grid item xs={10} md={10} lg={10}>
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
}

export default RootProductList;
