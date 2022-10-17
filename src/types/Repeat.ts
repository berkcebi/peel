import { z } from "zod";

export const RepeatSchema = z.enum([
    "0:1",
    "0:2",
    "1:2",
    "0:4",
    "1:4",
    "2:4",
    "3:4",
]);

export const DEFAULT_REPEAT: Repeat = "0:1";
export const ALL_REPEATS = RepeatSchema.options;

export function repeatDescription(repeat: Repeat) {
    switch (repeat) {
        case "0:1":
            return "Always";
        case "0:2":
            return "1:2";
        case "1:2":
            return "2:2";
        case "0:4":
            return "1:4";
        case "1:4":
            return "2:4";
        case "2:4":
            return "3:4";
        case "3:4":
            return "4:4";
    }
}

type Repeat = z.infer<typeof RepeatSchema>;

export default Repeat;
