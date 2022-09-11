import React, { useState, useRef, useEffect, useReducer } from "react";
import Sequencer from "../Sequencer";
import reducer from "../reducer";
import Pattern, { defaultPattern } from "../interfaces/Pattern";
import Header from "./Header";
import Track from "./Track";
import Footer from "./Footer";

const PATTERN_STORAGE_KEY = "pattern";
const PATTERN_STORAGE_DELAY = 5000;

function App() {
    const [pattern, dispatch] = useReducer(reducer, undefined, () => {
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
                dispatch({ type: "mute", trackId });
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
        dispatch({ type: "toggleStep", trackId, stepPosition });
    }

    function handleVolumeChange(trackId: number, volumeValue: number) {
        dispatch({ type: "changeVolume", trackId, volumeValue });
    }

    function handleMute(trackId: number) {
        dispatch({ type: "mute", trackId });
    }

    function handleTempoChange(tempo: number) {
        dispatch({ type: "changeTempo", tempo });
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
