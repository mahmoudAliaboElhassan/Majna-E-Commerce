import React from "react";

import { Box, IconButton, Typography } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { Colors } from "@styles/theme";

function IncDec() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ my: 1.5 }}
    >
      <IconButton sx={{ borderRadius: 0, background: `${Colors.seconday}` }}>
        <RemoveCircleOutlineIcon fontSize="large" />
      </IconButton>{" "}
      <Typography
        variant="h6"
        sx={{ border: `1px solid ${Colors.seconday}`, py: "9px", px: 2 }}
      >
        6
      </Typography>
      <IconButton sx={{ borderRadius: 0, background: `${Colors.seconday}` }}>
        <AddCircleOutlineIcon fontSize="large" />
      </IconButton>
    </Box>
  );
}

export default IncDec;
