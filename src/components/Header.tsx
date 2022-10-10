import React, { useEffect } from "react";
import { usePlayStore } from "../store";
import Logo from "./Logo";
import "./Header.css";

function Header() {
    const isPlaying = usePlayStore((state) => state.isPlaying);
    const playheadPosition = usePlayStore((state) => state.playheadPosition);
    const toggleIsPlaying = usePlayStore((state) => state.toggleIsPlaying);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === "Space") {
                event.preventDefault();

                toggleIsPlaying();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [toggleIsPlaying]);

    return (
        <header className="Header">
            <div className="Header-logo-container">
                <Logo isUpbeat={isPlaying && playheadPosition % 4 !== 0} />
            </div>
            <div className="Header-container">
                <button
                    className="Header-button"
                    onClick={() => toggleIsPlaying()}
                >
                    {isPlaying ? "Stop" : "Play"}
                </button>
            </div>
        </header>
    );
}

export default Header;
