# ✅ TaskFlow — PWA Task Manager

A Progressive Web App task manager built with React 18, Redux Toolkit, and the Web Push API — installable on any device, fully functional offline.

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?logo=redux)
![PWA](https://img.shields.io/badge/PWA-Offline_Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 🚀 Live Demo

> [View on Vercel →](https://your-demo-link.vercel.app)

---

## ✨ Features

- **Installable PWA** — add to home screen on iOS and Android
- **Offline support** — tasks saved to localStorage, cached assets via Workbox service worker
- **Push notifications** — due-date reminders using the Web Notifications API
- **Full CRUD** — add, complete, edit, delete tasks
- **Priority + due date** — high/medium/low priority with overdue detection
- **Filter & sort** — all/active/completed + sort by newest, priority, or due date
- **Search** — instant fuzzy search across title and description
- **Dark/light theme** — persisted via Redux
- **Progress tracker** — live completion percentage bar
- **Responsive** — mobile-first layout, works on any screen size

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| UI Library | React 18 |
| State Management | Redux Toolkit |
| Offline / Caching | Workbox (via workbox-webpack-plugin) |
| Persistence | localStorage |
| Push Notifications | Web Notifications API |
| Routing | React Router v6 |
| Build Tool | Webpack 5 (custom config) |
| Testing | Jest + Enzyme + React Testing Library |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── tasks/          # TaskItem, TaskList, AddTaskForm
│   ├── layout/         # Header
│   └── ui/             # StatsBar, FilterBar, OfflineBanner
├── hooks/
│   ├── usePWA.js       # SW registration, install prompt, notifications
│   └── useTasks.js     # All task state + actions
├── store/
│   └── slices/
│       ├── tasksSlice.js   # CRUD + filter + sort + localStorage
│       └── uiSlice.js      # Theme, notification state
├── pages/
│   └── Home.jsx
├── service-worker.js       # Workbox strategies
└── index.js
```

---

## ⚙️ Getting Started

```bash
git clone https://github.com/YOUR_USERNAME/pwa-task-manager.git
cd pwa-task-manager
npm install
npm run dev       # http://localhost:3000
npm run build     # Production build with service worker
npm test          # Run tests
```

> **Note:** The service worker only registers in production builds (`npm run build`). Use `npm run dev` for development — it skips SW registration to avoid caching issues.

---

## 📱 Installing as a PWA

1. Run `npm run build` and deploy to Vercel
2. Open the deployed URL in Chrome or Safari on your phone
3. Tap the "Add to Home Screen" prompt (or use the Install App button in the header)
4. TaskFlow launches like a native app — no browser UI

---

## 🧪 Testing

```bash
npm test               # All tests
npm run test:coverage  # Coverage report
```

Tests cover: Redux reducer transitions, filtering logic, search, stats selector, localStorage persistence.

---

## 📄 License

MIT
