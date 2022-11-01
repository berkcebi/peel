import React, { useEffect } from "react";
import sequencer from "../sequencer";
import { useJamStore } from "../store";
import { MIN_TEMPO, MAX_TEMPO } from "../types/Pattern";
import Slider from "./Slider";

interface TempoProps {
    value: number;
}

function Tempo({ value }: TempoProps) {
    const changeTempo = useJamStore((state) => state.changeTempo);

    useEffect(() => sequencer.setTempo(value), [value]);

    return (
        <div title={`Tempo ${value} bpm`} className="flex items-center gap-3">
            <span className="text-gray">{value} bpm</span>
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
