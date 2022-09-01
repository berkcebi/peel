import React from "react";
import Slider from "./Slider";
import VolumeInterface from "../interfaces/Volume";
import "./Volume.css";

function Volume(props: {
    volume: VolumeInterface;
    onChange: (percentage: number) => void;
}) {
    const volume = props.volume;

    return (
        <div title={`Volume ${volume.percentage * 100}%`} className="Volume">
            <Slider
                percentage={volume.percentage}
                onPercentageChange={props.onChange}
            />
        </div>
    );
}

export default Volume;
