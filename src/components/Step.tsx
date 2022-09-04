import React from "react";
import { TrackColor } from "../interfaces/Track";
import StepInterface from "../interfaces/Step";
import "./Step.css";

function Step(props: {
    step: StepInterface;
    position: number;
    playheadPosition?: number;
    trackColor: TrackColor;
    onClick: (position: number) => void;
}) {
    const classNames = ["Step-button"];

    if (props.step.isOn) {
        classNames.push(`Step-button--on-${props.trackColor}`);
    }

    return (
        <div className="Step">
            <button
                className={classNames.join(" ")}
                aria-label={`Step ${props.position + 1}`}
                onClick={() => props.onClick(props.position)}
            />
            {props.position % 4 === 0 && <div className="Step-downbeat" />}
            {props.position === props.playheadPosition && (
                <div className="Step-playhead" />
            )}
        </div>
    );
}

export default Step;
