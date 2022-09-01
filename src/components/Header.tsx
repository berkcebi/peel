import React from "react";
import "./Header.css";

function Header(props: { isPlaying: boolean; onButtonClick: () => void }) {
    return (
        <div className="Header">
            <div className="Header-name">peel</div>
            <button className="Header-button" onClick={props.onButtonClick}>
                {props.isPlaying ? "Stop" : "Play"}
            </button>
        </div>
    );
}

export default Header;
