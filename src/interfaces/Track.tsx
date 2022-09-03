import Sample from "./Sample";
import Step from "./Step";
import Volume from "./Volume";

export const STEP_LENGTH = 16;

export type TrackColor = "purple" | "yellow" | "green" | "mint" | "pink";

interface Track {
    readonly id: number;
    readonly sample: Sample;
    readonly name: string;
    readonly description?: string;
    readonly color: TrackColor;
    readonly steps: Step[];
    readonly volume: Volume;
}

function defaultSteps(): Step[] {
    const steps = [];
    for (let index = 0; index < STEP_LENGTH; index++) {
        steps.push({
            isOn: false,
        });
    }

    return steps;
}

function defaultVolume(): Volume {
    return {
        value: 0,
        isMuted: false,
    };
}

export function defaultTracks(): Track[] {
    return [
        {
            id: 0,
            sample: Sample.BassDrum,
            name: "Bass Drum",
            color: "purple",
            steps: defaultSteps(),
            volume: defaultVolume(),
        },
        {
            id: 1,
            sample: Sample.Snare,
            name: "Snare",
            color: "yellow",
            steps: defaultSteps(),
            volume: defaultVolume(),
        },
        {
            id: 2,
            sample: Sample.HihatClosed,
            name: "Hihat",
            description: "Closed",
            color: "green",
            steps: defaultSteps(),
            volume: defaultVolume(),
        },
        {
            id: 3,
            sample: Sample.HihatOpen,
            name: "Hihat",
            description: "Open",
            color: "green",
            steps: defaultSteps(),
            volume: defaultVolume(),
        },
    ];
}

export default Track;
