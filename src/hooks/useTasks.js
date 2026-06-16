import { useSelector, useDispatch } from "react-redux";
import {
  selectFilteredTasks, selectStats, selectFilter, selectSortBy, selectSearchQuery,
  addTask, toggleTask, updateTask, deleteTask, clearCompleted,
  setFilter, setSortBy, setSearchQuery,
} from "@store/slices/tasksSlice";

/**
 * useTasks — convenience hook exposing all task state and actions.
 */
export function useTasks() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectFilteredTasks);
  const stats = useSelector(selectStats);
  const filter = useSelector(selectFilter);
  const sortBy = useSelector(selectSortBy);
  const searchQuery = useSelector(selectSearchQuery);

  return {
    tasks, stats, filter, sortBy, searchQuery,
    addTask: (data) => dispatch(addTask(data)),
    toggleTask: (id) => dispatch(toggleTask(id)),
    updateTask: (data) => dispatch(updateTask(data)),
    deleteTask: (id) => dispatch(deleteTask(id)),
    clearCompleted: () => dispatch(clearCompleted()),
    setFilter: (f) => dispatch(setFilter(f)),
    setSortBy: (s) => dispatch(setSortBy(s)),
    setSearchQuery: (q) => dispatch(setSearchQuery(q)),
  };
}
