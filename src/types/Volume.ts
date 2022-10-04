import { z } from "zod";

export const VOLUME_MIN_VALUE = -60;
export const VOLUME_MAX_VALUE = 0;

export const VolumeSchema = z.object({
    value: z.number().min(VOLUME_MIN_VALUE).max(VOLUME_MAX_VALUE),
    isMuted: z.boolean(),
});

type Volume = z.infer<typeof VolumeSchema>;

export default Volume;
