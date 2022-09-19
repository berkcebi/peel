import React from "react";
import Slider from "./Slider";
import VolumeInterface, {
    VOLUME_MIN_VALUE,
    VOLUME_MAX_VALUE,
} from "../interfaces/Volume";
import "./Volume.css";

interface VolumeProps {
    volume: VolumeInterface;
    onChange: (value: number) => void;
}

function Volume({ volume, onChange }: VolumeProps) {
    return (
        <div
            title={`Volume ${volume.value} dB${
                volume.isMuted ? " (Muted)" : ""
            }`}
            className="Volume"
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
