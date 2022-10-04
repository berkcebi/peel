import { z } from "zod";

export const SampleSchema = z.enum([
    "bass-drum",
    "snare",
    "hihat-closed",
    "hihat-open",
    "cymbal",
    "tom-low",
    "tom-mid",
    "tom-hi",
    "rim-shot",
    "clap",
    "cowbell",
]);

export const ALL_SAMPLES = SampleSchema.options;

type Sample = z.infer<typeof SampleSchema>;

export default Sample;
