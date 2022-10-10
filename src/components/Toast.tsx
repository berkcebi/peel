import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Toast.css";
import { useToastStore } from "../store";

const DURATION = 5000;

function Toast() {
    const message = useToastStore((state) => state.message);
    const setMessage = useToastStore((state) => state.setMessage);

    useEffect(() => {
        if (!message) {
            return;
        }

        const timeoutId = setTimeout(() => setMessage(undefined), DURATION);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [message, setMessage]);

    return message
        ? createPortal(<div className="Toast">{message}</div>, document.body)
        : null;
}

export default Toast;
