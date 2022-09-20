import React from "react";
import Tempo from "./Tempo";
import "./Header.css";
import { ReactComponent as Logo } from "./assets/logo.svg";

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
    const isUpbeat = isPlaying && playheadPosition % 4 !== 0;

    return (
        <header className="Header">
            <div className="Header-logo-container">
                <Logo
                    className={isUpbeat ? "Header-logo--upbeat" : "Header-logo"}
                />
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
