import { useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";

function UseMediaQueryHook() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return { isMatch };
}

export default UseMediaQueryHook;
