import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setNotificationsEnabled } from "@store/slices/uiSlice";

/**
 * usePWA — handles SW registration, install prompt, push notifications, online/offline.
 */
export function usePWA() {
  const dispatch = useDispatch();
  const [installPrompt, setInstallPrompt] = useState(null);
  const [swRegistration, setSwRegistration] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((reg) => { console.log("SW registered:", reg.scope); setSwRegistration(reg); })
        .catch((err) => console.error("SW failed:", err));
    }
  }, []);

  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setInstallPrompt(e); };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => { window.removeEventListener("online", onOnline); window.removeEventListener("offline", onOffline); };
  }, []);

  const triggerInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") setInstallPrompt(null);
  };

  const requestNotifications = async () => {
    if (!("Notification" in window)) return "unsupported";
    const permission = await Notification.requestPermission();
    dispatch(setNotificationsEnabled(permission === "granted"));
    return permission;
  };

  const scheduleNotification = (task) => {
    if (!swRegistration || Notification.permission !== "granted" || !task.dueDate) return;
    const delay = new Date(task.dueDate).getTime() - Date.now() - 60 * 60 * 1000;
    if (delay > 0) {
      setTimeout(() => {
        swRegistration.showNotification("Task Due Soon", {
          body: `"${task.title}" is due in 1 hour.`,
          icon: "/icons/icon-192.png",
          tag: task.id,
        });
      }, delay);
    }
  };

  return { installPrompt, isOnline, triggerInstall, requestNotifications, scheduleNotification };
}
