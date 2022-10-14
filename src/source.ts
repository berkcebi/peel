import Source from "./types/Source";

const HASH_REGEX = /^[\da-f]{7}$/;

function getSourceFromLocation(): Source {
    const hash = location.pathname.slice(1);
    if (!hash.length) {
        return { type: "local" };
    }

    if (!HASH_REGEX.test(hash)) {
        console.warn(`Ignored invalid jam hash “${hash}”.`);
        history.replaceState(null, "", location.origin);

        return { type: "local" };
    }

    return { type: "remote", hash };
}

export default getSourceFromLocation();
