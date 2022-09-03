import React, { useState, useRef } from "react";
import produce from "immer";
import Sequencer from "../Sequencer";
import { defaultTracks } from "../interfaces/Track";
import Header from "./Header";
import Track from "./Track";

function App() {
    const [tracks, setTracks] = useState(defaultTracks());
    const [isPlaying, setIsPlaying] = useState(false);
    const [playheadPosition, setPlayheadPosition] = useState(0);
    const sequencer = useRef(new Sequencer());

    async function handleHeaderButtonClick() {
        if (isPlaying) {
            sequencer.current.stop();
        } else {
            await sequencer.current.start(tracks, handlePlayheadAdvance);
        }

        setIsPlaying(!isPlaying);
    }

    function handleStepClick(trackId: number, stepIndex: number) {
        setTracks(
            produce((draftTracks) => {
                const track = draftTracks.find((track) => track.id === trackId);
                const step = track?.steps[stepIndex];
                if (!step) {
                    return;
                }

                step.isOn = !step.isOn;
            })
        );

        // TODO: Update sequencer.
    }

    function handleVolumeChange(trackId: number, volumePercentage: number) {
        setTracks(
            produce((draftTracks) => {
                const track = draftTracks.find((track) => track.id === trackId);
                if (!track) {
                    return;
                }

                track.volume.percentage = volumePercentage;
            })
        );
    }

    function handlePlayheadAdvance(position: number) {
        setPlayheadPosition(position);
    }

    return (
        <>
            <Header
                isPlaying={isPlaying}
                onButtonClick={handleHeaderButtonClick}
            />
            {tracks.map((track) => (
                <Track
                    track={track}
                    onStepClick={handleStepClick}
                    onVolumeChange={handleVolumeChange}
                    key={track.id}
                />
            ))}
            {/* TODO: Highlight step buttons instead. */}
            {isPlaying && <span className="secondary">{playheadPosition}</span>}
        </>
    );
}

export default App;
