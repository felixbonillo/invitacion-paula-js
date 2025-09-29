import "./globals.css";
// Importamos solo las fuentes que realmente vamos a usar en el layout y en Tailwind
import { Dancing_Script, Quicksand } from "next/font/google";

// Configuramos las fuentes usando la API de Next/Font
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dancing-script",
});
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-quicksand",
});

export const metadata = {
  title: "La Invitación de Paula",
  description: "¡Ven a celebrar la llegada de nuestra pequeña elefanta Paula!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      {/* Aplicamos las clases de fuente al body. 
          'font-quicksand' será la fuente por defecto para todo el texto. */}
      <body
        className={`${dancingScript.variable} ${quicksand.variable} font-quicksand`}
      >
        {children}
      </body>
    </html>
  );
}
