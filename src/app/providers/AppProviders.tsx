import { CssBaseline, ThemeProvider } from "@mui/material";
import { type ReactNode, useEffect } from "react";
import { AuthProvider } from "../../pages/auth/context/AuthContext";
import { registerServiceWorker } from "../../lib/pwa/registerServiceWorker";
import { appTheme } from "../theme/theme";

export function AppProviders({ children }: { children: ReactNode }) {
  useEffect(() => {
    void registerServiceWorker();
  }, []);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
