/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#040d1a',
        navbar: '#071529',
        card: '#0a1d37',
        border: '#1b3453',
        primary: '#3b82f6',
        phishing: '#ef4444',
        suspicious: '#f59e0b',
        safe: '#10b981',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Share Tech Mono"', 'monospace'],
        sans: ['"Space Grotesk"', 'Syne', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
