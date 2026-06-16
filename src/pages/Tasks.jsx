import React from "react";
import { TaskList }  from "@components/tasks/TaskList";
import { FilterBar } from "@components/tasks/FilterBar";
import { TaskModal } from "@components/tasks/TaskModal";
import "./Tasks.css";

export function Tasks() {
  return (
    <main className="tasks-page">
      <FilterBar />
      <TaskList />
      <TaskModal />
    </main>
  );
}
