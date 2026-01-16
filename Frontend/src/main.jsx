import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from "./components/ui/theme-provider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="job-tracker-theme">
        <App />
        <Toaster />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
