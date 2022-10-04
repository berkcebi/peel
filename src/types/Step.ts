import { z } from "zod";

export const StepSchema = z.object({
    isOn: z.boolean(),
});

type Step = z.infer<typeof StepSchema>;

export default Step;
