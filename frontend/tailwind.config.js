/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#4f46e5', // Indigo 600
                    foreground: '#ffffff',
                },
                secondary: {
                    DEFAULT: '#f1f5f9', // Slate 100
                    foreground: '#0f172a', // Slate 900
                },
                background: '#ffffff',
                foreground: '#0f172a', // Slate 900
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
