import React, { useEffect, useState } from "react";
import source from "../source";
import { useJamStore, useToastStore } from "../store";
import "./Share.css";

function Share() {
    const jam = useJamStore((state) => state.jam);
    const setMessage = useToastStore((state) => state.setMessage);
    const [hash, setHash] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setHash(undefined);
    }, [jam, setHash]);

    function writeLinkToClipboard(hash: string) {
        navigator.clipboard.writeText(`${location.origin}/${hash}`);
        setMessage("Link copied to clipboard");
    }

    async function handleButtonClick() {
        if (hash) {
            writeLinkToClipboard(hash);

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
            writeLinkToClipboard(responseHash);
        } catch (error) {
            console.error(error);

            setMessage("Fetching link failed");
        } finally {
            setIsLoading(false);
        }
    }

    return isLoading ? (
        <span className="secondary">Fetching link…</span>
    ) : (
        <button className="Share-button" onClick={handleButtonClick}>
            {hash
                ? "Copy link ->"
                : `${source.type === "remote" ? "Share" : "Share jam"} ->`}
        </button>
    );
}

export default Share;
