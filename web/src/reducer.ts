import { produce } from "immer";
import Pattern from "./interfaces/Pattern";

export type Action =
    | { type: "toggleStep"; trackId: number; stepPosition: number }
    | { type: "changeVolume"; trackId: number; volumeValue: number }
    | { type: "mute"; trackId: number }
    | { type: "changeTempo"; tempo: number };

export default function reducer(pattern: Pattern, action: Action): Pattern {
    switch (action.type) {
        case "toggleStep": {
            return produce(pattern, (pattern) => {
                const track = pattern.tracks.find(
                    (track) => track.id === action.trackId
                );
                const step = track?.steps[action.stepPosition];
                if (!step) {
                    return;
                }

                step.isOn = !step.isOn;
            });
        }
        case "changeVolume": {
            return produce(pattern, (pattern) => {
                const track = pattern.tracks.find(
                    (track) => track.id === action.trackId
                );
                if (!track) {
                    return;
                }

                track.volume.value = action.volumeValue;
            });
        }
        case "mute": {
            return produce(pattern, (pattern) => {
                const track = pattern.tracks.find(
                    (track) => track.id === action.trackId
                );
                if (!track) {
                    return;
                }

                track.volume.isMuted = !track.volume.isMuted;
            });
        }
        case "changeTempo": {
            return produce(pattern, (pattern) => {
                pattern.tempo = action.tempo;
            });
        }
    }
}
