import { useCallback, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";

import withGuard from "../../utils/withGuard";
import SideBarReviewer from "../../components/reviewer/sideBarReviewer";
import { MainBody } from "../../styles/reviewer";

function RootReviewerLayout() {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  });

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  });
  useEffect(() => {}, [open]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <SideBarReviewer
        open={open}
        handleOpen={handleDrawerOpen}
        handleClose={handleDrawerClose}
      />
      <MainBody open={open}>
        <Outlet />
      </MainBody>
    </Box>
  );
}
export default withGuard(RootReviewerLayout);
