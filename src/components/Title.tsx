import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { fileOpen, fileSave } from "browser-fs-access";
import React from "react";
import SOURCE from "../source";
import { useJamStore, useToastStore } from "../store";
import { JamSchema } from "../types/Jam";
import "./title.css";

const ADJECTIVES = [
    "astonishing",
    "awe-inspiring",
    "breathtaking",
    "fabulous",
    "magnificent",
    "majestic",
    "mind-blowing",
    "spectacular",
    "spine-tingling",
    "sublime",
    "thrilling",
    "boring",
    "mediocre",
    "shoddy",
];

function Title() {
    const jam = useJamStore((state) => state.jam);
    const setJam = useJamStore((state) => state.setJam);
    const clear = useJamStore((state) => state.clear);
    const setMessage = useToastStore((state) => state.setMessage);

    if (!jam) {
        return <div className="Title secondary">Fetching jam…</div>;
    }

    async function open() {
        try {
            const jamBlob = await fileOpen({
                mimeTypes: ["application/json"],
                extensions: [".peel"],
                description: "Choose “.peel” file to open",
            });

            const jamString = await jamBlob.text();
            const jamObject = JSON.parse(jamString);
            const jam = JamSchema.parse(jamObject);

            setJam(jam);
        } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
                return;
            }

            console.error("Opening jam failed", error);

            setMessage({ text: "Opening jam failed", type: "error" });
        }
    }

    async function save() {
        const jamString = JSON.stringify(jam);
        const jamBlob = new Blob([jamString], { type: "application/json" });
        const adjective =
            ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];

        try {
            await fileSave(jamBlob, {
                fileName: `${adjective}-jam.peel`,
                extensions: [".peel"],
            });
        } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
                return;
            }

            console.error("Saving jam to disk failed", error);

            setMessage({ text: "Saving jam to disk failed", type: "error" });
        }
    }

    return (
        <div className="Title">
            {SOURCE.type === "remote" ? "Shared jam" : "Your jam"}
            <DropdownMenu.Root>
                <DropdownMenu.Trigger className="Title-button">
                    <svg
                        width="10"
                        height="2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 1a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm4 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm5-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
                            fill="currentColor"
                        />
                    </svg>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        sideOffset={12}
                        className="Menu-Content"
                    >
                        <DropdownMenu.Item
                            className="Menu-Item"
                            onSelect={() => {
                                open();
                            }}
                        >
                            Open…
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                            className="Menu-Item"
                            onSelect={() => {
                                save();
                            }}
                        >
                            Save to disk…
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator className="Menu-Separator" />
                        <DropdownMenu.Item
                            className="Menu-Item"
                            onSelect={() => {
                                if (
                                    confirm(
                                        "Clear the jam and start from scratch?"
                                    )
                                ) {
                                    clear();
                                }
                            }}
                        >
                            Clear
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
    );
}

export default Title;
