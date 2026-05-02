const SW_SCRIPT = "/sw.js";

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!("serviceWorker" in navigator)) return null;
  try {
    const reg = await navigator.serviceWorker.register(SW_SCRIPT, {
      scope: "/",
      updateViaCache: "none",
    });
    if (import.meta.env.DEV) {
      console.info("[service-worker]", "registered:", reg.scope);
    }
    return reg;
  } catch (err) {
    console.warn("[service-worker] registration failed:", err);
    return null;
  }
}
