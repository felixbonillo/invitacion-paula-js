export function isEventExpired(iso) {
  const eventDate = new Date(iso);
  const now = new Date();
  const diff = now - eventDate;
  return diff > 24 * 60 * 60 * 1000; // 24 horas después del evento
}

export function toTitle(s = "") {
  return s
    .split("-")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}
