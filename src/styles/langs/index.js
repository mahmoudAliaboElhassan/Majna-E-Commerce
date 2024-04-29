import styled from "@emotion/styled";
import { Box, MenuItem } from "@mui/material";

import { Colors } from "@styles/theme";

export const MenuItemElement = styled(MenuItem)(() => ({
  p: 1,
  display: "flex",
  alignItems: "center",
  width:"120px",
  justifyContent: "space-between",
  transition: "0.3s",
  borderRadius:"5px",
  "&:hover": {
    
    transform: "translateX(-8px)",
  },
}));
