import InviteClient from "@/components/InviteClient";

// Helper: "alex-garcia" -> "Alex Garcia"
const toTitle = (s = "") =>
  s
    .split("-")
    .filter(Boolean)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");

export async function generateMetadata({ params }) {
  const raw = params?.guest || ""; // ← USAR guest
  const name = toTitle(raw);

  const title = name
    ? `Invitación para ${name} — Baby Shower de Paula`
    : "Invitación — Baby Shower de Paula";

  const description =
    "Acompáñanos a celebrar la dulce espera de Paula. Tu presencia es el mejor regalo 🎀";
  const url = `/${raw}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: ["/assets/elefante1.png"],
    },
  };
}

export default function Page({ params }) {
  const raw = params?.guest || ""; // ← USAR guest
  const name = toTitle(raw);
  return <InviteClient initialName={name || "Invitado"} />;
}
