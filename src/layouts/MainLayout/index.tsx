import { Box, Theme, Toolbar, useMediaQuery } from "@mui/material";

import { Navigate, Outlet } from "react-router-dom";

import Appbar from "./Appbar";
import Sidebar from "./Sidebar";

import useMenuStore from "@hooks/useMenuStore";
import useAuth from "@hooks/useAuth";

import { drawerWidthClose, drawerWidthOpen } from "@store/constants";

export default function MainLayout() {
  const { token } = useAuth();
  const { open } = useMenuStore();
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const drawerWidth = isSmallScreen
    ? 0
    : open
    ? drawerWidthOpen
    : drawerWidthClose;

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <Box>
      <Appbar />
      <Sidebar />
      <Box
        sx={(theme) => ({
          marginLeft: drawerWidth + "px",
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        })}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
