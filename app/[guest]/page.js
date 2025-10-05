"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import CountdownTimer from "@/components/CountdownTimer";
import { useGyroParallax } from "@/hooks/useGyroParallax";
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
  // Parallax: sensibilidad 12–18 se siente bien en móvil
  const { coords, showPermissionPrompt, requestIOSPermission } =
    useGyroParallax(14);

  // Nombre desde query param (MVP). Más adelante lo moveremos a /[guest]
  const params = useSearchParams();
  const guestSlug = params.get("guest") || "";
  const name = friendlyName(decodeGuestSlug(guestSlug));

  return (
    <main className="relative mx-auto min-h-dvh max-w-sm overflow-hidden px-4 pb-24 pt-10 text-center">
      {/* Capa 1: nubes — movimiento suave (más lenta) */}
      <div
        className="pointer-events-none fixed inset-0 -z-20 opacity-90"
        style={{
          transform: `translate3d(${coords.x * 0.5}px, ${coords.y * 0.5}px, 0)`,
        }}
        aria-hidden
      >
        <Image
          src="/assets/fondo.png"
          alt=""
          fill
          priority
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Capa 2: globos — un poco más rápida y tenue */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-35"
        style={{
          transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`,
          backgroundImage: "url(/assets/globos.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top 80px",
          backgroundSize: "360px auto",
        }}
        aria-hidden
      />

      {showPermissionPrompt && (
        <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
          <Button onClick={requestIOSPermission} size="md">
            Activar movimiento
          </Button>
        </div>
      )}

      {/* HERO */}
      <section className="relative z-10">
        {/* Elefante grande: el contenedor define el tamaño */}
        <div className="relative mx-auto h-72 w-72 select-none sm:h-80 sm:w-80">
          <Image
            src="/assets/elefante1.png"
            alt="Elefantita con globos"
            fill
            priority
            sizes="(max-width: 400px) 288px, 320px"
            style={{ objectFit: "contain" }}
            className="drop-shadow-[0_12px_28px_rgba(247,191,203,0.35)]"
          />
        </div>

        <h1 className="mt-2 font-[Dancing_Script] text-3xl text-[var(--baby-pink)]">
          ¡Paula viene en camino!
        </h1>

        <p className="mt-1 text-sm text-[var(--baby-ink)]/80">
          {name ? `Hola, ${name} 👋` : "Hola, Querido Invitado"}
        </p>

        <div className="mt-4 rounded-2xl border border-[var(--baby-pink)]/30 bg-white/80 p-4 text-left shadow-sm backdrop-blur-sm">
          <p className="text-xs leading-relaxed text-[var(--baby-ink)]/90">
            Únete a nosotros para celebrar la inminente llegada de nuestra
            pequeña princesa. ¡Estamos ansiosos de que conozcas a nuestra
            elefanta Paula!
          </p>

          {/* Countdown */}
          <div className="mt-3 text-center">
            <CountdownTimer />
          </div>
        </div>

        <Button className="mt-2" href="#rsvp">
          ¡Quiero confirmar mi asistencia!
        </Button>
      </section>

      {/* Placeholder del formulario (lo implementamos en el siguiente sprint) */}
      <section id="rsvp" className="relative z-10 mt-10 text-left">
        <RSVPForm prefillName={name} />
      </section>
    </main>
  );
}
