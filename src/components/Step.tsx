import React, { useEffect } from "react";
import sequencer from "../sequencer";
import Sample from "../types/Sample";
import StepType from "../types/Step";
import { TrackColor } from "../types/Track";
import "./Step.css";

const SAMPLE_EMOJIS: { [sample in Sample]?: string } = {
    clap: "👏",
    cowbell: "🐮",
};

interface StepProps {
    step: StepType;
    position: number;
    trackSample: Sample;
    playheadPosition?: number;
    trackColor: TrackColor;
    onClick: (position: number) => void;
}

function Step({
    step,
    position,
    playheadPosition,
    trackSample,
    trackColor,
    onClick,
}: StepProps) {
    useEffect(
        () => sequencer.setStepOn(trackSample, position, step.isOn),
        [step.isOn, position, trackSample]
    );

    const classNames = ["Step-button"];
    if (step.isOn) {
        classNames.push(`Step-button--on-${trackColor}`);
    }

    const emoji = SAMPLE_EMOJIS[trackSample];

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
