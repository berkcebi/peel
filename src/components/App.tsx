import React, { useEffect } from "react";
import sequencer from "../sequencer";
import { useJamStore, usePlayStore } from "../store";
import { PATTERN_INDEX } from "../types/Jam";
import Footer from "./Footer";
import Header from "./Header";
import Toast from "./Toast";
import Track from "./Track";

// prettier-ignore
const TRACK_SHORTCUT_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-"];

function App() {
    const jam = useJamStore((state) => state.jam);
    const isPlaying = usePlayStore((state) => state.isPlaying);
    const setPlayheadPosition = usePlayStore(
        (state) => state.setPlayheadPosition
    );

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

    const pattern = jam.patterns[PATTERN_INDEX];

    return (
        <>
            <Header tempo={pattern.tempo} />
            {pattern.tracks.map((track, index) => (
                <Track
                    track={track}
                    shortcutKey={TRACK_SHORTCUT_KEYS[index]}
                    isFirst={index === 0}
                    key={track.id}
                />
            ))}
            <Footer />
            <Toast />
        </>
    );
}

export default App;
