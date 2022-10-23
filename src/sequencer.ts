import * as Tone from "tone";
import Repeat, { parseRepeat } from "./types/Repeat";
import Sample, { ALL_SAMPLES } from "./types/Sample";

interface Sequencer {
    onCurrentSixteenthChange?: (currentSixteenth: number) => void;
    readonly start: () => void;
    readonly stop: () => void;
    readonly setStepOn: (
        sample: Sample,
        sixteenth: number,
        repeat: Repeat,
        isOn: boolean
    ) => void;
    readonly setVolume: (
        sample: Sample,
        value: number,
        isMuted: boolean
    ) => void;
    readonly setTempo: (tempo: number) => void;
}

const players = new Tone.Players({
    urls: ALL_SAMPLES.reduce((urls, sample) => {
        return {
            ...urls,
            [sample]: `${sample}.wav`,
        };
    }, {}),
    baseUrl: "/samples/",
}).toDestination();

Tone.Transport.scheduleRepeat((time) => {
    Tone.Draw.schedule(() => {
        currentSixteenth = (currentSixteenth + 1) % 16;
        sequencer.onCurrentSixteenthChange?.(currentSixteenth);
    }, time);
}, "0:0:1");

let currentSixteenth = 0;
const transportEventIds = new Map<string, number>();

function getId(sample: string, sixteenth: number) {
    return `${sample}:${sixteenth}`;
}

function addTransportEvent(sample: Sample, sixteenth: number, repeat: Repeat) {
    const id = getId(sample, sixteenth);

    const previousTransportId = transportEventIds.get(id);
    if (previousTransportId) {
        Tone.Transport.clear(previousTransportId);
    }

    const [startBar, intervalBar] = parseRepeat(repeat);

    transportEventIds.set(
        id,
        Tone.Transport.scheduleRepeat(
            (time) => {
                players.player(sample).start(time);
            },
            `${intervalBar}:0:0`,
            `${startBar}:0:${sixteenth}`
        )
    );
}

function removeTransportEvent(sample: Sample, sixteenth: number) {
    const id = getId(sample, sixteenth);
    const transportId = transportEventIds.get(id);
    if (!transportId) {
        return;
    }

    Tone.Transport.clear(transportId);
    transportEventIds.delete(id);
}

const sequencer: Sequencer = {
    async start() {
        await Tone.start();

        currentSixteenth = 0;
        sequencer.onCurrentSixteenthChange?.(currentSixteenth);

        Tone.Transport.start();
    },
    stop() {
        Tone.Transport.stop();
    },
    setStepOn(sample, sixteenth, repeat, isOn) {
        if (isOn) {
            addTransportEvent(sample, sixteenth, repeat);
        } else {
            removeTransportEvent(sample, sixteenth);
        }
    },
    setVolume(sample, value, isMuted) {
        const player = players.player(sample);
        // Set volume and mute together, since setting volume resets mute.
        player.volume.value = value;
        player.mute = isMuted;
    },
    setTempo(tempo) {
        Tone.Transport.bpm.value = tempo;
    },
};

export default sequencer;
