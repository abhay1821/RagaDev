import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { type FormEvent, useState } from "react";
import { AppButton } from "../../../app/components/AppButton";
import { AppTextField } from "../../../app/components/AppTextField";
import { brand } from "../../../app/theme/theme";
import { isFirebaseConfigured } from "../../../lib/firebase/client";
import { useAuth } from "../context/AuthContext";
import { googleAuthProvider } from "../googleAuthProvider";
import { mapFirebaseAuthError } from "../utils/mapAuthError";
import { GoogleLogoIcon } from "./GoogleLogoIcon";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(value: string): string | null {
  const v = value.trim();
  if (!v) return "Work email is required.";
  if (!emailRegex.test(v)) return "Enter a valid email address.";
  return null;
}

function validatePassword(value: string): string | null {
  if (!value) return "Password is required.";
  if (value.length < 6) return "Password must be at least 6 characters.";
  return null;
}

export function LoginFormPanel() {
  const { auth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const configured = isFirebaseConfigured() && auth !== null;
  const busy = emailSubmitting || googleSubmitting;

  const handleAuthError = (err: unknown) => {
    console.error(err);
    if (import.meta.env.DEV && err instanceof FirebaseError) {
      console.warn("[auth]", err.code, err.message);
    }
    const code = err instanceof FirebaseError ? err.code : "auth/unknown";
    setFormError(mapFirebaseAuthError(code));
  };

  const handleGoogleSignIn = async () => {
    setFormError(null);
    if (!auth) return;
    setGoogleSubmitting(true);
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (err) {
      handleAuthError(err);
    } finally {
      setGoogleSubmitting(false);
    }
  };

  const handleEmailLogin = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    setEmailError(eErr);
    setPasswordError(pErr);
    if (eErr || pErr) return;
    if (!auth) return;
    setEmailSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      handleAuthError(err);
    } finally {
      setEmailSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: "100%",
        bgcolor: brand.black,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        px: { xs: 3, sm: 6, md: 8, lg: 10 },
        py: { xs: 4, md: 6 },
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 440, mx: "auto" }}>
        <Stack spacing={0.75} sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ color: "#fff" }}>
            Welcome back.
          </Typography>
          <Typography variant="body2" sx={{ color: brand.muted }}>
            Sign in to your workspace to continue.
          </Typography>
        </Stack>

        <Stack spacing={2.5}>
          <Button
            type="button"
            fullWidth
            variant="outlined"
            size="large"
            onClick={() => void handleGoogleSignIn()}
            disabled={!configured || busy}
            startIcon={<GoogleLogoIcon size={22} />}
            sx={{
              py: 1.2,
              borderColor: brand.border,
              color: "#f4f4f5",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                borderColor: brand.muted,
                bgcolor: "rgba(255,255,255,0.04)",
              },
            }}
          >
            {googleSubmitting ? "Opening Google…" : "Continue with Google"}
          </Button>

          <Divider
            sx={{
              borderColor: brand.border,
              "&::before, &::after": { borderColor: brand.border },
            }}
          >
            <Typography variant="caption" sx={{ color: brand.muted, px: 1 }}>
              or continue with email
            </Typography>
          </Divider>

          <Box component="form" onSubmit={(e) => void handleEmailLogin(e)}>
            <Stack spacing={2.25}>
              {formError && (
                <Alert severity="error" onClose={() => setFormError(null)}>
                  {formError}
                </Alert>
              )}

              <Stack spacing={0.75}>
                <Typography
                  variant="caption"
                  sx={{
                    color: brand.muted,
                    letterSpacing: "0.14em",
                    fontWeight: 700,
                  }}
                >
                  WORK EMAIL
                </Typography>
                <AppTextField
                  icon={<EmailOutlinedIcon sx={{ color: brand.muted }} />}
                  type="email"
                  placeholder="name@hospital.com"
                  autoComplete="email"
                  value={email}
                  onChange={(ev) => {
                    setEmail(ev.target.value);
                    setEmailError(null);
                  }}
                  error={Boolean(emailError)}
                  helperText={emailError}
                />
              </Stack>

              <Stack spacing={0.75}>
                <Typography
                  variant="caption"
                  sx={{
                    color: brand.muted,
                    letterSpacing: "0.14em",
                    fontWeight: 700,
                  }}
                >
                  PASSWORD
                </Typography>
                <AppTextField
                  icon={<LockOutlinedIcon sx={{ color: brand.muted }} />}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(ev) => {
                    setPassword(ev.target.value);
                    setPasswordError(null);
                  }}
                  error={Boolean(passwordError)}
                  helperText={passwordError}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            edge="end"
                            onClick={() => setShowPassword((v) => !v)}
                            sx={{ color: brand.muted }}
                          >
                            {showPassword ? (
                              <VisibilityOffOutlinedIcon />
                            ) : (
                              <VisibilityOutlinedIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Stack>

              <AppButton
                type="submit"
                variant="contained"
                size="large"
                disabled={!configured || busy}
                endIcon={<ArrowForwardIcon />}
              >
                {emailSubmitting ? "Signing in…" : "Sign in to workspace"}
              </AppButton>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
