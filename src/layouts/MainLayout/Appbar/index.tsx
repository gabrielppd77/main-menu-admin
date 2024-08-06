import React from "react";

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";

import useMenuStore from "@hooks/useMenuStore";
import useAuth from "@hooks/useAuth";

export default function Appbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { toggleOpen } = useMenuStore();
  const { setToken } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    setToken("");
    navigate("/");
  }

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        bgcolor: "primary.light",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              color: "primary.contrastText",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton onClick={toggleOpen}>
              <MenuIcon />
            </IconButton>
            <Link
              to="/home"
              style={{
                textDecoration: "none",
              }}
            >
              <Typography sx={{ color: "primary.contrastText" }}>
                Main Menu
              </Typography>
            </Link>
          </Box>

          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(event) => setAnchorEl(event.currentTarget)}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
