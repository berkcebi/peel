import React, { useEffect } from "react";
import sequencer from "../sequencer";
import { useJamStore } from "../store";
import { MIN_TEMPO, MAX_TEMPO } from "../types/Pattern";
import Slider from "./Slider";
import "./Tempo.css";

interface TempoProps {
    value: number;
}

function Tempo({ value }: TempoProps) {
    const changeTempo = useJamStore((state) => state.changeTempo);

    useEffect(() => sequencer.setTempo(value), [value]);

    return (
        <div title={`Tempo ${value} bpm`} className="Tempo">
            <span className="secondary">{value} bpm</span>
            <Slider
                min={MIN_TEMPO}
                max={MAX_TEMPO}
                value={value}
                step={1}
                onChange={(value) => changeTempo(value)}
            />
        </div>
    );
}

export default Tempo;
