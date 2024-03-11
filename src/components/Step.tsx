import * as ContextMenu from "@radix-ui/react-context-menu";
import clsx from "clsx";
import React, { useEffect } from "react";
import sequencer from "../sequencer";
import { useJamStore } from "../store";
import RepeatType, {
    ALL_REPEATS,
    DEFAULT_REPEAT,
    getRepeatDescription,
    parseRepeat,
} from "../types/Repeat";
import Sample from "../types/Sample";
import StepType from "../types/Step";
import { TrackColor } from "../types/Track";
import "./Step.css";

const SAMPLE_EMOJIS = new Map<Sample, string>([
    ["clap", "👏"],
    ["cowbell", "🐮"],
]);

interface StepProps {
    step: StepType;
    position: number;
    trackId: number;
    trackSample: Sample;
    trackColor: TrackColor;
}

function Step({ step, position, trackId, trackSample, trackColor }: StepProps) {
    const toggleStep = useJamStore((state) => state.toggleStep);
    const toggleStepAccent = useJamStore((state) => state.toggleStepAccent);
    const changeStepRepeat = useJamStore((state) => state.changeStepRepeat);

    useEffect(
        () =>
            sequencer.setStepOn(
                trackSample,
                position,
                step.accent ?? false,
                step.repeat ?? DEFAULT_REPEAT,
                step.isOn,
            ),
        [step.isOn, step.accent, step.repeat, position, trackSample],
    );

    const emoji = step.isOn && SAMPLE_EMOJIS.get(trackSample);

    const button = (
        <button
            className={clsx(
                "Step-button",
                step.isOn && `Step-button--on-${trackColor}`,
                (step.accent || step.repeat) && "Step-button--has-context-menu",
            )}
            aria-label={`Step ${position + 1}`}
            onClick={() => toggleStep(trackId, position)}
        >
            {step.accent && <div className="Step-accent" />}
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
                        <ContextMenu.Content className="Menu-Content">
                            <ContextMenu.CheckboxItem
                                className="Menu-Item"
                                checked={step.accent}
                                onCheckedChange={() => {
                                    toggleStepAccent(trackId, position);
                                }}
                            >
                                <ContextMenu.ItemIndicator className="Menu-Item-Indicator">
                                    {"*"}
                                </ContextMenu.ItemIndicator>
                                Accent
                            </ContextMenu.CheckboxItem>
                            <ContextMenu.Separator className="Menu-Separator" />
                            <ContextMenu.Label className="Menu-Label">
                                Repeat
                            </ContextMenu.Label>
                            <ContextMenu.RadioGroup
                                value={step.repeat ?? DEFAULT_REPEAT}
                                onValueChange={(repeat) => {
                                    changeStepRepeat(
                                        trackId,
                                        position,
                                        repeat as RepeatType,
                                    );
                                }}
                            >
                                {ALL_REPEATS.map((repeat, index) => (
                                    <ContextMenu.RadioItem
                                        value={repeat}
                                        key={index}
                                        className="Menu-Item"
                                    >
                                        <ContextMenu.ItemIndicator className="Menu-Item-Indicator">
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
        </div>
    );
}

function Repeat({ repeat }: { repeat: RepeatType }) {
    const [repeatIndex, repeatDuration] = parseRepeat(repeat);

    return (
        <div className="Step-repeat">
            {[...Array(repeatDuration).keys()].map((index) => {
                return (
                    <div
                        className={clsx(
                            "Step-repeat-item",
                            index === repeatIndex && "Step-repeat-item--on",
                        )}
                        key={index}
                    />
                );
            })}
        </div>
    );
}

export default Step;
