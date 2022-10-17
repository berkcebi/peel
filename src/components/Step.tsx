import * as ContextMenu from "@radix-ui/react-context-menu";
import React, { useEffect } from "react";
import sequencer from "../sequencer";
import { useJamStore, usePlayStore } from "../store";
import Repeat, {
    ALL_REPEATS,
    DEFAULT_REPEAT,
    repeatDescription,
} from "../types/Repeat";
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
    trackId: number;
    isFirstTrack: boolean;
    trackSample: Sample;
    trackColor: TrackColor;
}

function Step({
    step,
    position,
    trackId,
    isFirstTrack,
    trackSample,
    trackColor,
}: StepProps) {
    const toggleStep = useJamStore((state) => state.toggleStep);
    const changeStepRepeat = useJamStore((state) => state.changeStepRepeat);
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
            <ContextMenu.Root>
                <ContextMenu.Trigger>
                    <button
                        className={classNames.join(" ")}
                        aria-label={`Step ${position + 1}`}
                        onClick={() => toggleStep(trackId, position)}
                    >
                        {step.isOn && emoji && (
                            <span className="Step-emoji">{emoji}</span>
                        )}
                    </button>
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                    <ContextMenu.Content className="Context-Menu-Content">
                        <ContextMenu.Label className="Context-Menu-Label">
                            Repeat
                        </ContextMenu.Label>
                        <ContextMenu.RadioGroup
                            value={step.repeat ?? DEFAULT_REPEAT}
                            onValueChange={(repeat) =>
                                changeStepRepeat(
                                    trackId,
                                    position,
                                    repeat as Repeat
                                )
                            }
                        >
                            {ALL_REPEATS.map((repeat, index) => (
                                <ContextMenu.RadioItem
                                    value={repeat}
                                    key={index}
                                    className="Context-Menu-Item"
                                >
                                    <ContextMenu.ItemIndicator>
                                        {"->"}
                                    </ContextMenu.ItemIndicator>
                                    {repeatDescription(repeat)}
                                </ContextMenu.RadioItem>
                            ))}
                        </ContextMenu.RadioGroup>
                    </ContextMenu.Content>
                </ContextMenu.Portal>
            </ContextMenu.Root>
            {position % 4 === 0 && <div className="Step-downbeat" />}
            {displayPlayhead && <div className="Step-playhead" />}
        </div>
    );
}
export default Step;
