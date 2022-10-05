import { z } from "zod";
import { PatternSchema } from "./Pattern";

export const JamSchema = z.object({
    patterns: z.array(PatternSchema).nonempty(),
});

type Jam = z.infer<typeof JamSchema>;

export default Jam;
