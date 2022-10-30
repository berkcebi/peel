import { z } from "zod";
import { RepeatSchema } from "./Repeat";

export const StepSchema = z.object({
    isOn: z.boolean(),
    accent: z.boolean().optional(),
    repeat: RepeatSchema.optional(),
});

type Step = z.infer<typeof StepSchema>;

export default Step;
