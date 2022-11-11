import React from "react";
import SOURCE from "../source";
import { useJamStore } from "../store";
import "./title.css";

function Title() {
    const jam = useJamStore((state) => state.jam);

    if (!jam) {
        return <div className="Title secondary">Fetching jam…</div>;
    }

    return (
        <div className="Title">
            {SOURCE.type === "remote" ? "Shared jam" : "Your jam"}
            <button className="Title-button">
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
            </button>
        </div>
    );
}

export default Title;
