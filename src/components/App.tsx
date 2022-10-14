import React, { useEffect } from "react";
import sequencer from "../sequencer";
import source from "../source";
import * as storage from "../storage";
import { useJamStore, usePlayStore, useToastStore } from "../store";
import { JamSchema, PATTERN_INDEX } from "../types/Jam";
import Footer from "./Footer";
import Header from "./Header";
import Toast from "./Toast";
import Track from "./Track";
import "./App.css";

const STORAGE_DELAY = 5000;
// prettier-ignore
const TRACK_SHORTCUT_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-"];

function App() {
    const jam = useJamStore((state) => state.jam);
    const setJam = useJamStore((state) => state.setJam);
    const isPlaying = usePlayStore((state) => state.isPlaying);
    const setPlayheadPosition = usePlayStore(
        (state) => state.setPlayheadPosition
    );
    const setMessage = useToastStore((state) => state.setMessage);

    useEffect(() => {
        switch (source.type) {
            case "local": {
                const jam = storage.getJam();
                setJam(jam);

                return;
            }
            case "remote": {
                let didCancel = false;

                (async () => {
                    try {
                        const response = await fetch(
                            `https://${
                                import.meta.env.VITE_PEEL_AWS_S3_BUCKET
                            }.s3.amazonaws.com/jams/${source.hash}`
                        );

                        if (didCancel) {
                            return;
                        }

                        const responseJSON = await response.json();
                        const jam = JamSchema.parse(responseJSON);
                        setJam(jam);
                    } catch (error) {
                        console.error("Fetching jam failed", error);

                        setMessage("Fetching link failed");
                    }
                })();

                return () => {
                    didCancel = true;
                };
            }
        }
    }, [setJam, setMessage]);

    useEffect(() => {
        if (!jam || source.type !== "local") {
            return;
        }

        const timeoutId = setTimeout(() => {
            storage.setJam(jam);
        }, STORAGE_DELAY);

        return () => clearTimeout(timeoutId);
    }, [jam]);

    useEffect(() => {
        if (isPlaying) {
            (async () => {
                await sequencer.start();
            })();
        } else {
            sequencer.stop();
        }
    }, [isPlaying]);

    sequencer.onCurrentSixteenthChange = (currentSixteenth: number) =>
        setPlayheadPosition(currentSixteenth);

    if (!jam) {
        return <div className="App-title secondary">Fetching jam…</div>;
    }

    const pattern = jam.patterns[PATTERN_INDEX];

    return (
        <>
            {source.type === "remote" && (
                <div className="App-title">Shared jam</div>
            )}
            <Header />
            {pattern.tracks.map((track, index) => (
                <Track
                    track={track}
                    shortcutKey={TRACK_SHORTCUT_KEYS[index]}
                    isFirst={index === 0}
                    key={track.id}
                />
            ))}
            <Footer tempo={pattern.tempo} />
            <Toast />
        </>
    );
}

export default App;
