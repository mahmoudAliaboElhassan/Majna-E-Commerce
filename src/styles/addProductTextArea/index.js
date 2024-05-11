import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";

import UseThemMode from "@hooks/use-theme";

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};
export const Textarea = styled(TextareaAutosize)(() => {
  const { themeMode } = UseThemMode();
  return {
    boxSizing: "border-box",
    width: "100%",
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: "0.875rem",
    fontWeight: "400",
    lineHeight: "1.5",
    padding: "8px 12px",
    borderRadius: "8px",
    color: themeMode === "dark" ? grey[300] : grey[900],
    background: themeMode === "dark" ? grey[900] : "#fff",
    border: `1px solid ${themeMode === "dark" ? grey[700] : grey[200]}`,
    boxShadow: `0px 2px 2px ${themeMode === "dark" ? grey[900] : grey[50]}`,

    "&:hover::before": {
      borderColor: `${blue[400]}`,
    },
    "&:focus": {
      borderColor: `${blue[400]}`,
      boxShadow: `0 0 0 3px ${themeMode === "dark" ? blue[600] : blue[200]}`,
    },
    // firefox
    "&:focus-visible": {
      outline: 0,
    },
  };
});
