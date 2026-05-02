import { createTheme } from "@mui/material/styles";
import { design } from "./design";

export const brand = {
  emerald: "#34d399",
  emeraldDark: "#059669",
  forest: "#0d1f17",
  forestElevated: "#122920",
  black: "#050505",
  gridLine: "rgba(52, 211, 153, 0.06)",
  muted: "#9ca3af",
  paperDark: "#111111",
  border: "rgba(255, 255, 255, 0.08)",
};

export const appTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: brand.emerald },
    background: { default: brand.black, paper: brand.paperDark },
    text: {
      primary: "#fafafa",
      secondary: brand.muted,
    },
    divider: brand.border,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
      letterSpacing: "-0.02em",
    },
    h4: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
      letterSpacing: "-0.02em",
    },
    h5: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
    },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: design.radius.md },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { scrollbarColor: `${brand.border} transparent` },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.03)",
          "& fieldset": { borderColor: brand.border },
          "&:hover fieldset": { borderColor: "rgba(255,255,255,0.18)" },
          "&.Mui-focused fieldset": { borderColor: brand.emerald },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: { color: brand.muted, "&.Mui-checked": { color: brand.emerald } },
      },
    },
    MuiLink: {
      styleOverrides: { root: { fontWeight: 600 } },
    },
  },
});
