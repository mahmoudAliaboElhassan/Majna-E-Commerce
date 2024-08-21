import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";

import { Colors } from "@styles/theme";
import UseThemMode from "@hooks/use-theme";

export const IntroudctoryButton = styled(Link)(() => {
  const { themeMode } = UseThemMode();
  const theme = useTheme();
  return {
    display: "inline-flex",
    padding: "0.5rem 1rem",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "1rem",
    marginBottom: "1rem",
    backgroundColor: themeMode === "dark" ? "#333" : "#f5f5f5",
    color: themeMode === "dark" ? "#333" : "#fff",
    transition: "background-color 0.3s, color 0.3s",
    "&:hover": {
      backgroundColor: themeMode === "dark" ? "#2b1f1f" : "#ddd",
      color: themeMode === "dark" ? "#333" : "#fff",
    },
    "&:hover .icon": {
      transform:
        theme.direction === "ltr" ? "translateX(3px)" : "translateX(-3px)",
    },
  };
});
