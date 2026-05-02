import { registerServiceWorker } from "./registerServiceWorker";

export type DemoNotificationResult =
  | { ok: true }
  | {
      ok: false;
      reason: "unsupported" | "denied" | "no_worker" | "failed";
      message?: string;
    };

export async function showDemoClinicalNotification(): Promise<DemoNotificationResult> {
  if (!("serviceWorker" in navigator) || !("Notification" in window)) {
    return {
      ok: false,
      reason: "unsupported",
      message: "Notifications not supported in this browser.",
    };
  }

  await registerServiceWorker();

  try {
    const reg =
      (await navigator.serviceWorker.getRegistration()) ??
      (await registerServiceWorker());
    if (!reg)
      return {
        ok: false,
        reason: "no_worker",
        message: "Service worker did not register.",
      };

    await navigator.serviceWorker.ready;

    let permission = Notification.permission;
    if (permission === "default") {
      permission = await Notification.requestPermission();
    }
    if (permission !== "granted") {
      return {
        ok: false,
        reason: "denied",
        message: "Notifications are blocked or not allowed.",
      };
    }

    await reg.showNotification("Raga Clinical", {
      body: "Clinical alerts are enabled — critical summaries and reminders will surface here.",
      icon: "/favicon.svg",
      badge: "/favicon.svg",
      tag: "raga-clinical-demo",
    });

    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return { ok: false, reason: "failed", message };
  }
}

export async function notifyPatientAddedIfPermitted(
  displayName: string,
): Promise<void> {
  if (!("Notification" in window) || !("serviceWorker" in navigator)) return;

  let permission = Notification.permission;
  if (permission === "default") {
    permission = await Notification.requestPermission();
  }
  if (permission !== "granted") return;

  await registerServiceWorker();
  try {
    const reg = await navigator.serviceWorker.ready;
    await reg.showNotification("Patient registered", {
      body: `${displayName} was added to the registry.`,
      icon: "/favicon.svg",
      badge: "/favicon.svg",
      tag: `patient-added-${crypto.randomUUID()}`,
    });
  } catch {
    return;
  }
}
