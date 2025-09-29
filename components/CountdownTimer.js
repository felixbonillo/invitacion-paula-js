import React from "react";
import Countdown from "react-countdown";

const BABY_SHOWER_DATE = new Date("2025-10-12T15:00:00");

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
      {days.toString().padStart(2, "0")} días{" "}
      {hours.toString().padStart(2, "0")}h {minutes.toString().padStart(2, "0")}
      m {seconds.toString().padStart(2, "0")}s
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
      <Countdown date={BABY_SHOWER_DATE} renderer={renderer} />
    </div>
  );
}
