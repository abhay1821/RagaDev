import { InputAdornment } from "@mui/material";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import { type ReactNode, forwardRef } from "react";
import { design } from "../theme/design";

const inputRadiusSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: `${design.radius.lg}px`,
  },
} as const;

export interface AppTextFieldProps extends Omit<TextFieldProps, "fullWidth"> {
  icon?: ReactNode;
  fullWidth?: boolean;
}

export const AppTextField = forwardRef<HTMLDivElement, AppTextFieldProps>(
  function AppTextField(
    { icon, fullWidth = true, variant = "outlined", slotProps, sx, ...rest },
    ref,
  ) {
    const prevInput =
      typeof slotProps?.input === "object" && slotProps.input !== null
        ? slotProps.input
        : {};

    const skipAutoIcon =
      "startAdornment" in prevInput && prevInput.startAdornment != null;

    const resolvedSlotProps =
      icon != null && !skipAutoIcon
        ? {
            ...slotProps,
            input: {
              ...prevInput,
              startAdornment: (
                <InputAdornment position="start">{icon}</InputAdornment>
              ),
            },
          }
        : slotProps;

    const mergedSx =
      sx === undefined
        ? inputRadiusSx
        : [inputRadiusSx, ...(Array.isArray(sx) ? sx : [sx])];

    return (
      <TextField
        ref={ref}
        fullWidth={fullWidth}
        variant={variant}
        {...rest}
        slotProps={resolvedSlotProps}
        sx={mergedSx}
      />
    );
  },
);

AppTextField.displayName = "AppTextField";

export const FormTextField = AppTextField;
