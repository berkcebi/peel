import Step from "./Step";
import Volume from "./Volume";

const DEFAULT_STEP_LENGTH = 16;

export type TrackColor = "purple" | "yellow" | "green" | "mint" | "pink";

interface Track {
    readonly id: number;
    readonly name: string;
    readonly description?: string;
    readonly color: TrackColor;
    readonly steps: Step[];
    readonly volume: Volume;
}

function defaultSteps(): Step[] {
    const steps = [];
    for (let index = 0; index < DEFAULT_STEP_LENGTH; index++) {
        steps.push({
            isOn: false,
        });
    }

    return steps;
}

function defaultVolume(): Volume {
    return {
        percentage: 1.0,
        isMuted: false,
    };
}

export function defaultTracks(): Track[] {
    return [
        {
            id: 0,
            name: "Bass Drum",
            color: "purple",
            steps: defaultSteps(),
            volume: defaultVolume(),
        },
        {
            id: 1,
            name: "Snare",
            color: "yellow",
            steps: defaultSteps(),
            volume: defaultVolume(),
        },
        {
            id: 2,
            name: "Hihat",
            description: "Open",
            color: "green",
            steps: defaultSteps(),
            volume: defaultVolume(),
        },
        {
            id: 3,
            name: "Hihat",
            description: "Closed",
            color: "green",
            steps: defaultSteps(),
            volume: defaultVolume(),
        },
    ];
}

export default Track;
