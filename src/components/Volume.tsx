import React from "react";
import VolumeType, {
    VOLUME_MIN_VALUE,
    VOLUME_MAX_VALUE,
} from "../types/Volume";
import Slider from "./Slider";

interface VolumeProps {
    volume: VolumeType;
    onChange: (value: number) => void;
}

function Volume({ volume, onChange }: VolumeProps) {
    return (
        <div
            title={`Volume ${volume.value} dB${
                volume.isMuted ? " (Muted)" : ""
            }`}
            className="ml-3"
        >
            <Slider
                min={VOLUME_MIN_VALUE}
                max={VOLUME_MAX_VALUE}
                value={volume.value}
                onChange={onChange}
            />
        </div>
    );
}

export default Volume;
