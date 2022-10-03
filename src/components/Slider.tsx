import React from "react";
import "./Slider.css";

interface SliderProps {
    min: number;
    max: number;
    value: number;
    step?: number;
    onChange: (value: number) => void;
}

function Slider({ min, max, value, step, onChange }: SliderProps) {
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        onChange(event.target.valueAsNumber);
    }

    return (
        <input
            type="range"
            min={min}
            max={max}
            value={value}
            step={step || 1}
            onChange={handleChange}
        />
    );
}

export default Slider;
