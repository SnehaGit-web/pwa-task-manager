import React from "react";
import { useTasks } from "@hooks/useTasks";
import "./FilterBar.css";

const FILTERS = ["all", "active", "completed"];
const SORTS = [
  { value: "createdAt", label: "Newest" },
  { value: "priority",  label: "Priority" },
  { value: "dueDate",   label: "Due Date" },
];

export function FilterBar() {
  const { filter, sortBy, searchQuery, setFilter, setSortBy, setSearchQuery, stats, clearCompleted } = useTasks();
  return (
    <div className="filter-bar">
      <input className="search-input" type="search" placeholder="Search tasks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} aria-label="Search tasks" />
      <div className="filter-controls">
        <div className="filter-tabs">
          {FILTERS.map((f) => (
            <button key={f} className={`filter-tab ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort tasks">
          {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        {stats.completed > 0 && <button className="btn-clear" onClick={clearCompleted}>Clear done ({stats.completed})</button>}
      </div>
    </div>
  );
}
