import tasksReducer, {
  addTask, toggleTask, deleteTask, clearCompleted,
  setFilter, setSearchQuery,
  selectFilteredTasks, selectStats,
} from "@store/slices/tasksSlice";

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (k) => store[k] ?? null,
    setItem: (k, v) => { store[k] = v; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

const baseState = { items: [], filter: "all", sortBy: "createdAt", searchQuery: "" };

describe("tasksSlice", () => {
  it("adds a task with correct defaults", () => {
    const state = tasksReducer(baseState, addTask({ title: "Buy milk" }));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].title).toBe("Buy milk");
    expect(state.items[0].completed).toBe(false);
    expect(state.items[0].priority).toBe("medium");
    expect(state.items[0].id).toBeDefined();
  });

  it("toggles task completion both ways", () => {
    let state = tasksReducer(baseState, addTask({ title: "Test" }));
    const id = state.items[0].id;
    state = tasksReducer(state, toggleTask(id));
    expect(state.items[0].completed).toBe(true);
    state = tasksReducer(state, toggleTask(id));
    expect(state.items[0].completed).toBe(false);
  });

  it("deletes a task by id", () => {
    let state = tasksReducer(baseState, addTask({ title: "Delete me" }));
    const id = state.items[0].id;
    state = tasksReducer(state, deleteTask(id));
    expect(state.items).toHaveLength(0);
  });

  it("clears only completed tasks", () => {
    let state = tasksReducer(baseState, addTask({ title: "Keep" }));
    state = tasksReducer(state, addTask({ title: "Remove" }));
    state = tasksReducer(state, toggleTask(state.items[0].id));
    state = tasksReducer(state, clearCompleted());
    expect(state.items).toHaveLength(1);
    expect(state.items[0].completed).toBe(false);
  });

  it("filters to active tasks only", () => {
    let state = tasksReducer(baseState, addTask({ title: "Active" }));
    state = tasksReducer(state, addTask({ title: "Done" }));
    state = tasksReducer(state, toggleTask(state.items[0].id));
    state = { ...state, filter: "active" };
    const filtered = selectFilteredTasks({ tasks: state });
    expect(filtered.every((t) => !t.completed)).toBe(true);
  });

  it("searches by title case-insensitively", () => {
    let state = tasksReducer(baseState, addTask({ title: "Buy groceries" }));
    state = tasksReducer(state, addTask({ title: "Call dentist" }));
    state = { ...state, searchQuery: "GRO" };
    const filtered = selectFilteredTasks({ tasks: state });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].title).toBe("Buy groceries");
  });

  it("calculates stats correctly", () => {
    let state = tasksReducer(baseState, addTask({ title: "T1", priority: "high" }));
    state = tasksReducer(state, addTask({ title: "T2" }));
    state = tasksReducer(state, toggleTask(state.items[0].id));
    const stats = selectStats({ tasks: state });
    expect(stats.total).toBe(2);
    expect(stats.completed).toBe(1);
    expect(stats.active).toBe(1);
  });
});
