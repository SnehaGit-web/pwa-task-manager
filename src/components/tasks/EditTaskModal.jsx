import React, { useState } from "react";
import { useTasks } from "@hooks/useTasks";
import "./EditTaskModal.css";

export function EditTaskModal({ task, onClose }) {
  const { updateTask } = useTasks();
  const [form, setForm] = useState({
    title:       task.title,
    description: task.description,
    priority:    task.priority,
    dueDate:     task.dueDate ?? "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "title") setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setError("Title is required."); return; }
    updateTask({ id: task.id, ...form, dueDate: form.dueDate || null });
    onClose();
  };

  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdrop} role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Edit Task</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="edit-title">Title *</label>
            <input
              id="edit-title" name="title" type="text" autoFocus
              value={form.title} onChange={handleChange}
              className={error ? "input-error" : ""}
            />
            {error && <span className="field-error">{error}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="edit-description">Description</label>
            <textarea
              id="edit-description" name="description" rows={3}
              value={form.description} onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="edit-priority">Priority</label>
              <select id="edit-priority" name="priority" value={form.priority} onChange={handleChange}>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="edit-dueDate">Due Date</label>
              <input id="edit-dueDate" name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}