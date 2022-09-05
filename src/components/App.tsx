import React, { useState, useRef, useEffect } from "react";
import produce from "immer";
import Sequencer from "../Sequencer";
import Pattern, { defaultPattern } from "../interfaces/Pattern";
import Header from "./Header";
import Track from "./Track";
import Footer from "./Footer";

const PATTERN_STORAGE_KEY = "pattern";
const PATTERN_STORAGE_DELAY = 5000;

function App() {
    const [pattern, setPattern] = useState(() => {
        const patternValue = localStorage.getItem(PATTERN_STORAGE_KEY);
        return patternValue
            ? (JSON.parse(patternValue) as Pattern)
            : defaultPattern();
    });
    const [isPlaying, setIsPlaying] = useState(false);
    const [playheadPosition, setPlayheadPosition] = useState(0);
    const sequencer = useRef(new Sequencer(handlePlayheadAdvance));

    useEffect(() => {
        if (isPlaying) {
            (async () => {
                await sequencer.current.start();
            })();
        } else {
            sequencer.current.stop();
        }
    }, [isPlaying]);

    useEffect(() => {
        sequencer.current.update(pattern);
    }, [pattern]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            localStorage.setItem(PATTERN_STORAGE_KEY, JSON.stringify(pattern));
        }, PATTERN_STORAGE_DELAY);

        return () => clearTimeout(timeoutId);
    }, [pattern]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "p") {
                handlePlayStop();

                return;
            }

            const trackKeys = [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "0",
                "-",
            ];
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
        setIsPlaying((isPlaying) => !isPlaying);
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
