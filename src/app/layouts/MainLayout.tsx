import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useCallback, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MainHeader } from "../components/MainHeader";
import { brand } from "../theme/theme";
import { useAuth } from "../../pages/auth/context/AuthContext";

const DRAWER_WIDTH = 276;

const drawerPaperSx = {
  width: DRAWER_WIDTH,
  boxSizing: "border-box" as const,
  borderRight: `1px solid ${brand.border}`,
  bgcolor: "rgba(11,14,20,0.98)",
  backgroundImage:
    "linear-gradient(180deg, rgba(13,31,23,0.5) 0%, transparent 40%)",
};

const navButtonSx = {
  borderRadius: 1.25,
  mb: 0.35,
  py: 1,
  color: brand.muted,
  "&.active": {
    bgcolor: "rgba(52,211,153,0.14)",
    color: brand.emerald,
    "& .MuiListItemIcon-root": { color: brand.emerald },
  },
  "&:hover": {
    bgcolor: "rgba(255,255,255,0.06)",
  },
};

function DrawerNavContent({ onNavigate }: { onNavigate?: () => void }) {
  const { signOut } = useAuth();

  const linkProps = (to: string, end?: boolean) => ({
    component: NavLink,
    to,
    end,
    onClick: onNavigate,
    sx: navButtonSx,
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          px: 2.25,
          py: 2.5,
          borderBottom: `1px solid ${brand.border}`,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          Raga.ai
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Clinical intelligence platform
        </Typography>
      </Box>

      <List sx={{ px: 1.5, pt: 2, flex: 1 }}>
        <ListSubheader
          sx={{
            bgcolor: "transparent",
            color: brand.muted,
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            lineHeight: "32px",
          }}
        >
          OVERVIEW
        </ListSubheader>
        <ListItemButton {...linkProps("/", true)}>
          <ListItemIcon sx={{ minWidth: 40, color: brand.muted }}>
            <SpaceDashboardOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Dashboard
              </Typography>
            }
          />
        </ListItemButton>
        <ListItemButton {...linkProps("/analytics")}>
          <ListItemIcon sx={{ minWidth: 40, color: brand.muted }}>
            <InsightsOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Analytics
              </Typography>
            }
          />
        </ListItemButton>

        <ListSubheader
          sx={{
            bgcolor: "transparent",
            color: brand.muted,
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            lineHeight: "40px",
            mt: 1,
          }}
        >
          CLINICAL
        </ListSubheader>
        <ListItemButton {...linkProps("/patients")}>
          <ListItemIcon sx={{ minWidth: 40, color: brand.muted }}>
            <PeopleOutlineRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Patients
              </Typography>
            }
          />
        </ListItemButton>
      </List>

      <Box sx={{ p: 2, mt: "auto" }}>
        <Divider sx={{ borderColor: brand.border, mb: 2 }} />
        <ListItemButton
          onClick={() => void signOut()}
          sx={{
            borderRadius: 1.25,
            border: `1px solid ${brand.border}`,
            color: brand.muted,
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.05)",
              borderColor: "rgba(255,255,255,0.15)",
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: brand.muted }}>
            <LogoutOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Sign out
              </Typography>
            }
          />
        </ListItemButton>
      </Box>
    </Box>
  );
}

export function MainLayout() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((v) => !v);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const drawer = <DrawerNavContent onNavigate={closeMobile} />;

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": drawerPaperSx,
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { ...drawerPaperSx, position: "relative" },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="div"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <MainHeader onMenuClick={isMdUp ? undefined : handleDrawerToggle} />
        <Box
          component="main"
          sx={{
            flex: 1,
            overflow: "auto",
            bgcolor: "#070a0f",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
