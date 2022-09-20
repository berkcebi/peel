import React, { useEffect } from "react";
import sequencer from "../sequencer";
import { TrackColor } from "../interfaces/Track";
import Sample from "../interfaces/Sample";
import StepInterface from "../interfaces/Step";
import "./Step.css";

const SAMPLE_EMOJIS: { [sample: string]: string } = {
    [Sample.Clap]: "👏",
    [Sample.Cowbell]: "🐮",
};

interface StepProps {
    step: StepInterface;
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
