import { Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import UseThemeMode from "@hooks/use-theme"
import UseDirection from "@hooks/use-direction"

const StyledLabel = styled("label")(({ theme, themeMode }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  cursor: "pointer",
  padding: "12px 14px",
  margin: "6px 0",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  backgroundColor:
    themeMode === "dark" ? "rgba(30, 41, 59, 0.4)" : "rgba(248, 250, 252, 0.6)",
  border: `1px solid ${
    themeMode === "dark" ? "rgba(251, 191, 36, 0.1)" : "rgba(245, 158, 11, 0.1)"
  }`,
  gap: "12px",
  minHeight: "46px", // Ensures consistent height

  "&:hover": {
    backgroundColor:
      themeMode === "dark" ? "rgba(30, 41, 59, 0.7)" : "rgba(248, 250, 252, 1)",
    borderColor:
      themeMode === "dark"
        ? "rgba(251, 191, 36, 0.3)"
        : "rgba(245, 158, 11, 0.3)",
    transform: "translateX(4px)",
    boxShadow:
      themeMode === "dark"
        ? "0 2px 8px rgba(251, 191, 36, 0.1)"
        : "0 2px 8px rgba(245, 158, 11, 0.1)",
  },

  "& input[type='radio']": {
    position: "absolute",
    opacity: 0,
    cursor: "pointer",
    width: 0,
    height: 0,
  },

  "& input[type='radio']:checked ~ .checkmark": {
    background:
      themeMode === "dark"
        ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
        : "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
    borderColor: themeMode === "dark" ? "#fbbf24" : "#f59e0b",
    boxShadow:
      themeMode === "dark"
        ? "0 0 0 3px rgba(251, 191, 36, 0.2), 0 2px 8px rgba(251, 191, 36, 0.3)"
        : "0 0 0 3px rgba(245, 158, 11, 0.2), 0 2px 8px rgba(245, 158, 11, 0.25)",

    "&::after": {
      display: "block",
      transform: "translate(-50%, -50%) scale(1)",
    },
  },

  "& input[type='radio']:checked ~ span:not(.checkmark)": {
    color: themeMode === "dark" ? "#fbbf24" : "#f59e0b",
    fontWeight: 600,
  },
}))

const Checkmark = styled("span")(({ theme, themeMode, color }) => ({
  position: "relative",
  height: "22px",
  top: "9px",
  width: "22px",
  minWidth: "22px",
  maxWidth: "22px",
  flexShrink: 0,
  backgroundColor: color || (themeMode === "dark" ? "#2d2d2d" : "#ffffff"),
  borderRadius: "50%",
  border: `2px solid ${
    themeMode === "dark" ? "#404040" : "rgba(71, 85, 105, 0.3)"
  }`,
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "center", // Ensures vertical centering

  "&::after": {
    content: '""',
    position: "absolute",
    display: "none",
    top: "50%",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
    transform: "translate(-50%, -50%) scale(0)",
    transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  },
}))

const Input = ({ handleChange, value, title, name, color, isCheck }) => {
  const { themeMode } = UseThemeMode()
  const { Direction } = UseDirection()
  return (
    <StyledLabel themeMode={themeMode} className="sidebar-label-container">
      <input
        onChange={handleChange}
        type="radio"
        value={value}
        name={name}
        checked={isCheck}
      />
      <Checkmark className="checkmark" themeMode={themeMode} color={color} />
      <Typography
        component="span"
        sx={{
          fontSize: { xs: "12px", sm: "13px", md: "14px", lg: "15px" },
          color: themeMode === "dark" ? "#cbd5e1" : "#475569",
          transition: "all 0.3s ease",
          fontWeight: isCheck ? 600 : 400,
          [Direction.marginLeft]: "6px",
          flex: 1,
          lineHeight: "1.4",
          display: "flex",
          alignItems: "center",
          alignSelf: "center", // Ensures vertical centering
        }}
      >
        {title}
      </Typography>
    </StyledLabel>
  )
}

export default Input
