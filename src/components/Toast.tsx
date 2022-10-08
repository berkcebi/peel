import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./Toast.css";

const DURATION = 5000;

function Toast() {
    const [message, setMessage] = useState<string | null>("");

    useEffect(() => {
        if (!message) {
            return;
        }

        const timeoutId = setTimeout(() => setMessage(null), DURATION);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [message]);

    return message
        ? createPortal(<div className="Toast">{message}</div>, document.body)
        : null;
}

export default Toast;
