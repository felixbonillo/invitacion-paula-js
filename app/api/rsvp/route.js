export async function POST(request) {
  try {
    const data = await request.json();

    // Validación en servidor
    const name = String(data?.name || "").trim();
    const phone = String(data?.phone || "").trim();
    const message = String(data?.message || "").trim();
    const slug = String(data?.slug || "").trim();

    if (name.length < 2)
      return Response.json({ error: "Nombre inválido" }, { status: 400 });
    if (!/^[+\d\s-]{7,}$/.test(phone))
      return Response.json({ error: "Teléfono inválido" }, { status: 400 });

    const url = process.env.RSVP_WEBHOOK_URL;
    if (!url)
      return Response.json(
        { error: "Webhook no configurado" },
        { status: 500 }
      );

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        message,
        slug,
        token: process.env.RSVP_SECRET || undefined, // opcional
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      return Response.json({ error: txt || "Webhook error" }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Bad Request" }, { status: 400 });
  }
}
