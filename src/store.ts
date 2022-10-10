import create from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import Pattern, { defaultPattern } from "./types/Pattern";
import debouncedStateStorage from "./utils/debouncedStateStorage";

const PATTERN_PERSIST_NAME = "pattern";

interface PatternState {
    pattern: Pattern;
    toggleStep: (trackId: number, stepPosition: number) => void;
    changeVolume: (trackId: number, volumeValue: number) => void;
    mute: (trackId: number) => void;
    changeTempo: (tempo: number) => void;
}

export const usePatternStore = create<PatternState>()(
    persist(
        immer((set) => ({
            pattern: defaultPattern(),
            toggleStep: (trackId, stepPosition) =>
                set((state) => {
                    const track = state.pattern.tracks.find(
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
                    const track = state.pattern.tracks.find(
                        (track) => track.id === trackId
                    );
                    if (!track) {
                        return;
                    }

                    track.volume.value = volumeValue;
                }),
            mute: (trackId) =>
                set((state) => {
                    const track = state.pattern.tracks.find(
                        (track) => track.id === trackId
                    );
                    if (!track) {
                        return;
                    }

                    track.volume.isMuted = !track.volume.isMuted;
                }),
            changeTempo: (tempo) =>
                set((state) => {
                    state.pattern.tempo = tempo;
                }),
        })),
        {
            name: PATTERN_PERSIST_NAME,
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
