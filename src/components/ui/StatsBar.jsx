import React from "react";
import { useTasks } from "@hooks/useTasks";
import "./StatsBar.css";

export function StatsBar() {
  const { stats } = useTasks();
  const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  return (
    <div className="stats-bar">
      <div className="stats-row">
        <span className="stat"><strong>{stats.active}</strong> active</span>
        <span className="stat"><strong>{stats.completed}</strong> done</span>
        {stats.highPriority > 0 && <span className="stat stat-urgent"><strong>{stats.highPriority}</strong> urgent</span>}
        <span className="stat stat-pct">{pct}%</span>
      </div>
      <div className="progress-track"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
    </div>
  );
}
