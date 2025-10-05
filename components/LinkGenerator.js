"use client";
import React from "react";
import Button from "./ui/Button";

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function LinkGenerator() {
  const [name, setName] = React.useState("");
  const slug = slugify(name);
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/${slug || "invitado"}`
      : "";

  const canCreate = slug.length >= 3;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("¡Enlace copiado!");
    } catch {
      // fallback: no hacemos nada si no hay permiso
    }
  };

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(
    `¡Hola! Te comparto, me genera mucha felicidad invitarte: ${url}`
  )}`;

  return (
    <section className="mt-6">
      <div className="rounded-2xl border border-[var(--baby-ink,#374151)]/10 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
        <h2 className="text-center font-[Dancing_Script] text-2xl text-[var(--baby-pink,#F7BFCB)]">
          ¡Paula viene en camino!
        </h2>
        <p className="mt-1 text-center text-sm text-[var(--baby-ink,#374151)]/70">
          Crea tu enlace personalizado para cada invitado:
        </p>

        <div className="mt-4 space-y-3">
          <label className="block text-xs font-medium text-[var(--baby-ink,#374151)]/70">
            Nombre del invitado
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. María Gómez"
            className="w-full rounded-xl border border-[var(--baby-ink,#374151)]/15 bg-white/70 px-4 py-3 text-sm shadow-sm placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-[var(--baby-pink,#F7BFCB)]/50"
          />

          {/* Píldora del slug para feedback visual */}
          <div className="text-xs text-[var(--baby-ink,#374151)]/60">
            Slug:{" "}
            <span className="rounded-full bg-black/5 px-2 py-1">
              {slug || "invitado"}
            </span>
          </div>

          {/* Botones */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              href={`/${slug || "invitado"}`}
              fullWidth
              disabled={!canCreate}
              aria-disabled={!canCreate}
            >
              Ver invitación
            </Button>
            <Button
              onClick={copy}
              variant="white"
              fullWidth
              disabled={!canCreate}
              aria-disabled={!canCreate}
              title="Copiar enlace"
            >
              Copiar
            </Button>
          </div>

          {/* Compartir por WhatsApp (opcional) */}
          <Button
            as="a"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            fullWidth
            className="mt-1"
          >
            Compartir por WhatsApp
          </Button>

          {/* Preview del enlace */}
          <div className="mt-2 break-all text-center text-xs text-[var(--baby-ink,#374151)]/70">
            {url}
          </div>
        </div>
      </div>
    </section>
  );
}
