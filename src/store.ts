import create from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import Jam, { PATTERN_INDEX, defaultJam } from "./types/Jam";
import debouncedStateStorage from "./utils/debouncedStateStorage";

const JAM_PERSIST_NAME = "jam";

interface JamState {
    jam: Jam;
    toggleStep: (trackId: number, stepPosition: number) => void;
    changeVolume: (trackId: number, volumeValue: number) => void;
    mute: (trackId: number) => void;
    changeTempo: (tempo: number) => void;
}

export const useJamStore = create<JamState>()(
    persist(
        immer((set) => ({
            jam: defaultJam(),
            toggleStep: (trackId, stepPosition) =>
                set((state) => {
                    const pattern = state.jam.patterns[PATTERN_INDEX];
                    const track = pattern.tracks.find(
                        (track) => track.id === trackId
                    );
                    const step = track?.steps[stepPosition];
                    if (!step) {
                        return;
                    }

                    step.isOn = !step.isOn;
                }),
            changeVolume: (trackId, volumeValue) =>
                set((state) => {
                    const pattern = state.jam.patterns[PATTERN_INDEX];
                    const track = pattern.tracks.find(
                        (track) => track.id === trackId
                    );
                    if (!track) {
                        return;
                    }

                    track.volume.value = volumeValue;
                }),
            mute: (trackId) =>
                set((state) => {
                    const pattern = state.jam.patterns[PATTERN_INDEX];
                    const track = pattern.tracks.find(
                        (track) => track.id === trackId
                    );
                    if (!track) {
                        return;
                    }

                    track.volume.isMuted = !track.volume.isMuted;
                }),
            changeTempo: (tempo) =>
                set((state) => {
                    const pattern = state.jam.patterns[PATTERN_INDEX];
                    pattern.tempo = tempo;
                }),
        })),
        {
            name: JAM_PERSIST_NAME,
            getStorage: () => debouncedStateStorage(localStorage),
        }
    )
);

interface ToastState {
    message?: string;
    setMessage: (message?: string) => void;
}

export const useToastStore = create<ToastState>()(
    immer((set) => ({
        message: undefined,
        setMessage: (message) =>
            set((state) => {
                state.message = message;
            }),
    }))
);
