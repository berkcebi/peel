import React, { useEffect, useContext } from "react";
import { Context } from "../Context";
import { MIN_TEMPO, MAX_TEMPO } from "../interfaces/Pattern";
import sequencer from "../sequencer";
import Slider from "./Slider";
import "./Tempo.css";

interface TempoProps {
    value: number;
}

function Tempo({ value }: TempoProps) {
    const dispatch = useContext(Context);

    useEffect(() => sequencer.setTempo(value), [value]);

    return (
        <div title={`Tempo ${value} bpm`} className="Tempo">
            <span className="secondary">{value} bpm</span>
            <Slider
                min={MIN_TEMPO}
                max={MAX_TEMPO}
                value={value}
                step={5}
                onChange={(value) =>
                    dispatch({ type: "changeTempo", tempo: value })
                }
            />
        </div>
    );
}

export default Tempo;
