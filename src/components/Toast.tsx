import clsx from "clsx";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
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
        <div
            className={clsx(
                "fixed top-3 left-1/2 -translate-x-1/2 rounded bg-black py-px px-[6px] text-white",
                isError && "bg-red-10 text-red"
            )}
        >
            {typeof message === "object" ? message.text : message}
        </div>,
        document.body
    );
}

export default Toast;
