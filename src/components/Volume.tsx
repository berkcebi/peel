import React from "react";
import Slider from "./Slider";
import VolumeInterface, {
    VOLUME_MIN_VALUE,
    VOLUME_MAX_VALUE,
} from "../interfaces/Volume";
import "./Volume.css";

function Volume(props: {
    volume: VolumeInterface;
    onChange: (value: number) => void;
}) {
    const volume = props.volume;

    return (
        <div title={`Volume ${volume.value} dB`} className="Volume">
            <Slider
                min={VOLUME_MIN_VALUE}
                max={VOLUME_MAX_VALUE}
                value={volume.value}
                onChange={props.onChange}
            />
        </div>
    );
}

export default Volume;
