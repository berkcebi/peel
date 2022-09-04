import * as Tone from "tone";
import Track, { STEP_LENGTH } from "./interfaces/Track";
import { ALL_SAMPLES } from "./interfaces/Sample";

class Sequencer {
    private players: Tone.Players;
    private playerEventIds: { [stepId: string]: number };
    private playheadPosition: number;
    private playheadEventId?: number;
    onPlayheadAdvance?: (stepPosition: number) => void;

    constructor(onPlayheadAdvance?: (stepPosition: number) => void) {
        this.players = new Tone.Players({
            urls: ALL_SAMPLES.reduce((urls, sample) => {
                return {
                    ...urls,
                    [sample]: `${sample}.wav`,
                };
            }, {}),
            baseUrl: "/samples/",
        }).toDestination();
        this.playerEventIds = {};
        this.playheadPosition = 0;
        this.onPlayheadAdvance = onPlayheadAdvance;
    }

    private handleOnPlayheadAdvance() {
        this.playheadPosition = (this.playheadPosition + 1) % STEP_LENGTH;

        this.onPlayheadAdvance?.(this.playheadPosition);
    }

    private stepId(trackId: number, stepPosition: number) {
        return `${trackId}-${stepPosition}`;
    }

    private addTransportEvent(track: Track, stepPosition: number) {
        const stepId = this.stepId(track.id, stepPosition);
        if (this.playerEventIds[stepId] !== undefined) {
            return;
        }

        this.playerEventIds[stepId] = Tone.Transport.scheduleRepeat(
            (time) => {
                this.players.player(track.sample).start(time);
            },
            "1:0:0",
            `0:0:${stepPosition}`
        );
    }

    private removeTransportEvent(track: Track, stepPosition: number) {
        const stepId = this.stepId(track.id, stepPosition);
        if (this.playerEventIds[stepId] === undefined) {
            return;
        }

        Tone.Transport.clear(this.playerEventIds[stepId]);
        delete this.playerEventIds[stepId];
    }

    async start() {
        await Tone.start();

        this.playheadPosition = 0;
        this.onPlayheadAdvance?.(this.playheadPosition);

        Tone.Transport.start();
    }

    update(tracks: Track[]) {
        for (const track of tracks) {
            const samplePlayer = this.players.player(track.sample);
            samplePlayer.volume.value = track.volume.value;
            samplePlayer.mute = track.volume.isMuted;

            const steps = track.steps;
            for (
                let stepPosition = 0;
                stepPosition < steps.length;
                stepPosition++
            ) {
                let step = steps[stepPosition];
                if (step.isOn) {
                    this.addTransportEvent(track, stepPosition);
                } else {
                    this.removeTransportEvent(track, stepPosition);
                }
            }
        }

        if (this.playheadEventId === undefined) {
            this.playheadEventId = Tone.Transport.scheduleRepeat((time) => {
                Tone.Draw.schedule(() => {
                    this.handleOnPlayheadAdvance();
                }, time);
            }, "0:0:1");
        }
    }

    stop() {
        Tone.Transport.stop();
    }
}

export default Sequencer;
