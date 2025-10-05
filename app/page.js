import LinkGenerator from "@/components/LinkGenerator";

import { redirect } from "next/navigation";

export default function Home({ searchParams }) {
  const guest = (searchParams?.guest || "").trim();

  // Si viene como query (?guest=felix-bonillo), redirige a /felix-bonillo
  if (guest) {
    redirect(`/${guest}`);
  }

  // Si no hay query, mostramos portada para generar enlaces
  return (
    <main className="mx-auto max-w-sm px-4 pb-20 pt-10 text-center">
      <LinkGenerator />
    </main>
  );
}
