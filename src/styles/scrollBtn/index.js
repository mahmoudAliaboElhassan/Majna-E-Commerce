import { IconButton } from "@material-ui/core";
import { styled } from "@mui/material/styles";

import { Colors } from "../theme";

export const ScrollButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#7f2545",
  color: Colors.white,
  borderRadius: "50%",
  padding: "5px",
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#7f2545",
    opacity: 0.8,
  },
}));
