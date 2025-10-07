"use client";
import React from "react";
import Button from "./ui/Button";

export default function LinkGenerator() {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  // Generar slug limpio
  const slugify = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");

  // Crear enlace
  const handleGenerate = () => {
    if (!name.trim()) return;
    const slug = slugify(name.trim());
    const base = window.location.origin;
    const url = `${base}/${slug}`;
    setLink(url);
  };

  // Copia/Share robusto (iOS/HTTPS friendly)
  const handleCopy = async () => {
    if (!link) return;

    // 1) Web Share: UX nativa en móviles
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Invitación de Paula",
          text: link,
          url: link,
        });
        return;
      } catch {
        // si cancelan, seguimos a copiar
      }
    }

    // 2) Clipboard API si hay contexto seguro
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(link);
        alert("✅ Enlace copiado al portapapeles");
        return;
      } catch {
        // continuamos al fallback
      }
    }

    // 3) Fallback universal (execCommand)
    try {
      const ta = document.createElement("textarea");
      ta.value = link;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      if (ok) {
        alert("✅ Enlace copiado al portapapeles");
        return;
      }
    } catch {
      // último recurso
    }

    // 4) Prompt manual
    window.prompt("Copia el enlace:", link);
  };

  const handleShareWhatsApp = () => {
    if (!link) return;
    const message =
      `🎀 ¡Hola ${name.trim()}! 🎀\n\n` +
      `Estás invitado al Baby Shower de Paula 🐘💖\n` +
      `Puedes ver tu invitación personalizada aquí:\n${link}\n\n` +
      `Confirma tu asistencia en el formulario. ¡Te esperamos! 🍼`;
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <section className="relative flex min-h-[100vh] flex-col items-center justify-center px-4 text-center">
      <div className="w-full max-w-sm rounded-2xl border border-black/10 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
        <h2 className="mb-4 text-xl font-bold text-[var(--baby-ink,#374151)]">
          Generar invitación personalizada
        </h2>

        <label className="mb-2 block text-sm text-black/60">
          Nombre del invitado
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Félix Bonillo"
          className="w-full rounded-xl border border-black/15 bg-white/70 px-4 py-3 text-sm shadow-sm placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-[var(--baby-pink,#F7BFCB)]/50"
        />

        <div className="mt-4 space-y-3">
          <Button fullWidth onClick={handleGenerate}>
            Generar link
          </Button>

          {link && (
            <>
              <p className="break-words text-sm text-black/70">{link}</p>

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
                <Button variant="white" size="md" onClick={handleCopy}>
                  Copiar link 📋
                </Button>
                <Button variant="pink" size="md" onClick={handleShareWhatsApp}>
                  Compartir por WhatsApp 💬
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
