import styled from "@emotion/styled";
import { Box } from "@mui/material";
import UseThemeMode from "@hooks/use-theme";

export const PaymentBoxContainer = styled(Box)(() => {
  const { themeMode } = UseThemeMode();

  return {
    margin: "auto",
    padding: "40px",
    textAlign: "center",
    // color: "white",
    border: `1px solid ${themeMode === "dark" ? "white" : "black"}`,
    margin: "16px",
    borderRadius: "8px",
    // background: "linear-gradient(to top right, #3b82f6, #a855f7)",
  };
});
