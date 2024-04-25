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


import ProductTypesSidebar from "@components/productList/productTypesSidebar";
function RootProductList() {
  return (
    <div>
      <Grid container>
        <Grid item xs={3} md={3} lg={3}>
          <ProductTypesSidebar />
        </Grid>
        <Grid item xs={9} md={9} lg={9}>
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
}

export default RootProductList;
