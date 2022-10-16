import React, { useEffect } from "react";
import sequencer from "../sequencer";
import { usePlayStore } from "../store";
import { DEFAULT_REPEAT } from "../types/Repeat";
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
    isFirstTrack: boolean;
    trackSample: Sample;
    trackColor: TrackColor;
    onClick: (position: number) => void;
}

function Step({
    step,
    position,
    isFirstTrack,
    trackSample,
    trackColor,
    onClick,
}: StepProps) {
    const isPlaying = usePlayStore((state) => state.isPlaying);
    const playheadPosition = usePlayStore((state) => state.playheadPosition);

    useEffect(
        () =>
            sequencer.setStepOn(
                trackSample,
                position,
                step.repeat ?? DEFAULT_REPEAT,
                step.isOn
            ),
        [step.isOn, step.repeat, position, trackSample]
    );

    const classNames = ["Step-button"];
    if (step.isOn) {
        classNames.push(`Step-button--on-${trackColor}`);
    }

    const emoji = SAMPLE_EMOJIS[trackSample];
    const displayPlayhead =
        isFirstTrack && isPlaying && position == playheadPosition;

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
            {displayPlayhead && <div className="Step-playhead" />}
        </div>
    );
}

export default Step;
