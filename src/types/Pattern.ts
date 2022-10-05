import { z } from "zod";
import Step from "./Step";
import { TrackSchema, STEP_LENGTH } from "./Track";
import Volume from "./Volume";

export const MIN_TEMPO = 60;
export const MAX_TEMPO = 180;

export const PatternSchema = z.object({
    tracks: z.array(TrackSchema).nonempty(),
    tempo: z.number().gte(MIN_TEMPO).lte(MAX_TEMPO),
});

type Pattern = z.infer<typeof PatternSchema>;

function defaultSteps() {
    const steps: Step[] = [];
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
                sample: "bass-drum",
                name: "Bass Drum",
                color: "indigo",
                steps: defaultSteps(),
                volume: defaultVolume(),
            },
            {
                id: 1,
                sample: "snare",
                name: "Snare",
                color: "yellow",
                steps: defaultSteps(),
                volume: defaultVolume(),
            },
            {
                id: 2,
                sample: "hihat-closed",
                name: "Hihat",
                description: "Closed",
                color: "green",
                steps: defaultSteps(),
                volume: defaultVolume(),
            },
            {
                id: 3,
                sample: "hihat-open",
                name: "Hihat",
                description: "Open",
                color: "green",
                steps: defaultSteps(),
                volume: defaultVolume(),
            },
            {
                id: 4,
                sample: "cymbal",
                name: "Cymbal",
                color: "cyan",
                steps: defaultSteps(),
                volume: defaultVolume(),
            },
            {
                id: 5,
                sample: "tom-low",
                name: "Tom",
                description: "Low",
                color: "red",
                steps: defaultSteps(),
                volume: defaultVolume(),
            },
            {
                id: 6,
                sample: "tom-mid",
                name: "Tom",
                description: "Mid",
                color: "red",
                steps: defaultSteps(),
                volume: defaultVolume(),
            },
            {
                id: 7,
                sample: "tom-hi",
                name: "Tom",
                description: "Hi",
                color: "red",
                steps: defaultSteps(),
                volume: defaultVolume(),
            },
            {
                id: 8,
                sample: "rim-shot",
                name: "Rim Shot",
                color: "pink",
                steps: defaultSteps(),
                volume: defaultVolume(),
            },
            {
                id: 9,
                sample: "clap",
                name: "Clap",
                color: "pink",
                steps: defaultSteps(),
                volume: defaultVolume(),
            },
            {
                id: 10,
                sample: "cowbell",
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
