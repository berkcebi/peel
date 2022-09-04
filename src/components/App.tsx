import React, { useState, useRef, useEffect } from "react";
import produce from "immer";
import Sequencer from "../Sequencer";
import { defaultPattern } from "../interfaces/Pattern";
import Header from "./Header";
import Track from "./Track";
import Footer from "./Footer";

function App() {
    const [pattern, setPattern] = useState(defaultPattern());
    const [isPlaying, setIsPlaying] = useState(false);
    const [playheadPosition, setPlayheadPosition] = useState(0);
    const sequencer = useRef(new Sequencer(handlePlayheadAdvance));

    useEffect(() => {
        sequencer.current.update(pattern);
    }, [pattern]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "p") {
                handlePlayStop();

                return;
            }

            const trackKeys = ["1", "2", "3", "4", "5", "6", "7"];
            const trackId = trackKeys.indexOf(event.key);
            if (trackId >= 0) {
                handleMute(trackId);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    function handlePlayStop() {
        setIsPlaying((isPlaying) => {
            if (isPlaying) {
                sequencer.current.stop();
            } else {
                (async () => {
                    await sequencer.current.start();
                })();
            }

            return !isPlaying;
        });
    }

    function handleStepClick(trackId: number, stepPosition: number) {
        setPattern(
            produce((pattern) => {
                const track = pattern.tracks.find(
                    (track) => track.id === trackId
                );
                const step = track?.steps[stepPosition];
                if (!step) {
                    return;
                }

                step.isOn = !step.isOn;
            })
        );
    }

    function handleVolumeChange(trackId: number, volumeValue: number) {
        setPattern(
            produce((pattern) => {
                const track = pattern.tracks.find(
                    (track) => track.id === trackId
                );
                if (!track) {
                    return;
                }

                track.volume.value = volumeValue;
            })
        );
    }

    function handleMute(trackId: number) {
        setPattern(
            produce((pattern) => {
                const track = pattern.tracks.find(
                    (track) => track.id === trackId
                );
                if (!track) {
                    return;
                }

                track.volume.isMuted = !track.volume.isMuted;
            })
        );
    }

    function handleTempoChange(tempo: number) {
        setPattern(
            produce((pattern) => {
                pattern.tempo = tempo;
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
                tempo={pattern.tempo}
                onPlayStop={handlePlayStop}
                onTempoChange={handleTempoChange}
            />
            {pattern.tracks.map((track, index) => (
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
            <Footer />
        </>
    );
}

export default App;
