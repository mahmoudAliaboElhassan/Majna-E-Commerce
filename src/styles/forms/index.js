export const cardStyles = (themeMode) => ({
  background:
    themeMode === "light"
      ? "#ffffff"
      : "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
  borderRadius: "16px",
  boxShadow:
    themeMode === "light"
      ? "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)"
      : "0 8px 32px rgba(0, 0, 0, 0.6), 0 2px 8px rgba(251, 191, 36, 0.1)",
  border: `1px solid ${
    themeMode === "light" ? "#e5e7eb" : "rgba(251, 191, 36, 0.15)"
  }`,
  overflow: "hidden",
})

export const headerBoxStyles = (themeMode) => ({
  background:
    themeMode === "light"
      ? "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)"
      : "linear-gradient(135deg, #292524 0%, #1c1917 100%)",
  borderBottom: `2px solid ${themeMode === "light" ? "#f59e0b" : "#fbbf24"}`,
  py: 2,
  px: 3,
  textAlign: "center",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background:
      themeMode === "light"
        ? "linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b)"
        : "linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24)",
  },
})

export const formWrapperStyles = {
  py: 2.5,
  px: 3,
}
