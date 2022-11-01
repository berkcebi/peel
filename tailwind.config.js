/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            white: "#fff",
            "light-gray": "#f2f2f2",
            gray: "#808080",
            black: {
                DEFAULT: "#1a1a1a",
                5: "rgba(0, 0, 0, 0.05)",
                10: "rgba(0, 0, 0, 0.1)",
                20: "rgba(0, 0, 0, 0.2)",
            },
            blue: {
                DEFAULT: "#007aff",
                25: "rgba(0, 122, 255, 0.25)",
            },
            red: {
                DEFAULT: "red",
                10: "rgba(255, 0, 0, 0.1)",
            },
            indigo: "#5856d6",
            yellow: "#ffcc00",
            green: "#34c759",
            cyan: "#32ade6",
            // TODO: Add actual red.
            pink: "#ffdfe5",
        },
        fontFamily: {
            DEFAULT: ["Space Mono", "monospace"],
        },
    },
    plugins: [],
};
