import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
      <div className="header-actions">
        {installPrompt && (
          <button className="btn-install" onClick={triggerInstall}>
            ⬇ Install App
          </button>
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
