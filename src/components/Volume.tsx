import React from "react";
import Slider from "./Slider";
import VolumeInterface, {
    VOLUME_MIN_VALUE,
    VOLUME_MAX_VALUE,
} from "../interfaces/Volume";
import "./Volume.css";
import { ReactComponent as VolumeIcon } from "./assets/volume.svg";
import { ReactComponent as VolumeMutedIcon } from "./assets/volumeMuted.svg";

interface VolumeProps {
    volume: VolumeInterface;
    onChange: (value: number) => void;
    onMute: () => void;
}

function Volume({ volume, onChange, onMute }: VolumeProps) {
    return (
        <div
            title={`Volume ${volume.value} dB${
                volume.isMuted ? " (Muted)" : ""
            }`}
            className="Volume"
        >
            <button
                className="Volume-mute-button"
                aria-label={volume.isMuted ? "Unmute" : "Mute"}
                onClick={onMute}
            >
                {volume.isMuted ? <VolumeMutedIcon /> : <VolumeIcon />}
            </button>
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
