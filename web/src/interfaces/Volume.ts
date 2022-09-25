interface Volume {
    readonly value: number;
    readonly isMuted: boolean;
}

export const VOLUME_MIN_VALUE = -60;
export const VOLUME_MAX_VALUE = 0;

export default Volume;
