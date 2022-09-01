import React from "react";
import TrackInterface from "../interfaces/Track";
import Step from "./Step";
import "./Track.css";

function Track(props: {
    track: TrackInterface;
    onStepClick: (trackId: number, stepIndex: number) => void;
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
                        props.onStepClick(props.track.id, stepIndex)
                    }
                    key={index}
                />
            ))}
            <div className="Track-volume">{track.volume * 100}%</div>
        </div>
    );
}

export default Track;
