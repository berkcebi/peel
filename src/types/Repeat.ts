import { z } from "zod";

export const RepeatSchema = z.enum(["0:1", "0:2", "1:2"]);

export const DEFAULT_REPEAT: Repeat = "0:1";
export const ALL_REPEATS = RepeatSchema.options;

type Repeat = z.infer<typeof RepeatSchema>;

export default Repeat;
