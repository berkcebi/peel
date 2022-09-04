import React, { useState, useRef, useEffect } from "react";
import produce from "immer";
import Sequencer from "../Sequencer";
import { defaultTracks } from "../interfaces/Track";
import Header from "./Header";
import Track from "./Track";

function App() {
    const [tracks, setTracks] = useState(defaultTracks());
    const [isPlaying, setIsPlaying] = useState(false);
    const [playheadPosition, setPlayheadPosition] = useState(0);
    const sequencer = useRef(new Sequencer(handlePlayheadAdvance));

    useEffect(() => {
        sequencer.current.update(tracks);
    }, [tracks]);

    async function handleHeaderButtonClick() {
        if (isPlaying) {
            sequencer.current.stop();
        } else {
            await sequencer.current.start();
        }

        setIsPlaying(!isPlaying);
    }

    function handleStepClick(trackId: number, stepPosition: number) {
        setTracks(
            produce((draftTracks) => {
                const track = draftTracks.find((track) => track.id === trackId);
                const step = track?.steps[stepPosition];
                if (!step) {
                    return;
                }

                step.isOn = !step.isOn;
            })
        );
    }

    function handleVolumeChange(trackId: number, volumeValue: number) {
        setTracks(
            produce((draftTracks) => {
                const track = draftTracks.find((track) => track.id === trackId);
                if (!track) {
                    return;
                }

                track.volume.value = volumeValue;
            })
        );
    }

    function handleMute(trackId: number) {
        setTracks(
            produce((draftTracks) => {
                const track = draftTracks.find((track) => track.id === trackId);
                if (!track) {
                    return;
                }

                track.volume.isMuted = !track.volume.isMuted;
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
            {tracks.map((track, index) => (
                <Track
                    track={track}
                    playheadPosition={
                        isPlaying && index === 0 ? playheadPosition : undefined
                    }
                    onStepClick={handleStepClick}
                    onVolumeChange={handleVolumeChange}
                    onMute={handleMute}
                    key={track.id}
                />
            ))}
        </>
    );
}

export default App;
