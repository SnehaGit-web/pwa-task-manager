import React, { useState } from "react";
import { useTasks } from "@hooks/useTasks";
import "./AddTaskForm.css";

const defaultForm = { title: "", description: "", priority: "medium", dueDate: "" };

export function AddTaskForm({ onClose }) {
  const { addTask } = useTasks();
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "title") setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setError("Task title is required."); return; }
    addTask({ ...form, dueDate: form.dueDate || null });
    setForm(defaultForm);
    onClose?.();
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit} noValidate>
      <h2 className="form-title">New Task</h2>

      <div className="form-field">
        <label htmlFor="title">Title *</label>
        <input
          id="title" name="title" type="text" autoFocus
          placeholder="What needs to be done?"
          value={form.title} onChange={handleChange}
          className={error ? "input-error" : ""}
        />
        {error && <span className="field-error">{error}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description" name="description" rows={3}
          placeholder="Optional details..."
          value={form.description} onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="dueDate">Due Date</label>
          <input id="dueDate" name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />
        </div>
      </div>

      <div className="form-actions">
        {onClose && <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>}
        <button type="submit" className="btn-primary">Add Task</button>
      </div>
    </form>
  );
}
