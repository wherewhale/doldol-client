/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./apps/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/libs/src/utils/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/components/**/*.{js,ts,jsx,tsx}",
    "../../packages/icons/src/icons/**/*.{js,ts,jsx,tsx}",
    "../../packages/config/tailwind.config",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    colors: {
      white: "#ffffff",
      black: "#000000",
      transparent: "transparent",
      primary: {
        light1: "#D1E0E3",
        brand: "#4EB5B5",
        dark1: "#5aa470",
        dark2: "#54765E",
      },
      gray: {
        1: "#454f5d",
        2: "#838a9a",
        3: "#d9d9d9",
        4: "#eaedef",
        5: "#f5f6f7",
      },
      green: {
        1: "#72C2A8",
      },
      purple: {
        1: "#B7A4F5",
      },
      red: {
        1: "#FC2E6C",
      },
      yellow: {
        1: "#FFE48A",
      },
      opaque: {
        primary4: "rgba(0, 205, 60, 0.04)",
        primary20: "rgba(0, 205, 60, 0.2)",
        yellow20: "rgba(255, 237, 1, 0.2)",
        purple20: "rgba(145, 103, 253, 0.2)",
        blue20: "rgba(85, 176, 240, 0.2)",
        red20: "rgba(252, 46, 108, 0.2)",
        black20: "rgba(0, 0, 0, 0.2)",
        gray50: "rgba(245, 246, 247, 0.5)",
        overlay: "rgba(0, 0, 0, 0.6)",
      },
    },
    fontFamily: {
      pretendard: ["Pretendard"],
      minguk: ["YoonChildfundkoreaMinGuk"],
      dahyun: ["Ownglyph_ParkDaHyun"],
    },
    extend: {
      aspectRatio: {
        party: "5 / 3",
      },
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
      },
      gridColumnStart: {
        13: "13",
        14: "14",
        15: "15",
        16: "16",
        17: "17",
      },
      gridColumnEnd: {
        13: "13",
        14: "14",
        15: "15",
        16: "16",
        17: "17",
      },
      screens: {
        desktop: "1280px",
      },
      width: {
        logo: "71px",
        desktop: "1280px",
        lg: "1024px",
        md: "768px",
        sm: "640px",
        center: "620px",
        xs: "320px",
        drawer: "180px",
      },
      height: {
        logo: "32px",
      },
      maxWidth: {
        center: "620px",
      },
      minWidth: {
        xs: "320px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
