import * as amplitude from "@amplitude/analytics-browser";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import SOURCE from "./source";
import "./index.css";

amplitude.init(import.meta.env.VITE_PEEL_AMPLITUDE_API_KEY);
amplitude.track("Visit App", {
    Source: SOURCE.type,
});

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
