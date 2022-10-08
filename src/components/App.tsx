import React, { useState, useEffect, useReducer } from "react";
import { Context } from "../Context";
import reducer from "../reducer";
import sequencer from "../sequencer";
import Jam, { JamSchema } from "../types/Jam";
import { defaultPattern } from "../types/Pattern";
import Footer from "./Footer";
import Header from "./Header";
import Toast from "./Toast";
import Track from "./Track";

const STORAGE_KEY = "jam";
const DEPRECATED_STORAGE_KEY = "pattern";
const STORAGE_DELAY = 5000;
// prettier-ignore
const TRACK_SHORTCUT_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-"];

function App() {
    const [pattern, dispatch] = useReducer(reducer, undefined, () => {
        try {
            const jamValue = localStorage.getItem(STORAGE_KEY);
            if (!jamValue) {
                return defaultPattern();
            }

            const jamObject = JSON.parse(jamValue);
            const jam = JamSchema.parse(jamObject);

            return jam.patterns[0];
        } catch (error) {
            console.error("Reading jam from local storage failed", error);

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
                const jam: Jam = { patterns: [pattern] };
                const parsedJam = JamSchema.parse(jam);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedJam));

                // TODO: Remove after November 5, 2022.
                localStorage.removeItem(DEPRECATED_STORAGE_KEY);
            } catch (error) {
                console.error("Writing jam to local storage failed", error);
            }
        }, STORAGE_DELAY);

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
            <Toast />
        </Context.Provider>
    );
}

export default App;
