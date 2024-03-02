import { useTheme } from "@emotion/react";

function UseThemMode() {
  const theme = useTheme();
  const themeMode = theme.palette.mode;
  return { themeMode };
}

export default UseThemMode;
