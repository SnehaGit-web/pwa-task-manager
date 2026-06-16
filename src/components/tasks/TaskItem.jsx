import React, { useState } from "react";
import { useTasks } from "@hooks/useTasks";
import "./TaskItem.css";

const PRIORITY_LABELS = { high: "High", medium: "Med", low: "Low" };
const PRIORITY_COLORS = { high: "priority-high", medium: "priority-medium", low: "priority-low" };

export function TaskItem({ task }) {
  const { toggleTask, deleteTask } = useTasks();
  const [showConfirm, setShowConfirm] = useState(false);

  const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  return (
    <li className={`task-item ${task.completed ? "task-completed" : ""} ${isOverdue ? "task-overdue" : ""}`}>
      <button
        className="task-checkbox"
        onClick={() => toggleTask(task.id)}
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
      >
        {task.completed ? "✓" : ""}
      </button>

      <div className="task-body">
        <span className="task-title">{task.title}</span>
        {task.description && <span className="task-desc">{task.description}</span>}
        <div className="task-meta">
          <span className={`task-priority ${PRIORITY_COLORS[task.priority]}`}>
            {PRIORITY_LABELS[task.priority]}
          </span>
          {task.dueDate && (
            <span className={`task-due ${isOverdue ? "overdue" : ""}`}>
              {isOverdue ? "⚠ " : "📅 "}
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <div className="task-actions">
        {!showConfirm ? (
          <button className="btn-delete" onClick={() => setShowConfirm(true)} aria-label="Delete task">✕</button>
        ) : (
          <>
            <button className="btn-confirm" onClick={() => deleteTask(task.id)}>Delete</button>
            <button className="btn-cancel" onClick={() => setShowConfirm(false)}>Cancel</button>
          </>
        )}
      </div>
    </li>
  );
}
