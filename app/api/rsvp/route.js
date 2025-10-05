export async function POST(request) {
  try {
    const data = await request.json();

    // Validación en servidor (nunca confiar en el cliente)
    const name = String(data?.name || "").trim();
    const phone = String(data?.phone || "").trim();
    const message = String(data?.message || "").trim();

    if (name.length < 2) {
      return Response.json({ error: "Nombre inválido" }, { status: 400 });
    }
    if (!/^[+\d\s-]{7,}$/.test(phone)) {
      return Response.json({ error: "Teléfono inválido" }, { status: 400 });
    }

    // Adapter: manda a un webhook si existe, si no, loggea (dev)
    const WEBHOOK = process.env.RSVP_WEBHOOK_URL; // opcional
    const payload = {
      name,
      phone,
      message,
      ts: new Date().toISOString(),
    };

    if (WEBHOOK) {
      await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      // ⚠️ En Vercel esto no persiste: solo para desarrollo
      console.log("RSVP ▶", payload);
    }

    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: "Bad Request" }, { status: 400 });
  }
}
