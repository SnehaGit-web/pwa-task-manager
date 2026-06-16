import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, selectModalOpen, selectEditingTaskId } from "@store/slices/uiSlice";
import { useTaskForm } from "@hooks/useTaskForm";
import { PRIORITY } from "@store/slices/tasksSlice";
import "./TaskModal.css";

export function TaskModal() {
  const dispatch      = useDispatch();
  const isOpen        = useSelector(selectModalOpen);
  const editingTaskId = useSelector(selectEditingTaskId);
  const { form, errors, handleChange, handleSubmit, isEditing } = useTaskForm();
  const titleRef = useRef(null);

  // Focus title input when modal opens
  useEffect(() => {
    if (isOpen) setTimeout(() => titleRef.current?.focus(), 50);
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") dispatch(closeModal()); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [dispatch]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => dispatch(closeModal())} role="dialog" aria-modal="true">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{isEditing ? "Edit task" : "New task"}</h2>
          <button className="modal-close" onClick={() => dispatch(closeModal())} aria-label="Close">✕</button>
        </div>

        <form className="task-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="title">Title *</label>
            <input
              ref={titleRef}
              id="title"
              name="title"
              type="text"
              className={`form-input ${errors.title ? "form-input--error" : ""}`}
              value={form.title}
              onChange={handleChange}
              placeholder="What needs to be done?"
              maxLength={120}
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-input form-textarea"
              value={form.description}
              onChange={handleChange}
              placeholder="Add details (optional)"
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="priority">Priority</label>
              <select id="priority" name="priority" className="form-input" value={form.priority} onChange={handleChange}>
                <option value={PRIORITY.LOW}>Low</option>
                <option value={PRIORITY.MEDIUM}>Medium</option>
                <option value={PRIORITY.HIGH}>High</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="dueDate">Due date</label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                className="form-input"
                value={form.dueDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => dispatch(closeModal())}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {isEditing ? "Save changes" : "Add task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
