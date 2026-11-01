/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0d0f18",
          card: "#161927",
          hover: "#22273d",
          border: "#2d334e",
        },
        hotpink: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f472b6",
          400: "#ff4da6",
          DEFAULT: "#ff1493", // 💖 심쿵 핫핑크 대표 컬러
          vivid: "#ff007f",
          600: "#db0072",
          700: "#be185d",
          glow: "rgba(255, 20, 147, 0.45)",
        },
        focus: {
          light: "#ff70ba",
          DEFAULT: "#ff1493",
          dark: "#be185d",
          glow: "rgba(255, 20, 147, 0.45)",
        },
        rest: {
          light: "#6ee7b7",
          DEFAULT: "#10b981",
          dark: "#047857",
          glow: "rgba(16, 185, 129, 0.35)",
        },
      },
      animation: {
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(2deg)' },
        }
      }
    },
  },
  plugins: [],
}
