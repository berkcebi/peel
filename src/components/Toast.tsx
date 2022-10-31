import clsx from "clsx";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Toast.css";
import { useToastStore } from "../store";

const DURATION = 3000;

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

    if (!message) {
        return null;
    }

    const isError = typeof message === "object" && message.type === "error";

    return createPortal(
        <div className={clsx("Toast", isError && "Toast--error")}>
            {typeof message === "object" ? message.text : message}
        </div>,
        document.body
    );
}

export default Toast;
