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
function RootProductList() {
  return (
    <div>
      <Grid container>
        <Grid item xs={2} md={2} lg={2}>
          <div style={{ width: "20%", height: "100vh" }}>root product list</div>
        </Grid>
        <Grid item xs={10} md={10} lg={10}>
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
}

export default RootProductList;
