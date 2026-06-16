import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggleTheme, selectTheme } from "@store/slices/uiSlice";
import "./Header.css";

export function Header({ onAddClick, installPrompt, triggerInstall }) {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  return (
    <header className="header">
      <div className="header-brand">
        <span className="brand-icon">✓</span>
        <span className="brand-name">TaskFlow</span>
      </div>

      <nav className="header-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} end>
          Tasks
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Settings
        </NavLink>
      </nav>

      <div className="header-actions">
        {installPrompt && (
          <button className="btn-install" onClick={triggerInstall}>⬇ Install App</button>
        )}
        <button className="btn-icon" onClick={() => dispatch(toggleTheme())} aria-label="Toggle theme">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <button className="btn-add" onClick={onAddClick} aria-label="Add task">
          + New Task
        </button>
      </div>
    </header>
  );
}