import React from "react";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslation } from "react-i18next";

import UseReviewerElements from "@hooks/use-reviewer-elements";
import { AppBarReviwer } from "@styles/reviewer";
import UseDirection from "@hooks/use-direction";
import Mode from "@components/mode";
import LanguageSelection from "@components/languages";
import MainDrawer from "@components/shared/mainDrawer";

function SideBarReviewer({ open, handleOpen, handleClose }) {
  const { ReviewerElements } = UseReviewerElements();
  const { Direction } = UseDirection();
  const { t } = useTranslation();

  return (
    <>
      <AppBarReviwer positionReviwer="fixed" open={open} sx={{ width: "100%" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleOpen}
            edge="start"
            sx={{
              [Direction.marginRight]: "16px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {t("reviewer_pg")}
          </Typography>
          <Mode />
          <LanguageSelection />
        </Toolbar>
      </AppBarReviwer>
      <MainDrawer
        open={open}
        handleClose={handleClose}
        elements={ReviewerElements}
      />
    </>
  );
}

export default React.memo(SideBarReviewer);
