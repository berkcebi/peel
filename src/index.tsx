import * as amplitude from "@amplitude/analytics-browser";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";

if (import.meta.env.PROD) {
    amplitude.init(import.meta.env.VITE_AMPLITUDE_API_KEY);
    amplitude.track("Visit App");
}

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
