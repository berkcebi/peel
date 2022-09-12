import React, { useContext } from "react";
import { Context } from "../Context";
import TrackInterface from "../interfaces/Track";
import Sample from "../interfaces/Sample";
import Step from "./Step";
import Volume from "./Volume";
import "./Track.css";

const SAMPLE_EMOJIS: { [sample: string]: string } = {
    [Sample.Clap]: "👏",
    [Sample.Cowbell]: "🐮",
};

function Track(props: { track: TrackInterface; playheadPosition?: number }) {
    const dispatch = useContext(Context);
    const track = props.track;
    const trackId = track.id;

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
                    playheadPosition={props.playheadPosition}
                    trackColor={track.color}
                    emoji={SAMPLE_EMOJIS[track.sample]}
                    onClick={(stepPosition) =>
                        dispatch({ type: "toggleStep", trackId, stepPosition })
                    }
                    key={position}
                />
            ))}
            <Volume
                volume={track.volume}
                onChange={(volumeValue) =>
                    dispatch({ type: "changeVolume", trackId, volumeValue })
                }
                onMute={() => dispatch({ type: "mute", trackId })}
            />
        </div>
    );
}

export default Track;
