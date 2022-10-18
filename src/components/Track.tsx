import React, { useEffect } from "react";
import sequencer from "../sequencer";
import { useJamStore } from "../store";
import TrackType from "../types/Track";
import Step from "./Step";
import Volume from "./Volume";
import "./Track.css";

interface TrackProps {
    track: TrackType;
    shortcutKey: string;
    isFirst: boolean;
}

function Track({ track, shortcutKey, isFirst }: TrackProps) {
    const changeVolume = useJamStore((state) => state.changeVolume);
    const mute = useJamStore((state) => state.mute);

    const id = track.id;
    const sample = track.sample;

    useEffect(() => {
        sequencer.setVolume(sample, track.volume.value, track.volume.isMuted);
    }, [sample, track.volume.value, track.volume.isMuted]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === shortcutKey) {
                mute(id);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [id, shortcutKey, mute]);

    const buttonClassNames = ["Track-button"];

    if (track.volume.isMuted) {
        buttonClassNames.push("Track-button--muted");
    }

    return (
        <div className="Track">
            <div className="Track-name">
                {track.name}
                {track.description && (
                    <span className="secondary">, {track.description}</span>
                )}
            </div>
            <button
                className={buttonClassNames.join(" ")}
                onClick={() => mute(id)}
            >
                {shortcutKey}
            </button>
            {track.steps.map((step, position) => (
                <Step
                    step={step}
                    position={position}
                    trackId={id}
                    isFirstTrack={isFirst}
                    trackSample={sample}
                    trackColor={track.color}
                    key={position}
                />
            ))}
            <Volume
                volume={track.volume}
                onChange={(volumeValue) => changeVolume(id, volumeValue)}
            />
        </div>
    );
}

export default Track;
