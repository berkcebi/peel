import React from "react";
import { MIN_TEMPO, MAX_TEMPO } from "../interfaces/Pattern";
import Slider from "./Slider";
import "./Tempo.css";

interface TempoProps {
    value: number;
    onChange: (value: number) => void;
}

function Tempo({ value, onChange }: TempoProps) {
    return (
        <div title={`Tempo ${value} bpm`} className="Tempo">
            <span className="secondary">{value} bpm</span>
            <Slider
                min={MIN_TEMPO}
                max={MAX_TEMPO}
                value={value}
                step={5}
                onChange={onChange}
            />
        </div>
    );
}

export default Tempo;
