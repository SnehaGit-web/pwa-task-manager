import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTask, updateTask, selectAllTasks } from "@store/slices/tasksSlice";
import { closeModal, selectEditingTaskId } from "@store/slices/uiSlice";
import { PRIORITY } from "@store/slices/tasksSlice";

const emptyForm = {
  title:       "",
  description: "",
  priority:    PRIORITY.MEDIUM,
  dueDate:     "",
};

/**
 * useTaskForm — manages form state for creating and editing tasks.
 * Reads editingTaskId from Redux to pre-populate the form when editing.
 */
export function useTaskForm() {
  const dispatch      = useDispatch();
  const editingTaskId = useSelector(selectEditingTaskId);
  const allTasks      = useSelector(selectAllTasks);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  // Pre-populate when editing an existing task
  useEffect(() => {
    if (editingTaskId) {
      const task = allTasks.find((t) => t.id === editingTaskId);
      if (task) {
        setForm({
          title:       task.title,
          description: task.description,
          priority:    task.priority,
          dueDate:     task.dueDate || "",
        });
      }
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [editingTaskId, allTasks]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required.";
    if (form.title.trim().length > 120) errs.title = "Title must be under 120 characters.";
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    if (editingTaskId) {
      dispatch(updateTask({ id: editingTaskId, changes: { ...form } }));
    } else {
      dispatch(addTask({ id: uuidv4(), ...form }));
    }
    dispatch(closeModal());
  }

  return { form, errors, handleChange, handleSubmit, isEditing: !!editingTaskId };
}
