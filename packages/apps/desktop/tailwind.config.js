const { config } = require("@encontrei/tailwind-config");

/** @type {import("tailwindcss").Config} */
module.exports = {
  ...config,
  darkMode: "class",
  content: [...config.content, "./index.html"],
  theme: {
    ...config.theme,
    extend: {
      ...config.theme.extend,
      keyframes: {
        sidebarEntrance: {
          "100%": { left: 0 },
        },
        slideRightAndFade: {
          "0%": { opacity: 0, transform: "translateX(-2px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        loading: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        fade: {
          "100%": { opacity: 1 },
        },
        draggingInArrowLine: {
          "100%": { width: "18px", height: "6px" },
        },
        draggingOutArrowLine: {
          "0%": { width: "18px", height: "6px" },
          "100%": { width: "8px", height: "20px" },
        },
      },
      animation: {
        sidebarEntrance: "sidebarEntrance 320ms ease forwards",
        slideRightAndFade:
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
        loading: "loading 1s linear infinite",
        fade: "fade 640ms ease forwards",
        draggingInArrowLine:
          "draggingInArrowLine 200ms ease forwards alternate",
        draggingOutArrowLine:
          "draggingOutArrowLine 200ms ease forwards alternate",
      },
    },
  },
};
