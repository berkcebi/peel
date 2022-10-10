import React, { useState, useEffect } from "react";
import sequencer from "../sequencer";
import { usePatternStore } from "../store";
import Footer from "./Footer";
import Header from "./Header";
import Toast from "./Toast";
import Track from "./Track";

// prettier-ignore
const TRACK_SHORTCUT_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-"];

function App() {
    const pattern = usePatternStore((state) => state.pattern);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playheadPosition, setPlayheadPosition] = useState(0);

    useEffect(() => {
        if (isPlaying) {
            (async () => {
                await sequencer.start();
            })();
        } else {
            sequencer.stop();
        }
    }, [isPlaying]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === "Space") {
                event.preventDefault();

                handlePlayStop();
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

    sequencer.onCurrentSixteenthChange = (currentSixteenth: number) =>
        setPlayheadPosition(currentSixteenth);

    return (
        <>
            <Header
                isPlaying={isPlaying}
                playheadPosition={playheadPosition}
                tempo={pattern.tempo}
                onPlayStop={handlePlayStop}
            />
            {pattern.tracks.map((track, index) => (
                <Track
                    track={track}
                    shortcutKey={TRACK_SHORTCUT_KEYS[index]}
                    playheadPosition={
                        isPlaying && index === 0 ? playheadPosition : undefined
                    }
                    key={track.id}
                />
            ))}
            <Footer />
            <Toast />
        </>
    );
}

export default App;
