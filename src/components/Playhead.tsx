import React from "react";
import { usePlayStore } from "../store";

function Playhead() {
    const isPlaying = usePlayStore((state) => state.isPlaying);
    const playheadPosition = usePlayStore((state) => state.playheadPosition);

    if (!isPlaying) {
        return null;
    }

    return (
        <div
            className="absolute left-[164px] -bottom-3 h-3 w-1 translate-x-[60px] rounded-sm bg-blue"
            style={{
                transform: `translate(${playheadPosition * 40}px, 0px)`,
            }}
        />
    );
}

export default Playhead;
