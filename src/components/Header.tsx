import React from "react";
import Tempo from "./Tempo";
import "./Header.css";
import { ReactComponent as Logo } from "./assets/logo.svg";

function Header(props: {
    isPlaying: boolean;
    tempo: number;
    onButtonClick: () => void;
    onTempoChange: (tempo: number) => void;
}) {
    return (
        <div className="Header">
            <div className="Header-logo-container">
                <Logo className="Header-logo" />
            </div>
            <div className="Header-container">
                <Tempo value={props.tempo} onChange={props.onTempoChange} />
                <button className="Header-button" onClick={props.onButtonClick}>
                    {props.isPlaying ? "Stop" : "Play"}
                </button>
            </div>
        </div>
    );
}

export default Header;
