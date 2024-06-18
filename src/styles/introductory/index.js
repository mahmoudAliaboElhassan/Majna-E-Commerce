import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useTheme } from "@emotion/react";

import { Colors } from "@styles/theme";
import UseThemMode from "@hooks/use-theme";

export const IntroudctoryButton = styled(Button)(() => {
  const { themeMode } = UseThemMode();
  const theme = useTheme();
  return {
    display: "inline-flex",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "1rem",
    backgroundColor: themeMode === "dark" ? "#f5f5f5" : "#333",
    color: themeMode === "dark" ? "#333" : "#fff",
    transition: "background-color 0.3s, color 0.3s",
    "&:hover": {
      backgroundColor: themeMode === "dark" ? "#ddd" : "#2b1f1f",
      color: themeMode === "dark" ? "#333" : "#fff",
    },
    "&:hover .icon": {
      transform:
        theme.direction === "ltr" ? "translateX(3px)" : "translateX(-3px)",
    },
  };
});
