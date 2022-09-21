import React, { useContext, useEffect } from "react";
import { Context } from "../Context";
import TrackInterface from "../interfaces/Track";
import sequencer from "../sequencer";
import Step from "./Step";
import Volume from "./Volume";
import "./Track.css";

interface TrackProps {
    track: TrackInterface;
    shortcutKey: string;
    playheadPosition?: number;
}

function Track({ track, shortcutKey, playheadPosition }: TrackProps) {
    const dispatch = useContext(Context);
    const id = track.id;
    const sample = track.sample;

    useEffect(() => {
        sequencer.setVolume(sample, track.volume.value, track.volume.isMuted);
    }, [sample, track.volume.value, track.volume.isMuted]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === shortcutKey) {
                dispatch({ type: "mute", trackId: id });
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [id, shortcutKey, dispatch]);

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
                onClick={() => dispatch({ type: "mute", trackId: id })}
            >
                {shortcutKey}
            </button>
            {track.steps.map((step, position) => (
                <Step
                    step={step}
                    position={position}
                    playheadPosition={playheadPosition}
                    trackSample={sample}
                    trackColor={track.color}
                    onClick={(stepPosition) =>
                        dispatch({
                            type: "toggleStep",
                            trackId: id,
                            stepPosition,
                        })
                    }
                    key={position}
                />
            ))}
            <Volume
                volume={track.volume}
                onChange={(volumeValue) =>
                    dispatch({ type: "changeVolume", trackId: id, volumeValue })
                }
            />
        </div>
    );
}

export default Track;
