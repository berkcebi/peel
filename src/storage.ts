import Jam, { getDefaultJam, JamSchema } from "./types/Jam";

const JAM_KEY = "jam";

export function getJam(): Jam {
    try {
        const jamValue = localStorage.getItem(JAM_KEY);
        if (!jamValue) {
            return getDefaultJam();
        }

        const jamObject = JSON.parse(jamValue);

        return JamSchema.parse(jamObject);
    } catch (error) {
        console.error("Reading jam from local storage failed", error);

        return getDefaultJam();
    }
}

export function setJam(jam: Jam) {
    localStorage.setItem(JAM_KEY, JSON.stringify(jam));
}
