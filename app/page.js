// app/page.js  (Server Component)
import { redirect } from "next/navigation";
import LinkGenerator from "@/components/LinkGenerator"; // este sí es client

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const guest = (params?.guest || "").toString().trim();

  if (guest) {
    redirect(`/${guest}`);
  }

  return (
    <main className="mx-auto max-w-sm px-4 pb-20 pt-10 text-center">
      <h1 className="text-3xl font-[Dancing_Script] text-[var(--text-dark,#374151)]">
        ¡Paula viene en camino!
      </h1>
      <p className="mt-2 text-sm opacity-80">
        Crea tu enlace personalizado para cada invitado:
      </p>
      <LinkGenerator />
    </main>
  );
}
