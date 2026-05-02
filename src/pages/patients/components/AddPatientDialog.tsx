import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { type Dayjs } from "dayjs";
import { type FormEvent, useState } from "react";
import { AppButton } from "../../../app/components/AppButton";
import { AppTextField } from "../../../app/components/AppTextField";
import { design } from "../../../app/theme/design";
import type { PatientDraft } from "../../../stores/patientStore";

function parseMobile(raw: string):
  | { ok: true; value: string }
  | { ok: false; message: string } {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { ok: false, message: "Mobile is required." };
  }
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length !== 10) {
    return { ok: false, message: "Mobile must be exactly 10 digits." };
  }
  return { ok: true, value: digits };
}

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (draft: PatientDraft) => Promise<void>;
};

export function AddPatientDialog({ open, onClose, onSubmit }: Props) {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState<Dayjs | null>(null);
  const [gender, setGender] = useState("Male");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [mobileError, setMobileError] = useState<string | null>(null);

  const reset = () => {
    setFullName("");
    setMobile("");
    setDob(null);
    setGender("Male");
    setEmail("");
    setFormError(null);
    setMobileError(null);
  };

  const handleClose = () => {
    if (!submitting) {
      reset();
      onClose();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setMobileError(null);
    const name = fullName.trim();
    if (!name) {
      setFormError("Full name is required.");
      return;
    }
    const mobileParsed = parseMobile(mobile);
    if (mobileParsed.ok === false) {
      setMobileError(mobileParsed.message);
      return;
    }
    if (!dob || !dob.isValid()) {
      setFormError("Date of birth is required.");
      return;
    }
    if (dob.isAfter(dayjs(), "day")) {
      setFormError("Date of birth cannot be in the future.");
      return;
    }

    const payload: PatientDraft = {
      fullName: name,
      mobile: mobileParsed.value,
      dateOfBirth: dob.format("YYYY-MM-DD"),
      gender,
      email: email.trim() === "" ? null : email.trim(),
    };

    setSubmitting(true);
    try {
      await onSubmit(payload);
      reset();
      onClose();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DialogTitle>Add patient</DialogTitle>
        <Box component="form" onSubmit={(ev) => void handleSubmit(ev)}>
          <DialogContent>
            <Stack spacing={2} sx={{ pt: 0.5 }}>
              {formError && <Alert severity="error">{formError}</Alert>}
              <AppTextField
                required
                label="Full name"
                value={fullName}
                onChange={(ev) => setFullName(ev.target.value)}
                autoComplete="off"
              />
              <AppTextField
                required
                label="Mobile"
                value={mobile}
                onChange={(ev) => {
                  setMobile(ev.target.value);
                  if (mobileError) setMobileError(null);
                }}
                onBlur={() => {
                  if (!mobile.trim()) {
                    setMobileError(null);
                    return;
                  }
                  const r = parseMobile(mobile);
                  if (r.ok === false) {
                    setMobileError(r.message);
                  } else {
                    setMobileError(null);
                  }
                }}
                error={Boolean(mobileError)}
                helperText={mobileError ?? "Enter exactly 10 digits."}
                autoComplete="tel"
                type="tel"
                inputMode="numeric"
                placeholder="9876543210"
              />
              <DatePicker
                value={dob}
                onChange={(v) => setDob(v)}
                maxDate={dayjs()}
                minDate={dayjs().subtract(130, "year")}
                format="D MMM, YYYY"
                slotProps={{
                  textField: {
                    required: true,
                    label: "Date of birth",
                    fullWidth: true,
                    variant: "outlined",
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        borderRadius: `${design.radius.lg}px`,
                      },
                    },
                  },
                }}
              />
              <AppTextField
                select
                label="Gender"
                value={gender}
                onChange={(ev) => setGender(ev.target.value)}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </AppTextField>
              <AppTextField
                label="Email (optional)"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                type="email"
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleClose} disabled={submitting}>
              Cancel
            </Button>
            <AppButton type="submit" disabled={submitting}>
              {submitting ? "Saving…" : "Save patient"}
            </AppButton>
          </DialogActions>
        </Box>
      </LocalizationProvider>
    </Dialog>
  );
}
