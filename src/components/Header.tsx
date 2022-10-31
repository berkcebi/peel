import React, { useEffect } from "react";
import { usePlayStore } from "../store";
import "./Header.css";
import Logo from "./Logo";
import Playhead from "./Playhead";
import Share from "./Share";

function Header() {
    const isPlaying = usePlayStore((state) => state.isPlaying);
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
                <Logo />
            </div>
            <div className="Header-container">
                <Share />
                <button
                    className="Header-button"
                    onClick={() => toggleIsPlaying()}
                >
                    {isPlaying ? "Stop" : "Play"}
                </button>
            </div>
            <Playhead />
        </header>
    );
}

export default Header;
