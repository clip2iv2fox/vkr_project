import * as React from "react";
import * as ReactDom from "react-dom/client";
import App from "./App";
import "./index.css"

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDom.createRoot(rootElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
  );
}
