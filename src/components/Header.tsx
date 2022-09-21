import React from "react";
import Logo from "./Logo";
import Tempo from "./Tempo";
import "./Header.css";

interface HeaderProps {
    isPlaying: boolean;
    playheadPosition: number;
    tempo: number;
    onPlayStop: () => void;
}

function Header({
    isPlaying,
    playheadPosition,
    tempo,
    onPlayStop,
}: HeaderProps) {
    return (
        <header className="Header">
            <div className="Header-logo-container">
                <Logo isUpbeat={isPlaying && playheadPosition % 4 !== 0} />
            </div>
            <div className="Header-container">
                <Tempo value={tempo} />
                <button className="Header-button" onClick={onPlayStop}>
                    {isPlaying ? "Stop" : "Play"}
                </button>
            </div>
        </header>
    );
}

export default Header;
