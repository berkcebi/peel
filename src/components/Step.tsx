import React from "react";
import { TrackColor } from "../interfaces/Track";
import StepInterface from "../interfaces/Step";
import "./Step.css";

function Step(props: {
    step: StepInterface;
    index: number;
    trackColor: TrackColor;
    onClick: (index: number) => void;
}) {
    const classNames = ["Step-button"];

    if (props.step.isOn) {
        classNames.push(`Step-button--on-${props.trackColor}`);
    }

    return (
        <div className="Step">
            <button
                className={classNames.join(" ")}
                aria-label={`Step ${props.index + 1}`}
                onClick={() => props.onClick(props.index)}
            />
            {props.index % 4 === 0 && <div className="Step-downbeat" />}
        </div>
    );
}

export default Step;
