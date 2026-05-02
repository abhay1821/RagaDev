import Button, { type ButtonProps } from "@mui/material/Button";
import { brand } from "../theme/theme";

export type AppButtonProps = ButtonProps;

const clinicalContainedSx = {
  bgcolor: brand.emeraldDark,
  boxShadow: "0 8px 24px rgba(5,150,105,0.35)",
  "&:hover": {
    bgcolor: "#047857",
    boxShadow: "0 10px 28px rgba(5,150,105,0.42)",
  },
} as const;

export function AppButton({
  variant = "contained",
  size,
  sx,
  ...rest
}: AppButtonProps) {
  const preset =
    variant === "contained"
      ? { ...clinicalContainedSx, ...(size === "large" ? { py: 1.35 } : {}) }
      : {};

  const mergedSx =
    sx === undefined ? preset : [preset, ...(Array.isArray(sx) ? sx : [sx])];

  return <Button variant={variant} size={size} sx={mergedSx} {...rest} />;
}

export const FormButton = AppButton;
