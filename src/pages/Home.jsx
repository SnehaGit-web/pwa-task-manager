import React, { useState } from "react";
import { Header } from "@components/layout/Header";
import { AddTaskForm } from "@components/tasks/AddTaskForm";
import { TaskList } from "@components/tasks/TaskList";
import { FilterBar } from "@components/ui/FilterBar";
import { StatsBar } from "@components/ui/StatsBar";
import { OfflineBanner } from "@components/ui/OfflineBanner";
import { usePWA } from "@hooks/usePWA";
import "./Home.css";

export function Home() {
  const [showForm, setShowForm] = useState(false);
  const { installPrompt, isOnline, triggerInstall } = usePWA();

  return (
    <div className="home">
      <OfflineBanner isOnline={isOnline} />
      <Header
        onAddClick={() => setShowForm((v) => !v)}
        installPrompt={installPrompt}
        triggerInstall={triggerInstall}
      />
      <main className="main-content">
        {showForm && <AddTaskForm onClose={() => setShowForm(false)} />}
        <StatsBar />
        <FilterBar />
        <TaskList />
      </main>
    </div>
  );
}