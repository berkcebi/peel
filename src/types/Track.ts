import { z } from "zod";
import { SampleSchema } from "./Sample";
import { StepSchema } from "./Step";
import { VolumeSchema } from "./Volume";

export const STEP_LENGTH = 16;

export const TrackColorSchema = z.enum([
    "indigo",
    "yellow",
    "green",
    "cyan",
    "red",
    "pink",
]);

export type TrackColor = z.infer<typeof TrackColorSchema>;

export const TrackSchema = z.object({
    id: z.number().nonnegative(),
    sample: SampleSchema,
    name: z.string().min(1),
    description: z.string().min(1).optional(),
    color: TrackColorSchema,
    steps: z.array(StepSchema).length(STEP_LENGTH),
    volume: VolumeSchema,
});

type Track = z.infer<typeof TrackSchema>;

export default Track;
