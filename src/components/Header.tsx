import React from "react";
import "./Header.css";
import { ReactComponent as Logo } from "./assets/logo.svg";

function Header(props: { isPlaying: boolean; onButtonClick: () => void }) {
    return (
        <div className="Header">
            <div className="Header-logo-container">
                <Logo className="Header-logo" />
            </div>
            <button className="Header-button" onClick={props.onButtonClick}>
                {props.isPlaying ? "Stop" : "Play"}
            </button>
        </div>
    );
}

export default Header;
