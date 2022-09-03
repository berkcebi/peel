import * as Tone from "tone";
import Track from "./interfaces/Track";
import { ALL_SAMPLES } from "./interfaces/Sample";

class Sequencer {
    private samplePlayers: Tone.Players;

    constructor() {
        this.samplePlayers = new Tone.Players({
            urls: ALL_SAMPLES.reduce((urls, sample) => {
                return {
                    ...urls,
                    [sample]: `${sample}.wav`,
                };
            }, {}),
            baseUrl: "/samples/",
        }).toDestination();
    }

    async start(
        tracks: Track[],
        onPlayheadAdvance?: (stepIndex: number) => void
    ) {
        await Tone.start();

        if (onPlayheadAdvance) {
            let playheadPosition = 0;
            onPlayheadAdvance(playheadPosition);

            Tone.Transport.scheduleRepeat((time) => {
                Tone.Draw.schedule(function () {
                    playheadPosition = (playheadPosition + 1) % 16;
                    onPlayheadAdvance(playheadPosition);
                }, time);
            }, "0:0:1");
        }

        for (const track of tracks) {
            const steps = track.steps;
            for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
                let step = steps[stepIndex];
                if (!step.isOn) {
                    continue;
                }

                Tone.Transport.scheduleRepeat(
                    (time) => {
                        this.samplePlayers.player(track.sample).start(time);
                    },
                    "1:0:0",
                    `0:0:${stepIndex}`
                );
            }
        }

        Tone.Transport.start();
    }

    update(tracks: Track[]) {
        for (const track of tracks) {
            const samplePlayer = this.samplePlayers.player(track.sample);
            samplePlayer.volume.value = track.volume.value;
        }

        if (Tone.Transport.state !== "started") {
            return;
        }

        // TODO: Update transport repeat events.
    }

    stop() {
        Tone.Transport.stop();
        Tone.Transport.cancel();
    }
}

export default Sequencer;
