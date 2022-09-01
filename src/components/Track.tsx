import React from "react";
import TrackInterface from "../interfaces/Track";
import Step from "./Step";
import Volume from "./Volume";
import "./Track.css";

function Track(props: {
    track: TrackInterface;
    onStepClick: (trackId: number, stepIndex: number) => void;
    onVolumeChange: (trackId: number, volumePercentage: number) => void;
}) {
    const track = props.track;

    return (
        <div className="Track">
            <div className="Track-name">
                {track.name}
                {track.description && (
                    <span className="secondary">, {track.description}</span>
                )}
            </div>
            {track.steps.map((step, index) => (
                <Step
                    step={step}
                    index={index}
                    trackColor={track.color}
                    onClick={(stepIndex) =>
                        props.onStepClick(track.id, stepIndex)
                    }
                    key={index}
                />
            ))}
            <Volume
                volume={track.volume}
                onChange={(volumePercentage) =>
                    props.onVolumeChange(track.id, volumePercentage)
                }
            />
        </div>
    );
}

export default Track;
