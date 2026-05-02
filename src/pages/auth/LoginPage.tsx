import { Box, CircularProgress, Stack } from "@mui/material";
import { Navigate } from "react-router-dom";
import { LoginFormPanel } from "./components/LoginFormPanel";
import { LoginMarketingPanel } from "./components/LoginMarketingPanel";
import { useAuth } from "./context/AuthContext";

export default function LoginPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <Stack
      direction="row"
      sx={{
        minHeight: "100vh",
        width: "100%",
        flexWrap: { xs: "wrap", md: "nowrap" },
      }}
    >
      <LoginMarketingPanel />
      <LoginFormPanel />
    </Stack>
  );
}
