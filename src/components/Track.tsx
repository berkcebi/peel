import React from "react";
import TrackInterface from "../interfaces/Track";
import Step from "./Step";
import Volume from "./Volume";
import "./Track.css";

function Track(props: {
    track: TrackInterface;
    playheadPosition?: number;
    onStepClick: (trackId: number, stepPosition: number) => void;
    onVolumeChange: (trackId: number, volumeValue: number) => void;
    onMute: (trackId: number) => void;
}) {
    const track = props.track;

    return (
        <div className="Track">
            <div className="Track-name">
                {track.name}
                {track.description && (
                    <span className="secondary">, {track.description}</span>
                )}
            </div>
            {track.steps.map((step, position) => (
                <Step
                    step={step}
                    position={position}
                    trackColor={track.color}
                    playheadPosition={props.playheadPosition}
                    onClick={(stepPosition) =>
                        props.onStepClick(track.id, stepPosition)
                    }
                    key={position}
                />
            ))}
            <Volume
                volume={track.volume}
                onChange={(volumeValue) =>
                    props.onVolumeChange(track.id, volumeValue)
                }
                onMute={() => props.onMute(track.id)}
            />
        </div>
    );
}

export default Track;
