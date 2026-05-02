import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useMemo } from "react";
import { Avatar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { brand } from "../theme/theme";
import { useAuth } from "../../pages/auth/context/AuthContext";

function titleForPath(pathname: string): string {
  if (pathname.startsWith("/patients")) return "Patients";
  if (pathname.startsWith("/analytics")) return "Analytics";
  return "Clinical Dashboard";
}

function formatToday(): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
}

function userInitials(
  email: string | null | undefined,
  name: string | null | undefined,
): string {
  if (name?.trim()) {
    const p = name.trim().split(/\s+/);
    if (p.length >= 2) return `${p[0]![0]}${p[p.length - 1]![0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  }
  if (email) return email.slice(0, 2).toUpperCase();
  return "RA";
}

export function MainHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const title = useMemo(() => titleForPath(pathname), [pathname]);
  const subtitle = useMemo(() => formatToday(), []);

  return (
    <Box
      component="header"
      sx={{
        borderBottom: `1px solid ${brand.border}`,
        bgcolor: "rgba(5,8,12,0.85)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: (t) => t.zIndex.drawer - 1,
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 72, sm: 80 },
          px: { xs: 2, sm: 3 },
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {onMenuClick && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open navigation"
            onClick={onMenuClick}
            sx={{ display: { md: "none" }, mr: -0.5 }}
          >
            <MenuRoundedIcon />
          </IconButton>
        )}

        <Box sx={{ flex: "1 1 200px", minWidth: 0 }}>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 700,
              fontFamily: '"Playfair Display", Georgia, serif',
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 1.5 },
            flexWrap: "wrap",
            justifyContent: { xs: "flex-end", sm: "flex-end" },
            ml: { xs: "auto", md: 0 },
          }}
        >
          <Avatar
            src={user?.photoURL ?? undefined}
            sx={{
              width: 40,
              height: 40,
              bgcolor: "rgba(52,211,153,0.2)",
              color: brand.emerald,
              fontWeight: 700,
              fontSize: "0.85rem",
            }}
          >
            {!user?.photoURL &&
              userInitials(user?.email ?? null, user?.displayName ?? null)}
          </Avatar>
        </Box>
      </Toolbar>
    </Box>
  );
}
