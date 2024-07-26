import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import { Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";
import useMenuStore from "@hooks/useMenuStore";

export default function Appbar() {
  const { toggleOpen } = useMenuStore();

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        bgcolor: "primary.dark",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
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
            <Menu />
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
      </Toolbar>
      <Divider />
    </AppBar>
  );
}
