import * as ContextMenu from "@radix-ui/react-context-menu";
import React, { useEffect } from "react";
import sequencer from "../sequencer";
import { useJamStore, usePlayStore } from "../store";
import RepeatType, {
    DEFAULT_REPEAT,
    ALL_REPEATS,
    getRepeatDescription,
    parseRepeat,
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

    const emoji = step.isOn && SAMPLE_EMOJIS[trackSample];
    const displayPlayhead =
        isFirstTrack && isPlaying && position == playheadPosition;

    const classNames = ["Step-button"];
    if (step.isOn) {
        classNames.push(`Step-button--on-${trackColor}`);
    }
    if (step.repeat) {
        classNames.push(`Step-button--has-context-menu`);
    }

    const button = (
        <button
            className={classNames.join(" ")}
            aria-label={`Step ${position + 1}`}
            onClick={() => toggleStep(trackId, position)}
        >
            {step.repeat ? (
                <Repeat repeat={step.repeat} />
            ) : (
                emoji && <span className="Step-emoji">{emoji}</span>
            )}
        </button>
    );

    return (
        <div className="Step">
            {step.isOn ? (
                <ContextMenu.Root>
                    <ContextMenu.Trigger>{button}</ContextMenu.Trigger>
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
                                        repeat as RepeatType
                                    )
                                }
                            >
                                {ALL_REPEATS.map((repeat, index) => (
                                    <ContextMenu.RadioItem
                                        value={repeat}
                                        key={index}
                                        className="Context-Menu-Item"
                                    >
                                        <ContextMenu.ItemIndicator className="Context-Menu-Item-Indicator">
                                            {"->"}
                                        </ContextMenu.ItemIndicator>
                                        {getRepeatDescription(repeat)}
                                    </ContextMenu.RadioItem>
                                ))}
                            </ContextMenu.RadioGroup>
                        </ContextMenu.Content>
                    </ContextMenu.Portal>
                </ContextMenu.Root>
            ) : (
                button
            )}
            {position % 4 === 0 && <div className="Step-downbeat" />}
            {displayPlayhead && <div className="Step-playhead" />}
        </div>
    );
}

function Repeat({ repeat }: { repeat: RepeatType }) {
    const [repeatIndex, repeatDuration] = parseRepeat(repeat);

    return (
        <div className="Step-repeat">
            {[...Array(repeatDuration).keys()].map((index) => {
                const classNames = ["Step-repeat-item"];
                if (index === repeatIndex) {
                    classNames.push(`Step-repeat-item--on`);
                }

                return <div className={classNames.join(" ")} key={index} />;
            })}
        </div>
    );
}

export default Step;
