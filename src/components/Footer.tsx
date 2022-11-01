import React from "react";
import Tempo from "./Tempo";

interface FooterProps {
    tempo: number;
}

function Footer({ tempo }: FooterProps) {
    return (
        <footer className="mt-3 flex justify-between">
            <div className="flex w-32 justify-end">
                <Tempo value={tempo} />
            </div>
            <span className="text-gray">
                Ping me at{" "}
                <a
                    href="https://twitter.com/berkcebi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2"
                >
                    @berkcebi
                </a>{" "}
                for any feedback.
            </span>
        </footer>
    );
}

export default Footer;
