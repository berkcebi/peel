import React from "react";
import "./Footer.css";
import Tempo from "./Tempo";

interface FooterProps {
    tempo: number;
}

function Footer({ tempo }: FooterProps) {
    return (
        <footer className="Footer">
            <div className="Footer-container">
                <Tempo value={tempo} />
            </div>
            <span className="secondary">
                Ping me at{" "}
                <a
                    href="https://twitter.com/berkcebi"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    @berkcebi
                </a>{" "}
                for any feedback.
            </span>
        </footer>
    );
}

export default Footer;
