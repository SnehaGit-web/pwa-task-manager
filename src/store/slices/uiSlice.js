import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
  notificationsEnabled: false,
  installPromptDismissed: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme(state) { state.theme = state.theme === "dark" ? "light" : "dark"; },
    setNotificationsEnabled(state, action) { state.notificationsEnabled = action.payload; },
    dismissInstallPrompt(state) { state.installPromptDismissed = true; },
  },
});

export const selectTheme = (state) => state.ui.theme;
export const selectNotificationsEnabled = (state) => state.ui.notificationsEnabled;
export const selectInstallPromptDismissed = (state) => state.ui.installPromptDismissed;
export const { toggleTheme, setNotificationsEnabled, dismissInstallPrompt } = uiSlice.actions;
export default uiSlice.reducer;
