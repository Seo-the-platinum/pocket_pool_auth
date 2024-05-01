import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        grow: {
          "50%": {
            transform: "scale(125%)",
            filter: "brightness(1.25)",
          },
          "100%": {
            transform: "scale(100%)",
            filter: "brightness(1)",
          },
        },
      },
      animation: {
        grow: "grow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
  darkMode: "class",
} satisfies Config;
