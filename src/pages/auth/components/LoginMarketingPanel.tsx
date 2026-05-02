import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import { brand } from "../../../app/theme/theme";

const gridBg = {
  backgroundColor: brand.forest,
  backgroundImage: `
    linear-gradient(${brand.gridLine} 1px, transparent 1px),
    linear-gradient(90deg, ${brand.gridLine} 1px, transparent 1px)
  `,
  backgroundSize: "48px 48px",
};

export function LoginMarketingPanel() {
  return (
    <Box
      sx={{
        ...gridBg,
        flex: "0 0 44%",
        maxWidth: { md: "44%" },
        minHeight: { md: "100vh" },
        px: { md: 5 },
        py: { md: 2 },
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRight: `1px solid ${brand.border}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 50% at 50% 45%, rgba(52,211,153,0.1), transparent 55%)",
          pointerEvents: "none",
        }}
      />
      <Stack
        spacing={3.5}
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 480,
          mx: "auto",
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <LayersOutlinedIcon sx={{ color: brand.emerald, fontSize: 32 }} />
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
          </Stack>
          <Chip
            label="ENTERPRISE"
            size="small"
            sx={{
              height: 22,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.08em",
              bgcolor: "rgba(52,211,153,0.12)",
              color: brand.emerald,
              border: `1px solid rgba(52,211,153,0.25)`,
            }}
          />
        </Stack>

        <Stack spacing={1}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Box sx={{ width: 24, height: 1, bgcolor: brand.muted }} />
            <Typography
              variant="caption"
              sx={{
                color: brand.muted,
                letterSpacing: "0.2em",
                fontWeight: 600,
              }}
            >
              CLINICAL INTELLIGENCE PLATFORM
            </Typography>
          </Stack>
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 600,
              color: "#f5f5f5",
              lineHeight: 1.15,
              fontSize: { md: "2rem", lg: "2.35rem" },
            }}
          >
            Healthcare ops,{" "}
            <Box
              component="span"
              sx={{
                color: brand.emerald,
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              reimagined
            </Box>{" "}
            for scale.
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: brand.muted, maxWidth: 420, lineHeight: 1.7 }}
          >
            Streamline clinical workflows, surface operational insights, and
            keep teams aligned—without compromising compliance or patient trust.
          </Typography>
        </Stack>

        <Stack direction="row" spacing={4} useFlexGap sx={{ flexWrap: "wrap" }}>
          {[
            { value: "2.4M+", label: "Patient records managed" },
            { value: "340+", label: "Hospitals onboarded" },
            { value: "99.9%", label: "Platform uptime SLA" },
          ].map((item) => (
            <Stack key={item.label} spacing={0.5} sx={{ minWidth: 120 }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  color: "#fff",
                }}
              >
                {item.value}
              </Typography>
              <Typography variant="caption" sx={{ color: brand.muted }}>
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Box
          sx={{
            p: 2.5,
            borderRadius: 2,
            border: `1px solid rgba(52,211,153,0.2)`,
            bgcolor: "rgba(0,0,0,0.25)",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#e5e7eb", fontStyle: "italic", lineHeight: 1.65 }}
          >
            “Raga.ai gave us visibility we didn&apos;t know we were missing. Our
            command center finally speaks the same language as frontline care.”
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 2, alignItems: "center" }}
          >
            <Avatar
              sx={{
                bgcolor: "rgba(52,211,153,0.2)",
                color: brand.emerald,
                fontWeight: 700,
                width: 44,
                height: 44,
              }}
            >
              RS
            </Avatar>
            <Stack spacing={0.25} sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Dr. Riya Sharma
              </Typography>
              <Typography variant="caption" sx={{ color: brand.muted }}>
                Chief Medical Information Officer, Metro Health System
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.25}>
              {Array.from({ length: 5 }).map((_, i) => (
                <StarRoundedIcon
                  key={i}
                  sx={{ color: brand.emerald, fontSize: 20 }}
                />
              ))}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
