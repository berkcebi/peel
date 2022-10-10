import { StateStorage } from "zustand/middleware";

const DELAY = 5000;

interface DebouncedStateStorage extends StateStorage {
    timeoutId?: ReturnType<typeof setTimeout>;
}

export default function debouncedStateStorage(
    storage: StateStorage
): DebouncedStateStorage {
    return {
        getItem(name) {
            return storage.getItem(name);
        },
        setItem(name, value) {
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
            }

            this.timeoutId = setTimeout(() => {
                storage.setItem(name, value);
            }, DELAY);
        },
        removeItem(name) {
            storage.removeItem(name);
        },
    };
}
