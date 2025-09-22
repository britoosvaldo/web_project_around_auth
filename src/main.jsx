import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter basename="/web_project_around_auth">
      <App />
    </HashRouter>
  </StrictMode>
);
