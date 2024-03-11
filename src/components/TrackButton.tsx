import clsx from "clsx";
import "./TrackButton.css";

interface TrackButtonProps {
    isMuted: boolean;
    onToggle: () => void;
    shortcutKey: string;
}

function TrackButton({ isMuted, onToggle, shortcutKey }: TrackButtonProps) {
    return (
        <button
            className="Track-button"
            title={`Toggle track ${isMuted ? "on" : "off"}`}
            onClick={onToggle}
        >
            <div
                className={clsx(
                    "Track-button-indicator",
                    isMuted && "Track-button-indicator--muted",
                )}
            />
            <div className="Track-button-text">{shortcutKey}</div>
        </button>
    );
}

export default TrackButton;
