import Jam, { JamSchema, defaultJam } from "./types/Jam";

const JAM_KEY = "jam";

export function getJam(): Jam {
    try {
        const jamValue = localStorage.getItem(JAM_KEY);
        if (!jamValue) {
            return defaultJam();
        }

        const jamObject = JSON.parse(jamValue);

        return JamSchema.parse(jamObject);
    } catch (error) {
        console.error("Reading jam from local storage failed", error);

        return defaultJam();
    }
}

export function setJam(jam: Jam) {
    localStorage.setItem(JAM_KEY, JSON.stringify(jam));
}
