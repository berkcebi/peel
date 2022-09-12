import React from "react";
import Tempo from "./Tempo";
import "./Header.css";
import { ReactComponent as Logo } from "./assets/logo.svg";

interface HeaderProps {
    isPlaying: boolean;
    tempo: number;
    onPlayStop: () => void;
    onTempoChange: (tempo: number) => void;
}

function Header({ isPlaying, tempo, onPlayStop, onTempoChange }: HeaderProps) {
    return (
        <header className="Header">
            <div className="Header-logo-container">
                <Logo className="Header-logo" />
            </div>
            <div className="Header-container">
                <Tempo value={tempo} onChange={onTempoChange} />
                <button className="Header-button" onClick={onPlayStop}>
                    {isPlaying ? "Stop" : "Play"}
                </button>
            </div>
        </header>
    );
}

export default Header;
