import Step from "./Step";

const DEFAULT_STEP_LENGTH = 16;

export type TrackColor = "purple" | "yellow" | "green" | "mint" | "pink";

interface Track {
    readonly id: number;
    readonly name: string;
    readonly description?: string;
    readonly color: TrackColor;
    readonly steps: Step[];
    readonly volume: number;
    readonly isMuted: boolean;
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

export function defaultTracks(): Track[] {
    return [
        {
            id: 0,
            name: "Bass Drum",
            color: "purple",
            steps: defaultSteps(),
            volume: 1.0,
            isMuted: false,
        },
        {
            id: 1,
            name: "Snare",
            color: "yellow",
            steps: defaultSteps(),
            volume: 1.0,
            isMuted: false,
        },
        {
            id: 2,
            name: "Hihat",
            description: "Open",
            color: "green",
            steps: defaultSteps(),
            volume: 1.0,
            isMuted: false,
        },
        {
            id: 3,
            name: "Hihat",
            description: "Closed",
            color: "green",
            steps: defaultSteps(),
            volume: 1.0,
            isMuted: false,
        },
    ];
}

export default Track;
