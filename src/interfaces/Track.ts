import Sample from "./Sample";
import Step from "./Step";
import Volume from "./Volume";

export type TrackColor =
    | "indigo"
    | "yellow"
    | "green"
    | "cyan"
    | "red"
    | "pink";

interface Track {
    readonly id: number;
    readonly sample: Sample;
    readonly name: string;
    readonly description?: string;
    readonly color: TrackColor;
    readonly steps: Step[];
    readonly volume: Volume;
}

export default Track;
