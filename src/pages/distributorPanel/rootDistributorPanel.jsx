import { useCallback, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "@emotion/react";

import withGuard from "@utils/withGuard";
import { MainBody } from "@styles/reviewer";
import MainDrawer from "@components/shared/mainDrawer";
import { DrawerButton } from "@styles/products";
import UseDistributorElements from "@hooks/use-distributor-elements";

function RootProductLayout() {
  const [open, setOpen] = useState(false);
  const { distributorElements } = UseDistributorElements();
  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  });

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  });
  useEffect(() => { }, [open]);
  const theme = useTheme();

  return (
    <div style={{
      width: "100%",
      position: "relative",
      minHeight: "calc(100vh - 64px)",
      top: "-25px",
      overflow: "hidden"
    }}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {!open && (
          <DrawerButton onClick={handleDrawerOpen}>
            {" "}
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </DrawerButton>
        )}
        <MainDrawer
          open={open}
          handleClose={handleDrawerClose}
          elements={distributorElements}
        />
        <MainBody open={open}>
          <Outlet />
        </MainBody>
      </Box>
    </div>
  );
}
export default (RootProductLayout);
