import { z } from "zod";

export const RepeatSchema = z.enum([
    "1:1",
    "1:2",
    "2:2",
    "1:4",
    "2:4",
    "3:4",
    "4:4",
]);

export const DEFAULT_REPEAT: Repeat = "1:1";
export const ALL_REPEATS = RepeatSchema.options;

export function getRepeatDescription(repeat: Repeat) {
    switch (repeat) {
        case "1:1":
            return "All bars";
        case "1:2":
            return "1st of 2 bars";
        case "2:2":
            return "2nd of 2 bars";
        case "1:4":
            return "1st of 4 bars";
        case "2:4":
            return "2nd of 4 bars";
        case "3:4":
            return "3rd of 4 bars";
        case "4:4":
            return "4th of 4 bars";
    }
}

export function parseRepeat(repeat: Repeat) {
    const [index, duration] = repeat.split(":");
    if (duration === undefined) {
        throw new Error("Parsing repeat failed");
    }

    return [Number(index) - 1, Number(duration)];
}

type Repeat = z.infer<typeof RepeatSchema>;

export default Repeat;
