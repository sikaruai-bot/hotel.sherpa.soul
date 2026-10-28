import { hydrateRoot, createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./i18n.js";

const rootElement = document.getElementById("root");
if (rootElement) {
  const appElement = (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, appElement);
  } else {
    createRoot(rootElement).render(appElement);
  }
}
