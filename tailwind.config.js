import tailwindcssAnimate from "tailwindcss-animate";

// Semantic colour scales (intent-based). Saturated accents (400/500/600) are
// theme-aware Apple system colours; tints/deep shades are static. Use the
// intent names in components: success / warning / negative / info.
const SUCCESS = {
  50: "#edfaf1", 100: "#d6f4de", 200: "#b3eac3", 300: "#86dca1",
  400: "rgb(var(--c-green) / <alpha-value>)",
  500: "rgb(var(--c-green) / <alpha-value>)",
  600: "rgb(var(--c-green) / <alpha-value>)",
  700: "#1f7a3a", 800: "#1a5f30", 900: "#174c28", 950: "#082a14",
};
const WARNING = {
  50: "#fff7ed", 100: "#ffedd5", 200: "#fed7aa", 300: "#fdba74",
  400: "rgb(var(--c-orange) / <alpha-value>)",
  500: "rgb(var(--c-orange) / <alpha-value>)",
  600: "rgb(var(--c-orange) / <alpha-value>)",
  700: "#c2410c", 800: "#9a3412", 900: "#7c2d12", 950: "#431407",
};
const NEGATIVE = {
  50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5",
  400: "rgb(var(--c-red) / <alpha-value>)",
  500: "rgb(var(--c-red) / <alpha-value>)",
  600: "rgb(var(--c-red) / <alpha-value>)",
  700: "#b91c1c", 800: "#991b1b", 900: "#7f1d1d", 950: "#450a0a",
};
const INFO = {
  50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd",
  400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb",
  700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a", 950: "#172554",
};

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}", "./.storybook/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // The `neutral` Tailwind palette is remapped to theme-aware CSS
      // variables (see src/index.css). Every `bg-neutral-100`,
      // `text-neutral-500`, `border-neutral-200` etc. across the codebase
      // now flips automatically between light and dark.
      colors: {
        neutral: {
          50: "rgb(var(--neutral-50) / <alpha-value>)",
          100: "rgb(var(--neutral-100) / <alpha-value>)",
          200: "rgb(var(--neutral-200) / <alpha-value>)",
          300: "rgb(var(--neutral-300) / <alpha-value>)",
          400: "rgb(var(--neutral-400) / <alpha-value>)",
          500: "rgb(var(--neutral-500) / <alpha-value>)",
          600: "rgb(var(--neutral-600) / <alpha-value>)",
          700: "rgb(var(--neutral-700) / <alpha-value>)",
          800: "rgb(var(--neutral-800) / <alpha-value>)",
          900: "rgb(var(--neutral-900) / <alpha-value>)",
        },
        // Apple system colors — only the saturated accent shades (400/500/600
        // used for dots, text, toggles, sparklines) are remapped to theme-aware
        // CSS vars; the light tints (50–200) and deep shades (700+) keep their
        // Tailwind defaults so tinted backgrounds/borders still look right.
        // Semantic intent tokens (canonical). Use these in components.
        success: SUCCESS,
        warning: WARNING,
        negative: NEGATIVE,
        info: INFO,
        // Raw colour aliases kept for back-compat (same scales).
        green: SUCCESS,
        orange: WARNING,
        red: NEGATIVE,
        blue: INFO,
        // emerald accents still referenced by a few app spots (sparklines, dots).
        emerald: {
          400: "rgb(var(--c-green) / <alpha-value>)",
          500: "rgb(var(--c-green) / <alpha-value>)",
          600: "rgb(var(--c-green) / <alpha-value>)",
        },
        // shadcn/ui semantic tokens — used by components/ui primitives and
        // the migrated screens.
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: [
          "Geist",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "Geist Mono",
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      letterSpacing: {
        tightish: "-0.02em",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
