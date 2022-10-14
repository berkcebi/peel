import create from "zustand";
import { immer } from "zustand/middleware/immer";
import Jam, { PATTERN_INDEX } from "./types/Jam";

interface JamState {
    jam?: Jam;
    setJam: (jam: Jam) => void;
    toggleStep: (trackId: number, stepPosition: number) => void;
    changeVolume: (trackId: number, volumeValue: number) => void;
    mute: (trackId: number) => void;
    changeTempo: (tempo: number) => void;
}

export const useJamStore = create<JamState>()(
    immer((set) => ({
        jam: undefined,
        setJam: (jam) =>
            set((state) => {
                state.jam = jam;
            }),
        toggleStep: (trackId, stepPosition) =>
            set((state) => {
                const pattern = state.jam?.patterns[PATTERN_INDEX];
                const track = pattern?.tracks.find(
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
                const pattern = state.jam?.patterns[PATTERN_INDEX];
                const track = pattern?.tracks.find(
                    (track) => track.id === trackId
                );
                if (!track) {
                    return;
                }

                track.volume.value = volumeValue;
            }),
        mute: (trackId) =>
            set((state) => {
                const pattern = state.jam?.patterns[PATTERN_INDEX];
                const track = pattern?.tracks.find(
                    (track) => track.id === trackId
                );
                if (!track) {
                    return;
                }

                track.volume.isMuted = !track.volume.isMuted;
            }),
        changeTempo: (tempo) =>
            set((state) => {
                const pattern = state.jam?.patterns[PATTERN_INDEX];
                if (!pattern) {
                    return;
                }

                pattern.tempo = tempo;
            }),
    }))
);

interface PlayState {
    isPlaying: boolean;
    playheadPosition: number;
    toggleIsPlaying: () => void;
    setPlayheadPosition: (playheadPosition: number) => void;
}

export const usePlayStore = create<PlayState>()(
    immer((set) => ({
        isPlaying: false,
        playheadPosition: 0,
        toggleIsPlaying: () =>
            set((state) => {
                state.isPlaying = !state.isPlaying;
            }),
        setPlayheadPosition: (playheadPosition) =>
            set((state) => {
                state.playheadPosition = playheadPosition;
            }),
    }))
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
