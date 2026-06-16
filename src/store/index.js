import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasksSlice";
import uiReducer from "./slices/uiSlice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    ui: uiReducer,
  },
});

export default store;
