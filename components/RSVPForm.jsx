"use client";
import React from "react";
import Button from "./ui/Button";

export default function RSVPForm({ prefillName = "" }) {
    const [loading, setLoading] = React.useState(false);
    const [ok, setOk] = React.useState("");
    const [err, setErr] = React.useState("");

    async function onSubmit(e) {
        e.preventDefault();
        setOk(""); setErr("");
        const form = new FormData(e.currentTarget);

        const payload = {
            name: String(form.get("name") || "").trim(),
            phone: String(form.get("phone") || "").trim(),
            message: String(form.get("message") || "").trim(),
        };

        // Validación ligera en cliente
        if (payload.name.length < 2) return setErr("Escribe tu nombre 🙏");
        if (!/^[+\d\s-]{7,}$/.test(payload.phone)) return setErr("Teléfono inválido");

        setLoading(true);
        try {
            const res = await fetch("/api/rsvp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error(await res.text());
            setOk("¡Gracias! Registramos tu asistencia.");
            e.currentTarget.reset();
        } catch (e) {
            setErr("No pudimos enviar el formulario. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-3">
            <div className="rounded-2xl border border-[var(--baby-ink,#374151)]/10 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
                <h3 className="mb-2 text-center text-sm font-medium text-[var(--baby-ink,#374151)]/80">
                    Confirma tu asistencia
                </h3>

                <label className="mb-1 block text-xs text-[var(--baby-ink,#374151)]/60">
                    Nombre
                </label>
                <input
                    name="name"
                    defaultValue={prefillName}
                    placeholder="Tu nombre"
                    className="w-full rounded-xl border border-[var(--baby-ink,#374151)]/15 bg-white/70 px-4 py-3 text-sm shadow-sm placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-[var(--baby-pink,#F7BFCB)]/50"
                    required
                />

                <div className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                        <label className="mb-1 block text-xs text-[var(--baby-ink,#374151)]/60">
                            Teléfono
                        </label>
                        <input
                            name="phone"
                            placeholder="+58 412 000 0000"
                            className="w-full rounded-xl border border-[var(--baby-ink,#374151)]/15 bg-white/70 px-4 py-3 text-sm shadow-sm placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-[var(--baby-pink,#F7BFCB)]/50"
                            required
                        />
                    </div>
                </div>
                <label className="mt-3 mb-1 block text-xs text-[var(--baby-ink,#374151)]/60">
                    Mensaje (opcional)
                </label>
                <textarea
                    name="message"
                    rows={3}
                    placeholder="¿Algo que debamos saber?"
                    className="w-full rounded-xl border border-[var(--baby-ink,#374151)]/15 bg-white/70 px-4 py-3 text-sm shadow-sm placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-[var(--baby-pink,#F7BFCB)]/50"
                />

                <div className="mt-4">
                    <Button type="submit" fullWidth loading={loading}>
                        Confirmar asistencia
                    </Button>
                </div>

                {ok && <p className="mt-3 text-center text-sm text-green-600">{ok}</p>}
                {err && <p className="mt-3 text-center text-sm text-red-600">{err}</p>}
            </div>
        </form>
    );
}
