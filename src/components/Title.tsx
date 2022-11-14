import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";
import SOURCE from "../source";
import { useJamStore } from "../store";
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
    const clear = useJamStore((state) => state.clear);

    if (!jam) {
        return <div className="Title secondary">Fetching jam…</div>;
    }

    function save() {
        const anchor = document.createElement("a");

        const jamJSONString = JSON.stringify(jam);
        const jamBlob = new Blob([jamJSONString], { type: "application/json" });
        anchor.href = URL.createObjectURL(jamBlob);

        const adjective =
            ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
        anchor.download = `${adjective}-jam.peel`;

        anchor.click();
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
                        <DropdownMenu.Item className="Menu-Item">
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
