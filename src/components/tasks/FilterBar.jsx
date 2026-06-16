import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilter, setSortBy, setSearchQuery,
  selectFilter, selectSortBy, selectSearchQuery,
  selectTaskStats, STATUS,
} from "@store/slices/tasksSlice";
import "./FilterBar.css";

const FILTERS = [
  { value: STATUS.ALL,       label: "All" },
  { value: STATUS.ACTIVE,    label: "Active" },
  { value: STATUS.COMPLETED, label: "Done" },
];

export function FilterBar() {
  const dispatch    = useDispatch();
  const filter      = useSelector(selectFilter);
  const sortBy      = useSelector(selectSortBy);
  const searchQuery = useSelector(selectSearchQuery);
  const stats       = useSelector(selectTaskStats);

  return (
    <div className="filter-bar">
      {/* Progress bar */}
      {stats.total > 0 && (
        <div className="progress-wrap">
          <div
            className="progress-bar"
            style={{ width: `${(stats.completed / stats.total) * 100}%` }}
            role="progressbar"
            aria-valuenow={stats.completed}
            aria-valuemax={stats.total}
          />
          <span className="progress-label">
            {stats.completed} of {stats.total} complete
            {stats.high > 0 && ` · ${stats.high} high priority`}
          </span>
        </div>
      )}

      <div className="filter-controls">
        {/* Search */}
        <input
          type="search"
          className="search-input"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          aria-label="Search tasks"
        />

        {/* Filter tabs */}
        <div className="filter-tabs" role="tablist">
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              role="tab"
              aria-selected={filter === value}
              className={`filter-tab ${filter === value ? "filter-tab--active" : ""}`}
              onClick={() => dispatch(setFilter(value))}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          aria-label="Sort tasks by"
        >
          <option value="createdAt">Newest first</option>
          <option value="dueDate">Due date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  );
}
