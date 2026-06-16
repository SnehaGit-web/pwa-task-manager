import React from "react";
import { useSelector } from "react-redux";
import { selectNotificationsEnabled } from "@store/slices/uiSlice";
import { Header } from "@components/layout/Header";
import { usePWA } from "@hooks/usePWA";
import "./Settings.css";

export function Settings() {
  const notificationsEnabled = useSelector(selectNotificationsEnabled);
  const { installPrompt, isOnline, triggerInstall, requestNotifications } = usePWA();

  const permission = typeof Notification !== "undefined" ? Notification.permission : "unsupported";

  const handleToggle = async () => {
    if (permission === "granted") return;
    await requestNotifications();
  };

  const permissionMessage = {
    granted:     "Notifications are enabled. You'll get reminders 1 hour before tasks are due.",
    denied:      "Notifications are blocked. To enable them, click the lock icon in your browser's address bar and allow notifications for this site.",
    default:     "Allow notifications to get due-date reminders for your tasks.",
    unsupported: "Your browser does not support push notifications.",
  }[permission] ?? "";

  return (
    <div className="home">
      <Header installPrompt={installPrompt} triggerInstall={triggerInstall} />
      <div className="settings-page">
        <h1 className="settings-title">Settings</h1>

        {/* Notifications */}
        <section className="settings-section">
          <h2 className="section-heading">Notifications</h2>
          <div className="setting-row">
            <div className="setting-info">
              <span className="setting-label">Task reminders</span>
              <span className="setting-desc">{permissionMessage}</span>
            </div>
            <div className="setting-control">
              {permission === "granted" && <span className="badge badge-green">Enabled</span>}
              {permission === "denied"  && <span className="badge badge-red">Blocked</span>}
              {permission === "default" && <button className="btn-enable" onClick={handleToggle}>Enable</button>}
              {permission === "unsupported" && <span className="badge badge-grey">Not supported</span>}
            </div>
          </div>
          {permission === "denied" && (
            <div className="info-box info-box-warning">
              ⚠ Once blocked, notifications can only be re-enabled from your browser settings — JavaScript cannot request permission again after a denial.
            </div>
          )}
          {permission === "granted" && (
            <div className="info-box info-box-success">
              ✓ You'll receive a reminder notification 1 hour before any task with a due date.
            </div>
          )}
        </section>

        {/* Network */}
        <section className="settings-section">
          <h2 className="section-heading">Network</h2>
          <div className="setting-row">
            <div className="setting-info">
              <span className="setting-label">Connection status</span>
              <span className="setting-desc">
                {isOnline
                  ? "You are online. Tasks sync in real time."
                  : "You are offline. Tasks are saved locally and will sync when reconnected."}
              </span>
            </div>
            <div className="setting-control">
              <span className={`badge ${isOnline ? "badge-green" : "badge-red"}`}>
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="settings-section">
          <h2 className="section-heading">About</h2>
          <div className="about-grid">
            <div className="about-row"><span>App</span><span>TaskFlow</span></div>
            <div className="about-row"><span>Version</span><span>1.0.0</span></div>
            <div className="about-row"><span>Built with</span><span>React 18 + Redux Toolkit</span></div>
            <div className="about-row"><span>Offline support</span><span>Workbox PWA</span></div>
          </div>
        </section>
      </div>
    </div>
  );
}