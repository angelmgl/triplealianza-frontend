/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            wine: "#C01F1F",
            "wine-light": "#E62525",
            "wine-dark": "#8C1515",
            creme: "#F8F8F7",
            dark: "#1F1A1A",
        },
    },
    plugins: [],
};
