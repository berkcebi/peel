import React from "react";
import "./Slider.css";

function Slider(props: {
    min: number;
    max: number;
    value: number;
    step?: number;
    onChange: (value: number) => void;
}) {
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        props.onChange(event.target.valueAsNumber);
    }

    return (
        <input
            type="range"
            min={props.min}
            max={props.max}
            value={props.value}
            step={props.step || 1}
            onChange={handleChange}
        />
    );
}

export default Slider;
