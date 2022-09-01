import React, { useState } from "react";
import produce from "immer";
import { defaultTracks } from "../interfaces/Track";
import Header from "./Header";
import Track from "./Track";

function App() {
    const [tracks, setTracks] = useState(defaultTracks());
    const [isPlaying, setIsPlaying] = useState(false);

    function handleHeaderButtonClick() {
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
        </>
    );
}

export default App;
