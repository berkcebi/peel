import React from "react";
import "./Slider.css";

function Slider(props: {
    percentage: number;
    onValueChange: (value: number) => void;
}) {
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.valueAsNumber / 100;
        props.onValueChange(value);
    }

    return (
        <input
            type="range"
            value={props.percentage * 100}
            step="5"
            onChange={handleChange}
        />
    );
}

export default Slider;
