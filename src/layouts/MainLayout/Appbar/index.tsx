import React from "react";

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Avatar,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";

import { useMenuStore } from "@hooks/useMenuStore";
import { useAuth } from "@hooks/useAuth";
import { routePaths } from "@providers/RouterProvider";

export default function Appbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { toggleOpen } = useMenuStore();
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const userName = "Gabriel Domingos";
  const userImage = "rice-and-beans-logo.svg";

  function closeMenu() {
    setAnchorEl(null);
  }

  function handleLogout() {
    setToken("");
    closeMenu();
    navigate(routePaths.initial);
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
            <IconButton color="inherit" onClick={toggleOpen}>
              <MenuIcon />
            </IconButton>
            <Link
              to="/home"
              style={{
                textDecoration: "none",
              }}
            >
              <Typography sx={{ color: "primary.contrastText" }}>
                Rice & Beans Admin
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
              <Avatar
                alt={userName}
                src={userImage}
                sx={{ width: 32, height: 32 }}
              />
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
              onClose={() => closeMenu()}
            >
              <div className="w-60 p-2 py-0">
                <MenuItem
                  onClick={() => {
                    navigate(routePaths.profile);
                    closeMenu();
                  }}
                >
                  Perfil
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>Sair</MenuItem>
              </div>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
