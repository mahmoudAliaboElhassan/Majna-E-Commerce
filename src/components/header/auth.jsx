import { IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import UseDirection from "@hooks/use-direction";

function AuthMenu({ 
  anchorElSign, 
  openSign, 
  handleClickSign, 
  handleCloseSign, 
  authElements, 
  handleClickAuth 
}) {
  const { t } = useTranslation();
  const { mymode } = useSelector((state) => state.mode);
  const { Direction } = UseDirection();

  // Dynamic styling based on theme
  const iconButtonStyle = {
    padding: "8px 12px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    background: mymode === "dark" 
      ? "rgba(251, 191, 36, 0.1)" 
      : "rgba(245, 158, 11, 0.1)",
    "&:hover": {
      background: mymode === "dark"
        ? "rgba(251, 191, 36, 0.2)"
        : "rgba(245, 158, 11, 0.2)",
      transform: "translateY(-2px)",
    },
  };

  const iconColor = mymode === "dark" ? "#fbbf24" : "#f59e0b";

  const menuStyle = {
    "& .MuiPaper-root": {
      borderRadius: "12px",
      marginTop: "8px",
      minWidth: "220px",
      background: mymode === "dark" ? "#1e293b" : "#ffffff",
      border: `1px solid ${
        mymode === "dark" 
          ? "rgba(251, 191, 36, 0.2)" 
          : "rgba(245, 158, 11, 0.2)"
      }`,
      boxShadow: mymode === "dark"
        ? "0 8px 24px rgba(251, 191, 36, 0.15)"
        : "0 8px 24px rgba(245, 158, 11, 0.15)",
    },
  };

  const menuItemStyle = {
    padding: "12px 20px",
    fontSize: "15px",
    fontWeight: 500,
    color: mymode === "dark" ? "#f1f5f9" : "#0f172a",
    transition: "all 0.2s ease",
    borderRadius: "6px",
    margin: "4px 8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    "&:hover": {
      background: mymode === "dark"
        ? "rgba(251, 191, 36, 0.15)"
        : "rgba(245, 158, 11, 0.1)",
      transform: "translateX(4px)",
      "& .auth-icon": {
        transform: "scale(1.1)",
        color: mymode === "dark" ? "#fbbf24" : "#f59e0b",
      },
    },
  };

  const iconStyle = {
    fontSize: "20px",
    color: mymode === "dark" ? "#cbd5e1" : "#64748b",
    transition: "all 0.2s ease",
  };

  const logoutItemStyle = {
    ...menuItemStyle,
    "&:hover": {
      background: mymode === "dark"
        ? "rgba(239, 68, 68, 0.15)"
        : "rgba(220, 38, 38, 0.1)",
      transform: "translateX(4px)",
      color: mymode === "dark" ? "#fca5a5" : "#dc2626",
      "& .auth-icon": {
        transform: "scale(1.1)",
        color: mymode === "dark" ? "#ef4444" : "#dc2626",
      },
    },
  };

  const getMenuItemIcon = (label) => {
    if (label === t("logout")) {
      return <LogoutIcon className="auth-icon" sx={iconStyle} />;
    } else if (label === t("login")) {
      return <LoginIcon className="auth-icon" sx={iconStyle} />;
    }
    return null;
  };

  return (
    <>
      <IconButton
        variant="h6"
        component="button"
        onClick={handleClickSign}
        sx={iconButtonStyle}
      >
        <AccountCircleIcon
          sx={{ color: iconColor, fontSize: "24px" }}
        />
        <ArrowDropDownIcon
          fontSize="small"
          sx={{ 
            color: iconColor,
            transition: "transform 0.3s ease",
            transform: openSign ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </IconButton>

      <Menu
        anchorEl={anchorElSign}
        open={openSign}
        onClose={handleCloseSign}
        sx={menuStyle}
        transformOrigin={{
          vertical: "top",
          horizontal: Direction.direction === "rtl" ? "right" : "left",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: Direction.direction === "rtl" ? "right" : "left",
        }}
      >
        {authElements.map((authel, index) => (
          <MenuItem
            key={index}
            component={Link}
            {...authel}
            onClick={() => {
              handleClickAuth(authel, index);
            }}
            sx={authel.label === t("logout") ? logoutItemStyle : menuItemStyle}
          >
            <span style={{ fontWeight: 500 }}>
              {authel.label}
            </span>
            {getMenuItemIcon(authel.label)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default AuthMenu;