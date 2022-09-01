import React from "react";
import "./Slider.css";

function Slider(props: {
    percentage: number;
    onPercentageChange: (value: number) => void;
}) {
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.valueAsNumber / 100;
        props.onPercentageChange(value);
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
