import clsx from "clsx";
import React, { useEffect } from "react";
import sequencer from "../sequencer";
import { useJamStore } from "../store";
import TrackType from "../types/Track";
import Step from "./Step";
import "./Track.css";
import Volume from "./Volume";

interface TrackProps {
    track: TrackType;
    shortcutKey: string;
}

function Track({ track, shortcutKey }: TrackProps) {
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
    return (
        <div className="Track">
            <div className="Track-name">
                {track.name}
                {track.description && (
                    <span className="secondary">, {track.description}</span>
                )}
            </div>
            <button
                className={clsx(
                    "Track-button",
                    track.volume.isMuted && "Track-button--muted"
                )}
                onClick={() => mute(id)}
            >
                {shortcutKey}
            </button>
            {track.steps.map((step, position) => (
                <Step
                    step={step}
                    position={position}
                    trackId={id}
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
