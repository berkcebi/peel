import React from "react";
import { MIN_TEMPO, MAX_TEMPO } from "../interfaces/Pattern";
import Slider from "./Slider";
import "./Tempo.css";

function Tempo(props: { value: number; onChange: (value: number) => void }) {
    return (
        <div title={`Tempo ${props.value} bpm`} className="Tempo">
            <span className="secondary">{props.value} bpm</span>
            <Slider
                min={MIN_TEMPO}
                max={MAX_TEMPO}
                value={props.value}
                step={5}
                onChange={props.onChange}
            />
        </div>
    );
}

export default Tempo;
