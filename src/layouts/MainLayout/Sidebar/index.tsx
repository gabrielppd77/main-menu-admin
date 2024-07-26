import {
  Box,
  Drawer,
  List,
  Stack,
  Theme,
  Toolbar,
  useMediaQuery,
} from "@mui/material";

import SideItem from "./SideItem";

import useMenuStore from "@hooks/useMenuStore";

import menu from "@store/menu";
import { drawerWidthOpen, drawerWidthClose } from "@store/constants";

export default function Sidebar() {
  const { open, toggleOpen } = useMenuStore();

  const drawerWidth = open ? drawerWidthOpen : drawerWidthClose;

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <Drawer
      open={open}
      variant={isSmallScreen ? "temporary" : "permanent"}
      onClose={toggleOpen}
    >
      <Box
        sx={(theme) => ({
          bgcolor: "primary.dark",
          height: "100%",
          color: "primary.contrastText",
          width: drawerWidth + "px",
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        })}
      >
        <Toolbar />
        <Box
          sx={{
            px: 2,
            py: 1,
          }}
        >
          <List disablePadding>
            <Stack gap={1}>
              {menu.map(({ title, icon, link }) => (
                <SideItem
                  key={link}
                  title={title}
                  icon={icon}
                  link={link}
                  showText={open}
                />
              ))}
            </Stack>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
}
