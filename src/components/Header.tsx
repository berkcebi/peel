import React, { useEffect } from "react";
import { usePlayStore } from "../store";
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
        <header className="relative mb-3 flex items-end justify-between">
            <div className="flex w-32 justify-end">
                <Logo />
            </div>
            <div className="flex items-center gap-6">
                <Share />
                <button
                    className="h-7 w-[72px] rounded bg-blue text-white focus:ring-2 focus:ring-blue-25"
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
