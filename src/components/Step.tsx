import * as amplitude from "@amplitude/analytics-browser";
import * as ContextMenu from "@radix-ui/react-context-menu";
import clsx from "clsx";
import React, { useEffect } from "react";
import sequencer from "../sequencer";
import { useJamStore } from "../store";
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
                step.isOn
            ),
        [step.isOn, step.accent, step.repeat, position, trackSample]
    );

    const emoji = step.isOn && SAMPLE_EMOJIS.get(trackSample);

    let className: string;
    switch (trackColor) {
        case "indigo":
            className = "bg-indigo border-black-20";
            break;
        case "yellow":
            className = "bg-yellow border-black-10";
            break;
        case "green":
            className = "bg-green border-black-10";
            break;
        case "cyan":
            className = "bg-cyan border-black-10";
            break;
        case "red":
            // FIXME: Use proper red.
            className = "bg-red border-black-10";
            break;
        case "pink":
            className = "bg-pink border-black-10";
            break;
    }

    const button = (
        <button
            className={clsx(
                "flex h-7 w-7 cursor-default items-center justify-center rounded border-2 border-solid focus:ring-2 focus:ring-blue-25",
                step.isOn ? className : "border-black-5 bg-light-gray",
                (step.accent || step.repeat) && "cursor-context-menu"
            )}
            aria-label={`Step ${position + 1}`}
            onClick={() => toggleStep(trackId, position)}
        >
            {step.accent && (
                <div className="absolute -top-1 -right-1 h-1 w-1 rounded-full bg-gray" />
            )}
            {step.repeat ? (
                <Repeat repeat={step.repeat} />
            ) : (
                emoji && <span className="Step-emoji">{emoji}</span>
            )}
        </button>
    );

    return (
        <div className="relative">
            {step.isOn ? (
                <ContextMenu.Root>
                    <ContextMenu.Trigger>{button}</ContextMenu.Trigger>
                    <ContextMenu.Portal>
                        <ContextMenu.Content className="w-40 select-none rounded bg-white px-0 py-1 shadow-md">
                            <ContextMenu.CheckboxItem
                                className="Context-Menu-Item my-[2px] mx-1 flex h-6 items-center rounded pr-2 pl-6"
                                checked={step.accent}
                                onCheckedChange={() => {
                                    toggleStepAccent(trackId, position);
                                }}
                            >
                                <ContextMenu.ItemIndicator className="w-4">
                                    {"*"}
                                </ContextMenu.ItemIndicator>
                                Accent
                            </ContextMenu.CheckboxItem>
                            <ContextMenu.Separator className="mx-3 my-2 h-[2px] rounded-full bg-black-10" />
                            <ContextMenu.Label className="my-[2px] mx-1 flex h-6 items-center pr-2 pl-6 text-gray">
                                Repeat
                            </ContextMenu.Label>
                            <ContextMenu.RadioGroup
                                value={step.repeat ?? DEFAULT_REPEAT}
                                onValueChange={(repeat) => {
                                    amplitude.track("Change Step Repeat", {
                                        Repeat: repeat,
                                    });

                                    changeStepRepeat(
                                        trackId,
                                        position,
                                        repeat as RepeatType
                                    );
                                }}
                            >
                                {ALL_REPEATS.map((repeat, index) => (
                                    <ContextMenu.RadioItem
                                        value={repeat}
                                        key={index}
                                        className="Context-Menu-Item my-[2px] mx-1 flex h-6 items-center rounded pr-2 pl-6"
                                    >
                                        <ContextMenu.ItemIndicator className="w-4">
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
            {position % 4 === 0 && (
                <div className="absolute -bottom-[6px] left-2 right-2 h-[2px] rounded-full bg-black-10" />
            )}
        </div>
    );
}

function Repeat({ repeat }: { repeat: RepeatType }) {
    const [repeatIndex, repeatDuration] = parseRepeat(repeat);

    return (
        <div className="grid grid-cols-2 gap-[6px]">
            {[...Array(repeatDuration).keys()].map((index) => {
                return (
                    <div
                        className={clsx(
                            "h-1 w-1 rounded-full ring-2 ring-black-20",
                            index === repeatIndex && "bg-white"
                        )}
                        key={index}
                    />
                );
            })}
        </div>
    );
}

export default Step;
