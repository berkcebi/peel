import React, { useState } from "react";
import produce from "immer";
import { defaultTracks } from "../interfaces/Track";
import Track from "./Track";

function App() {
    const [tracks, setTracks] = useState(defaultTracks());

    function handleStepClick(trackId: number, stepIndex: number) {
        setTracks(
            produce((draftTracks) => {
                const track = draftTracks.find((track) => track.id === trackId);
                if (!track) {
                    return;
                }

                const step = track.steps[stepIndex];
                if (!step) {
                    return;
                }

                step.isOn = !step.isOn;
            })
        );
    }

    return (
        <>
            peel
            {tracks.map((track) => (
                <Track
                    track={track}
                    onStepClick={handleStepClick}
                    key={track.id}
                />
            ))}
        </>
    );
}

export default App;
