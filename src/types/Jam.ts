import { z } from "zod";
import { PatternSchema } from "./Pattern";

export const PATTERN_INDEX = 0;

export const JamSchema = z.object({
    patterns: z.array(PatternSchema).nonempty(),
});

type Jam = z.infer<typeof JamSchema>;

export function getDefaultJam(): Jam {
    return {
        patterns: [
            {
                tracks: [
                    {
                        id: 0,
                        sample: "bass-drum",
                        name: "Bass Drum",
                        color: "indigo",
                        steps: [
                            { isOn: true },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: true },
                            { isOn: false },
                            { isOn: true },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                        ],
                        volume: { value: 0, isMuted: false },
                    },
                    {
                        id: 1,
                        sample: "snare",
                        name: "Snare",
                        color: "yellow",
                        steps: [
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: true },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: true },
                            { isOn: true, repeat: "2:2" },
                            { isOn: false },
                            { isOn: true },
                        ],
                        volume: { value: 0, isMuted: false },
                    },
                    {
                        id: 2,
                        sample: "hihat-closed",
                        name: "Hihat",
                        description: "Closed",
                        color: "green",
                        steps: [
                            { isOn: true, repeat: "2:2" },
                            { isOn: false },
                            { isOn: true },
                            { isOn: false },
                            { isOn: true },
                            { isOn: false },
                            { isOn: true },
                            { isOn: false },
                            { isOn: true },
                            { isOn: false },
                            { isOn: true },
                            { isOn: false },
                            { isOn: true },
                            { isOn: false },
                            { isOn: true },
                            { isOn: false },
                        ],
                        volume: { value: 0, isMuted: false },
                    },
                    {
                        id: 3,
                        sample: "hihat-open",
                        name: "Hihat",
                        description: "Open",
                        color: "green",
                        steps: [
                            { isOn: true, repeat: "1:2" },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                        ],
                        volume: { value: 0, isMuted: false },
                    },
                    {
                        id: 4,
                        sample: "cymbal",
                        name: "Cymbal",
                        color: "cyan",
                        steps: [
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                        ],
                        volume: { value: 0, isMuted: false },
                    },
                    {
                        id: 5,
                        sample: "tom-low",
                        name: "Tom",
                        description: "Low",
                        color: "red",
                        steps: [
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                        ],
                        volume: { value: 0, isMuted: false },
                    },
                    {
                        id: 6,
                        sample: "tom-mid",
                        name: "Tom",
                        description: "Mid",
                        color: "red",
                        steps: [
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                        ],
                        volume: { value: 0, isMuted: false },
                    },
                    {
                        id: 7,
                        sample: "tom-hi",
                        name: "Tom",
                        description: "Hi",
                        color: "red",
                        steps: [
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                        ],
                        volume: { value: 0, isMuted: false },
                    },
                    {
                        id: 8,
                        sample: "rim-shot",
                        name: "Rim Shot",
                        color: "pink",
                        steps: [
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                        ],
                        volume: { value: 0, isMuted: false },
                    },
                    {
                        id: 9,
                        sample: "clap",
                        name: "Clap",
                        color: "pink",
                        steps: [
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                        ],
                        volume: { value: 0, isMuted: false },
                    },
                    {
                        id: 10,
                        sample: "cowbell",
                        name: "Cowbell",
                        color: "pink",
                        steps: [
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                            { isOn: false },
                        ],
                        volume: { value: 0, isMuted: false },
                    },
                ],
                tempo: 90,
            },
        ],
    };
}

export default Jam;
