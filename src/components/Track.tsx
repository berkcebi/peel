import React, { useContext, useEffect } from "react";
import { Context } from "../Context";
import TrackInterface from "../interfaces/Track";
import Sample from "../interfaces/Sample";
import Step from "./Step";
import Volume from "./Volume";
import "./Track.css";

const SAMPLE_EMOJIS: { [sample: string]: string } = {
    [Sample.Clap]: "👏",
    [Sample.Cowbell]: "🐮",
};

interface TrackProps {
    track: TrackInterface;
    shortcutKey: string;
    playheadPosition?: number;
}

function Track({ track, shortcutKey, playheadPosition }: TrackProps) {
    const dispatch = useContext(Context);
    const trackId = track.id;

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === shortcutKey) {
                dispatch({ type: "mute", trackId: trackId });
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [trackId, shortcutKey, dispatch]);

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
                onClick={(event) => {
                    dispatch({ type: "mute", trackId: trackId });
                }}
            >
                {shortcutKey}
            </button>
            {track.steps.map((step, position) => (
                <Step
                    step={step}
                    position={position}
                    playheadPosition={playheadPosition}
                    trackColor={track.color}
                    emoji={SAMPLE_EMOJIS[track.sample]}
                    onClick={(stepPosition) =>
                        dispatch({ type: "toggleStep", trackId, stepPosition })
                    }
                    key={position}
                />
            ))}
            <Volume
                volume={track.volume}
                onChange={(volumeValue) =>
                    dispatch({ type: "changeVolume", trackId, volumeValue })
                }
            />
        </div>
    );
}

export default Track;
