import React from "react";
import { useTasks } from "@hooks/useTasks";
import { TaskItem } from "./TaskItem";
import "./TaskList.css";

export function TaskList() {
  const { tasks, stats } = useTasks();

  if (stats.total === 0) {
    return (
      <div className="task-empty">
        <span className="empty-icon">📋</span>
        <p>No tasks yet. Add one above to get started.</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-empty">
        <span className="empty-icon">🔍</span>
        <p>No tasks match your current filter or search.</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
