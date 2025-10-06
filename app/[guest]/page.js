"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useSearchParams, usePathname } from "next/navigation";

// Evita hydration mismatch: el contador sólo en cliente
const CountdownTimer = dynamic(() => import("@/components/CountdownTimer"), {
  ssr: false,
});

// UI
import Button from "@/components/ui/Button";
import RSVPForm from "@/components/RSVPForm";

/** Helpers mínimos para nombre desde la URL (?guest=felix-bonillo) */
const decodeGuestSlug = (slug = "") => slug.replace(/-/g, " ");
const friendlyName = (raw = "") =>
  raw
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");

export default function Home() {
  const params = useSearchParams();
  const pathname = usePathname();

  const guestSlugQuery = params.get("guest") || "";
  const slugFromPath = (pathname || "").slice(1).split("/")[0]; // "/natasha" -> "natasha"

  const guestSlug = guestSlugQuery || slugFromPath || "";
  const name = friendlyName(decodeGuestSlug(guestSlug));

  const goToForm = () => {
    document.querySelector("#rsvp")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative mx-auto min-h-screen max-w-sm overflow-hidden px-4 text-center">
      {/* FONDO: imagen fija, sin parallax */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <Image
          src="/assets/fondo.png"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* SECTION 1: HERO (100vh) */}
      <section className="relative flex min-h-[100vh] flex-col items-center justify-center pb-24 pt-10">
        {/* Elefante */}
        <div className="relative mx-auto h-72 w-72 select-none sm:h-80 sm:w-80">
          <Image
            src="/assets/elefante1.png"
            alt="Elefantita con globos"
            fill
            priority
            sizes="(max-width: 400px) 288px, 320px"
            className="object-contain drop-shadow-[0_12px_28px_rgba(247,191,203,0.35)]"
          />
        </div>
        <h1 className="mt-2 font-bold font-[Dancing_Script] text-3xl text-[var(--text-dark,#374151)]">
          ¡Paula viene en camino!
        </h1>
        <p className="mt-1 text-sm text-[var(--baby-ink,#374151)]/80">
          Hola{" "}
          <span className="font-semibold text-[var(--baby-pink,#F7BFCB)]">
            {name || "Invitado"} 👋
          </span>{" "}
        </p>

        <div className="mt-4 w-full rounded-2xl border border-[var(--baby-pink,#F7BFCB)]/30 bg-white/80 p-4 text-left shadow-sm backdrop-blur-sm">
          <p className="text-xs leading-relaxed text-[var(--baby-ink,#374151)]/90">
            Únete a nosotros para celebrar la inminente llegada de nuestra
            pequeña princesa. ¡Estamos ansiosos de que conozcas a nuestra
            elefanta Paula!
          </p>
          <div className="mt-3 text-center">
            <CountdownTimer />
          </div>
        </div>
        <Button className="mt-4" onClick={goToForm}>
          ¡Quiero confirmar mi asistencia!
        </Button>
      </section>

      {/* SECTION 2: FORM (100vh) */}
      <section
        id="rsvp"
        className="relative flex min-h-[100vh] flex-col items-center justify-center pb-24 pt-10"
      >
        <div className="w-full">
          <RSVPForm prefillName={name} />
        </div>
      </section>
    </main>
  );
}
