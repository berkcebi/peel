import { usePlayStore } from "../store";
import "./Playhead.css";

function Playhead() {
    const isPlaying = usePlayStore((state) => state.isPlaying);
    const playheadPosition = usePlayStore((state) => state.playheadPosition);

    if (!isPlaying) {
        return null;
    }

    return (
        <div
            className="Playhead"
            style={{
                transform: `translate(${playheadPosition * 40}px, 0px)`,
            }}
        />
    );
}

export default Playhead;
