import React from "react";
import { TrackColor } from "../interfaces/Track";
import StepInterface from "../interfaces/Step";
import "./Step.css";

interface StepProps {
    step: StepInterface;
    position: number;
    playheadPosition?: number;
    trackColor: TrackColor;
    emoji?: string;
    onClick: (position: number) => void;
}

function Step({
    step,
    position,
    playheadPosition,
    trackColor,
    emoji,
    onClick,
}: StepProps) {
    const classNames = ["Step-button"];

    if (step.isOn) {
        classNames.push(`Step-button--on-${trackColor}`);
    }

    return (
        <div className="Step">
            <button
                className={classNames.join(" ")}
                aria-label={`Step ${position + 1}`}
                onClick={() => onClick(position)}
            >
                {step.isOn && emoji && (
                    <span className="Step-emoji">{emoji}</span>
                )}
            </button>
            {position % 4 === 0 && <div className="Step-downbeat" />}
            {position === playheadPosition && <div className="Step-playhead" />}
        </div>
    );
}

export default Step;
