// postcss.config.mjs - ¡SOLUCIÓN FINAL para Tailwind v4!
const config = {
  plugins: {
    // ¡CAMBIO CLAVE AQUÍ! Usar '@tailwindcss/postcss' en lugar de 'tailwindcss'
    "@tailwindcss/postcss": {
      // <<< --- ESTE ES EL CAMBIO
      theme: {
        extend: {
          colors: {
            "gray-elephant-light": "#E0E0E0",
            "gray-elephant-medium": "#C0C0C0",
            "pink-baby": "#F7BFCB",
            "mint-pastel": "#C7F0D8",
            "white-nube": "#F8F8FF",
            "text-dark": "#333333",
          },
          fontFamily: {
            script: ["var(--font-dancing-script)", "cursive"],
            quicksand: ["var(--font-quicksand)", "sans-serif"],
          },
        },
      },
    },
    autoprefixer: {},
  },
};

export default config;
