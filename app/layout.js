import "./globals.css";
import { Dancing_Script, Quicksand } from "next/font/google";

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
  metadataBase: new URL("https://invitacion-paula.vercel.app"), // 👈 importante
  title: "La Invitación de Paula",
  description: "¡Ven a celebrar la llegada de nuestra pequeña elefanta Paula!",
  openGraph: {
    title: "Baby Shower de Paula 🎀",
    description:
      "Descubre tu invitación personalizada y acompáñanos en este día tan especial 🐘💖",
    url: "/", // gracias a metadataBase será absoluta
    siteName: "La Invitación de Paula",
    images: [
      {
        url: "/assets/elefante1.png", // se resuelve a https://.../assets/elefante1.png
        width: 800,
        height: 800,
        alt: "Elefantita con globos - Baby Shower de Paula",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Baby Shower de Paula 🎀",
    description:
      "Descubre tu invitación personalizada y acompáñanos en este día tan especial 🐘💖",
    images: ["/assets/elefante1.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${dancingScript.variable} ${quicksand.variable} font-quicksand`}
      >
        {children}
      </body>
    </html>
  );
}
