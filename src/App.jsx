import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTheme } from "@store/slices/uiSlice";
import { Home } from "@pages/Home";
import { Settings } from "@pages/Settings";
import "./app.css";

export default function App() {
  const theme = useSelector(selectTheme);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}
