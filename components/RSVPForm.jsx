"use client";
import React from "react";
import Button from "@/components/ui/Button";

async function fireConfetti() {
    const confetti = (await import("canvas-confetti")).default;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => confetti({ particleCount: 40, angle: 60, spread: 55, origin: { x: 0 } }), 120);
    setTimeout(() => confetti({ particleCount: 40, angle: 120, spread: 55, origin: { x: 1 } }), 120);
}
export default function RSVPForm({ prefillName = "" }) {
    // idle | loading | ok | error
    const [status, setStatus] = React.useState("idle");
    const [errorMsg, setErrorMsg] = React.useState("");

    async function onSubmit(e) {
        e.preventDefault();
        if (status === "loading") return; // evita doble envío
        setStatus("loading");
        setErrorMsg("");

        // ✅ Guarda referencia antes del await
        const formEl = e.currentTarget;

        const form = new FormData(formEl);
        const payload = {
            name: String(form.get("name") || "").trim(),
            phone: String(form.get("phone") || "").trim(),
            message: String(form.get("message") || "").trim(),
            slug:
                typeof window !== "undefined"
                    ? window.location.pathname.replace(/^\//, "")
                    : "",
        };

        try {
            const res = await fetch("/api/rsvp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const txt = await res.text();
            let data;
            try { data = JSON.parse(txt); } catch { }

            if (!res.ok) {
                throw new Error((data && data.error) || txt || "Webhook error");
            }

            setStatus("ok");
            formEl.reset(); // ✅ usa la referencia en lugar de e.currentTarget
            fireConfetti();
        } catch (err) {
            setStatus("error");
            setErrorMsg(err?.message || "No pudimos enviar el formulario. Intenta de nuevo.");
        }
    }


    return status === "ok" ? (
        // ✅ Mensaje de agradecimiento (reemplaza el form)
        <div className="rounded-2xl border border-black/10 bg-white/90 p-5 shadow-sm backdrop-blur-sm text-center animate-fade-in">
            <h3 className="text-2xl font-[Dancing_Script] text-[var(--baby-pink,#F7BFCB)]">
                ¡Gracias {prefillName || "de corazón"}! 💖
            </h3>

            <p className="mt-2 text-sm text-black/80 font-medium">
                Un Mensaje de Mamá y Papá:
            </p>
            <p className="mt-1 text-sm leading-relaxed text-black/70">
                Saber que Paula tiene tanto cariño a su alrededor es nuestro tesoro más grande.
                ¡Gracias por compartir esta alegría!
            </p>

            <p className="mt-5 text-xs text-black/50">
                Si deseas cambiar tus datos, puedes recargar la página.
                Con cariño, <span className="italic text-[var(--baby-pink,#F7BFCB)]">Mamá, Papá y Paula 🐘</span>.
            </p>
        </div>
    ) : (
        // 🧾 Formulario (igual que lo tenías)
        <form onSubmit={onSubmit} noValidate className="space-y-3">
            <div className="rounded-2xl border border-black/10 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
                <h3 className="mb-2 text-center text-sm font-medium text-black/70">
                    Confirma tu asistencia
                </h3>

                <label className="mb-1 block text-xs text-black/60">Nombre</label>
                <input
                    name="name"
                    defaultValue={prefillName}
                    placeholder="Tu nombre"
                    className="w-full rounded-xl border border-black/15 bg-white/70 px-4 py-3 text-sm shadow-sm placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-[var(--baby-pink,#F7BFCB)]/50"
                    required
                />

                <div className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                        <label className="mb-1 block text-xs text-black/60">Teléfono</label>
                        <input
                            name="phone"
                            placeholder="+58 412 000 0000"
                            className="w-full rounded-xl border border-black/15 bg-white/70 px-4 py-3 text-sm shadow-sm placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-[var(--baby-pink,#F7BFCB)]/50"
                            required
                        />
                    </div>
                </div>

                <label className="mt-3 mb-1 block text-xs text-black/60">
                    Mensaje (opcional)
                </label>
                <textarea
                    name="message"
                    rows={3}
                    placeholder="¿Algo que debamos saber?"
                    className="w-full rounded-xl border border-black/15 bg-white/70 px-4 py-3 text-sm shadow-sm placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-[var(--baby-pink,#F7BFCB)]/50"
                />

                <div className="mt-4">
                    <Button
                        type="submit"
                        fullWidth
                        loading={status === "loading"}
                        disabled={status === "loading"}
                    >
                        Confirmar asistencia
                    </Button>
                </div>

                {status === "error" && (
                    <p className="mt-2 text-center text-sm text-red-600">{errorMsg}</p>
                )}
            </div>
        </form>
    );
}
