import React from "react";
import Countdown from "react-countdown";

const DATA_ISO =
  process.env.NEXT_PUBLIC_EVENT_ISO || "2025-10-19T15:00:00-04:00";

// Componente Renderer: define cómo se ve la cuenta regresiva en cada tick
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  // Si el tiempo ha terminado, mostramos un mensaje final
  if (completed) {
    return (
      <p className="text-3xl font-script text-pink-baby">¡El día es HOY! 🎉</p>
    );
  }

  // Si el tiempo NO ha terminado, mostramos el formato de cuenta regresiva
  return (
    <p className="text-3xl font-script text-pink-baby">
      {String(days).padStart(2, "0")} días {String(hours).padStart(2, "0")}h{" "}
      {String(minutes).padStart(2, "0")}m {String(seconds).padStart(2, "0")}s
    </p>
  );
};

// Componente principal del temporizador
export default function CountdownTimer() {
  return (
    <div className="text-center">
      <p className="text-xl font-bold text-mint-pastel mb-1">
        Tiempo restante:
      </p>
      <Countdown date={new Date(DATA_ISO)} renderer={renderer} />
    </div>
  );
}
