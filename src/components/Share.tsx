import * as amplitude from "@amplitude/analytics-browser";
import React, { useEffect, useState } from "react";
import SOURCE from "../source";
import { useJamStore, useToastStore } from "../store";

const ORIGIN = "peel.fm";

function Share() {
    const jam = useJamStore((state) => state.jam);
    const setMessage = useToastStore((state) => state.setMessage);
    const [hash, setHash] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setHash(undefined);
    }, [jam, setHash]);

    async function writeLinkToClipboard(hash: string) {
        try {
            await navigator.clipboard.writeText(`${location.origin}/${hash}`);

            setMessage("Link copied to clipboard");
        } catch (error) {
            console.warn("Writing link to clipboard failed.", error);
        }
    }

    async function handleButtonClick() {
        if (hash) {
            await writeLinkToClipboard(hash);

            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_PEEL_API_URL}/jam`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(jam),
                }
            );

            const responseJSON = await response.json();
            const responseHash = responseJSON.hash;

            setHash(responseHash);

            amplitude.track("Share Jam");

            await writeLinkToClipboard(responseHash);
        } catch (error) {
            console.error(error);

            setMessage({ text: "Fetching link failed", type: "error" });
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return (
            <span className="cursor-progress text-gray">Fetching link…</span>
        );
    }

    return (
        <button
            className="flex items-center gap-2 text-blue focus:outline-none"
            onClick={handleButtonClick}
        >
            <Icon />
            {hash
                ? `${ORIGIN}/${hash}`
                : `${SOURCE.type === "remote" ? "Share" : "Share jam"}`}
        </button>
    );
}

function Icon() {
    return (
        <svg
            width="16"
            height="8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M7 1.5H4a2.5 2.5 0 1 0 0 5h3V8H4a4 4 0 1 1 0-8h3v1.5ZM9 8h3a4 4 0 1 0 0-8H9v1.5h3a2.5 2.5 0 0 1 0 5H9V8Z"
                fill="currentColor"
            />
            <path d="M5 4.75h6v-1.5H5v1.5Z" fill="currentColor" />
        </svg>
    );
}

export default Share;
