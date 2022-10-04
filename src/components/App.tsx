import React, { useState, useEffect, useReducer } from "react";
import { Context } from "../Context";
import reducer from "../reducer";
import sequencer from "../sequencer";
import { PatternSchema, defaultPattern } from "../types/Pattern";
import Footer from "./Footer";
import Header from "./Header";
import Track from "./Track";

const PATTERN_STORAGE_KEY = "pattern";
const PATTERN_STORAGE_DELAY = 5000;
// prettier-ignore
const TRACK_SHORTCUT_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-"];

function App() {
    const [pattern, dispatch] = useReducer(reducer, undefined, () => {
        try {
            const patternValue = localStorage.getItem(PATTERN_STORAGE_KEY);
            if (!patternValue) {
                return defaultPattern();
            }

            const patternData = JSON.parse(patternValue);

            return PatternSchema.parse(patternData);
        } catch (error) {
            console.error("Reading pattern from local storage failed", error);

            return defaultPattern();
        }
    });
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
        const timeoutId = setTimeout(() => {
            try {
                const parsedPattern = PatternSchema.parse(pattern);
                localStorage.setItem(
                    PATTERN_STORAGE_KEY,
                    JSON.stringify(parsedPattern)
                );
            } catch (error) {
                console.error("Writing pattern to local storage failed", error);
            }
        }, PATTERN_STORAGE_DELAY);

        return () => clearTimeout(timeoutId);
    }, [pattern]);

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
        <Context.Provider value={dispatch}>
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
        </Context.Provider>
    );
}

export default App;
