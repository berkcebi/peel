import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="Footer">
            Press P to start/stop playback, 1 to 9 to mute/unmute tracks.
            <br />
            Ping me at{" "}
            <a
                href="https://twitter.com/berkcebi"
                target="_blank"
                rel="noopener noreferrer"
            >
                @berkcebi
            </a>{" "}
            for any feedback.
        </footer>
    );
}

export default Footer;
