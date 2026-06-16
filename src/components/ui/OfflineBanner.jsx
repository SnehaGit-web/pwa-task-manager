import React from "react";
import "./OfflineBanner.css";

export function OfflineBanner({ isOnline }) {
  if (isOnline) return null;
  return (
    <div className="offline-banner" role="status">
      📡 You are offline — tasks are saved locally and will sync when reconnected.
    </div>
  );
}
