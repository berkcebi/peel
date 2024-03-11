import { useEffect } from "react";
import sequencer from "../sequencer";
import SOURCE from "../source";
import * as storage from "../storage";
import { useJamStore, usePlayStore, useToastStore } from "../store";
import { JamSchema, PATTERN_INDEX } from "../types/Jam";
import Footer from "./Footer";
import Header from "./Header";
import Title from "./Title";
import Toast from "./Toast";
import Track from "./Track";

const STORAGE_DELAY = 5000;
// prettier-ignore
const TRACK_SHORTCUT_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-"];

function App() {
    const jam = useJamStore((state) => state.jam);
    const setJam = useJamStore((state) => state.setJam);
    const isPlaying = usePlayStore((state) => state.isPlaying);
    const setPlayheadPosition = usePlayStore(
        (state) => state.setPlayheadPosition,
    );
    const setMessage = useToastStore((state) => state.setMessage);

    useEffect(() => {
        switch (SOURCE.type) {
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
                            }.s3.amazonaws.com/jams/${SOURCE.hash}`,
                        );

                        if (didCancel) {
                            return;
                        }

                        const responseJSON = await response.json();
                        const jam = JamSchema.parse(responseJSON);
                        setJam(jam);
                    } catch (error) {
                        console.error("Fetching jam failed", error);

                        setMessage({
                            text: "Fetching jam failed",
                            type: "error",
                        });
                    }
                })();

                return () => {
                    didCancel = true;
                };
            }
        }
    }, [setJam, setMessage]);

    useEffect(() => {
        if (!jam || SOURCE.type !== "local") {
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
        return (
            <>
                <Title />
                <Toast />
            </>
        );
    }

    const pattern = jam.patterns[PATTERN_INDEX];

    return (
        <>
            <Title />
            <Header />
            {pattern.tracks.map((track, index) => (
                <Track
                    track={track}
                    shortcutKey={TRACK_SHORTCUT_KEYS[index]}
                    key={track.id}
                />
            ))}
            <Footer tempo={pattern.tempo} />
            <Toast />
        </>
    );
}

export default App;
