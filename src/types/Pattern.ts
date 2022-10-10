import { z } from "zod";
import { TrackSchema } from "./Track";

export const MIN_TEMPO = 60;
export const MAX_TEMPO = 180;

export const PatternSchema = z.object({
    tracks: z.array(TrackSchema).nonempty(),
    tempo: z.number().gte(MIN_TEMPO).lte(MAX_TEMPO),
});

type Pattern = z.infer<typeof PatternSchema>;

export default Pattern;
