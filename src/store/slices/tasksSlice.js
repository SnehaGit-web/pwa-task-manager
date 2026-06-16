import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem("taskflow_tasks");
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

const saveToStorage = (tasks) => {
  try { localStorage.setItem("taskflow_tasks", JSON.stringify(tasks)); }
  catch { console.warn("Could not persist tasks."); }
};

const initialState = {
  items: loadFromStorage(),
  filter: "all",
  sortBy: "createdAt",
  searchQuery: "",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action) {
      const task = {
        id: uuidv4(),
        title: action.payload.title,
        description: action.payload.description ?? "",
        priority: action.payload.priority ?? "medium",
        dueDate: action.payload.dueDate ?? null,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.items.unshift(task);
      saveToStorage(state.items);
    },
    toggleTask(state, action) {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) { task.completed = !task.completed; task.updatedAt = new Date().toISOString(); saveToStorage(state.items); }
    },
    updateTask(state, action) {
      const { id, ...changes } = action.payload;
      const task = state.items.find((t) => t.id === id);
      if (task) { Object.assign(task, changes, { updatedAt: new Date().toISOString() }); saveToStorage(state.items); }
    },
    deleteTask(state, action) {
      state.items = state.items.filter((t) => t.id !== action.payload);
      saveToStorage(state.items);
    },
    clearCompleted(state) {
      state.items = state.items.filter((t) => !t.completed);
      saveToStorage(state.items);
    },
    setFilter(state, action) { state.filter = action.payload; },
    setSortBy(state, action) { state.sortBy = action.payload; },
    setSearchQuery(state, action) { state.searchQuery = action.payload; },
  },
});

export const selectAllTasks = (state) => state.tasks.items;
export const selectFilter = (state) => state.tasks.filter;
export const selectSortBy = (state) => state.tasks.sortBy;
export const selectSearchQuery = (state) => state.tasks.searchQuery;

export const selectFilteredTasks = (state) => {
  const { items, filter, sortBy, searchQuery } = state.tasks;
  let result = items.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    result = result.filter((t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
  }
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  return [...result].sort((a, b) => {
    if (sortBy === "priority") return priorityOrder[a.priority] - priorityOrder[b.priority];
    if (sortBy === "dueDate") { if (!a.dueDate) return 1; if (!b.dueDate) return -1; return new Date(a.dueDate) - new Date(b.dueDate); }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};

export const selectStats = (state) => {
  const items = state.tasks.items;
  return {
    total: items.length,
    completed: items.filter((t) => t.completed).length,
    active: items.filter((t) => !t.completed).length,
    highPriority: items.filter((t) => t.priority === "high" && !t.completed).length,
  };
};

export const { addTask, toggleTask, updateTask, deleteTask, clearCompleted, setFilter, setSortBy, setSearchQuery } = tasksSlice.actions;
export default tasksSlice.reducer;
