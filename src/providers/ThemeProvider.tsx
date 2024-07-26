import { ThemeProvider as ThemeProviderMain, createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        color: "primary",
        variant: "contained",
        size: "small",
        style: { textTransform: "none" },
      },
    },
    MuiFab: {
      defaultProps: {
        style: { textTransform: "none" },
      },
    },
    MuiIcon: {
      defaultProps: {
        fontSize: "small",
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
        color: "primary",
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        fullWidth: true,
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: 8,
        },
      },
    },
  },
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return <ThemeProviderMain theme={theme}>{children}</ThemeProviderMain>;
}
