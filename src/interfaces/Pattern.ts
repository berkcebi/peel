import Track from "./Track";
import Sample from "./Sample";
import Step from "./Step";
import Volume from "./Volume";

export const STEP_LENGTH = 16;
export const MIN_TEMPO = 60;
export const MAX_TEMPO = 180;

interface Pattern {
    readonly tracks: Track[];
    readonly tempo: number;
}

function defaultSteps(): Step[] {
    const steps = [];
    for (let position = 0; position < STEP_LENGTH; position++) {
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

export function defaultPattern(): Pattern {
    return {
        tracks: [
            {
                id: 0,
                sample: Sample.BassDrum,
                name: "Bass Drum",
                color: "indigo",
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
            {
                id: 4,
                sample: Sample.Cymbal,
                name: "Cymbal",
                color: "cyan",
                steps: defaultSteps(),
                volume: defaultVolume(),
            },
            {
                id: 5,
                sample: Sample.TomLow,
                name: "Tom",
                description: "Low",
                color: "red",
                steps: defaultSteps(),
                volume: defaultVolume(),
            },
            {
                id: 6,
                sample: Sample.TomMid,
                name: "Tom",
                description: "Mid",
                color: "red",
                steps: defaultSteps(),
                volume: defaultVolume(),
            },
            {
                id: 7,
                sample: Sample.TomHi,
                name: "Tom",
                description: "Hi",
                color: "red",
                steps: defaultSteps(),
                volume: defaultVolume(),
            },
            {
                id: 8,
                sample: Sample.RimShot,
                name: "Rim Shot",
                color: "pink",
                steps: defaultSteps(),
                volume: defaultVolume(),
            },
            {
                id: 9,
                sample: Sample.Clap,
                name: "Clap",
                color: "pink",
                steps: defaultSteps(),
                volume: defaultVolume(),
            },
            {
                id: 10,
                sample: Sample.Cowbell,
                name: "Cowbell",
                color: "pink",
                steps: defaultSteps(),
                volume: defaultVolume(),
            },
        ],
        tempo: 90,
    };
}

export default Pattern;
