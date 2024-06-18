import styled from "@emotion/styled";
import { Button } from "@mui/material";

import { Colors } from "@styles/theme";
import UseThemMode from "@hooks/use-theme";

export const IntroudctoryButton = styled(Button)(() => {
  const { themeMode } = UseThemMode();
  return {
    display: "inline-flex",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "1rem",
    backgroundColor: themeMode === "dark" ? "#f5f5f5" : "#333",
    color: themeMode === "dark" ? "#333" : "#fff",
    transition: "0.3s",
    transition:"background-color 0.3s, color 0.3s",
    "&:hover": {
      backgroundColor: themeMode === "dark" ? "#ddd" : "#2b1f1f",
      color: themeMode === "dark" ? "#333" : "#fff",
    },
    "&:hover .icon": {
      transform: "translateX(3px)",
    },
  };
});
