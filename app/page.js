"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation"; // Para leer el nombre del invitado
import { useGyroParallax } from "@/hooks/useGyroParallax"; // custom hook
import CountdownTimer from "@/components/CountdownTimer";

export default function ParallaxInvitation() {
  // Usamos nuestro custom hook para obtener las coordenadas de movimiento del giroscopio
  const { coords, requestIOSPermission, showPermissionPrompt } =
    useGyroParallax(15);
  const { x, y } = coords; // Desestructuramos las coordenadas para usarlas directamente

  // Usamos el hook de Next.js para leer los parámetros de la URL
  const searchParams = useSearchParams();
  // Obtenemos el valor del parámetro 'n'. Si no existe, usamos 'Querido Invitado'.
  const guestNameParam = searchParams.get("n");
  const guestName = guestNameParam
    ? guestNameParam.charAt(0).toUpperCase() +
      guestNameParam.slice(1).toLowerCase()
    : "Querido Invitado";

  return (
    // Contenedor principal: ocupa toda la altura de la pantalla, permite posicionamiento absoluto
    // y tiene un fondo y tipografía base definidos en Tailwind.
    <div className="min-h-screen relative overflow-hidden bg-white-nube font-quicksand text-text-dark">
      {/* -------------------- ZONA DE EFECTOS PARALLAX 🐘 (Capas de Fondo) -------------------- */}
      {/* Este div actúa como un contenedor para todas las capas que se moverán */}
      <div className="absolute inset-0 z-0">
        {/* Capa 1: Nubes Lejanas (Movimiento Muy Bajo) */}
        {/* Es la capa más lejana, se mueve menos, dando sensación de profundidad */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            transform: `translate(${x * 0.2}px, ${y * 0.2}px)`, // Baja sensibilidad para poco movimiento
            transition: "transform 0.1s ease-out", // Transición suave para evitar movimientos bruscos
          }}
        >
          <Image
            src="/assets/fondo.png"
            layout="fill"
            objectFit="cover"
            alt="fondo de nubes"
            priority // Carga esta imagen con prioridad para que el fondo aparezca rápido
          />
        </div>

        {/* Capa 2: Pequeños Elefantes Voladores (Movimiento Medio) */}
        {/* Creamos varios de estos para dispersarlos y añadir dinamismo */}
        <div
          className="absolute top-1/4 left-5 opacity-80"
          style={{
            transform: `translate(${x * 0.6}px, ${y * 0.6}px)`, // Sensibilidad media
            transition: "transform 0.1s ease-out",
          }}
        >
          <Image
            src="/assets/elefante1.png"
            width={100}
            height={100}
            alt="pequeño elefante flotando"
          />
        </div>
        <div
          className="absolute bottom-1/3 right-10 opacity-70"
          style={{
            transform: `translate(${x * 0.5}px, ${y * 0.5}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <Image
            src="/assets/elefante2.png"
            width={80}
            height={80}
            alt="pequeño elefante flotando"
          />
        </div>

        {/* Capa 3: Globos Flotantes (Movimiento Más Alto) */}
        {/* Estos se moverán más, dando la sensación de estar más cerca del usuario */}
        <div
          className="absolute top-10 right-10 opacity-90"
          style={{
            transform: `translate(${x * 1.5}px, ${y * 1.5}px)`, // Alta sensibilidad
            transition: "transform 0.1s ease-out",
          }}
        >
          <Image
            src="/assets/globos.png"
            width={110}
            height={60}
            alt="globos voladores"
          />
        </div>
        <div
          className="absolute bottom-20 left-10 opacity-80"
          style={{
            transform: `translate(${x * 1.2}px, ${y * 1.2}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <Image
            src="/assets/globos.png"
            width={180}
            height={120}
            alt="globos voladores"
          />
        </div>
      </div>{" "}
      {/* Fin ZONA DE EFECTOS PARALLAX */}
      {/* -------------------- CONTENIDO PRINCIPAL (Fijo y Superpuesto) -------------------- */}
      {/* Este div contiene el texto y los elementos interactivos, y se mantiene fijo */}
      <div className="relative z-10 p-6 pt-[60vh] md:pt-40 flex flex-col items-center">
        {/* Título Principal y Elefante Grande (parte más importante de la invitación) */}
        <div className="absolute top-[15vh] md:top-20 left-1/2 -translate-x-1/2 text-center z-20">
          <Image
            src="/assets/elefante4.png"
            width={600}
            height={900}
            alt="elefante bebé principal"
            className="mx-auto drop-shadow-lg"
          />
          <h1 className="text-5xl md:text-6xl font-script text-pink-baby mt-4 shadow-text">
            ¡Paula Viene en Camino!
          </h1>
        </div>

        {/* Tarjeta de Contenido con la información y el saludo */}
        <div className="bg-white-nube/95 backdrop-blur-sm p-6 rounded-3xl shadow-2xl border-4 border-mint-pastel max-w-sm md:max-w-md w-full mx-auto mt-8">
          {/* Saludo Personalizado al invitado */}
          <h2 className="text-2xl font-quicksand text-text-dark mb-4 text-center">
            Hola, <span className="font-bold text-pink-baby">{guestName}</span>
          </h2>

          {/* Información del Evento */}
          <p className="text-lg mb-6 text-gray-700 text-center">
            Únete a nosotros para celebrar la inminente llegada de nuestra
            pequeña princesa. ¡Estamos ansiosos de que conozcas a nuestra
            elefanta Paula!
          </p>

          {/* Espacio para la Cuenta Regresiva (Se implementará en Sprint 2) */}
          <div className="text-center mt-4 mb-6">
            <CountdownTimer />
          </div>

          {/* Botón de Acción (RSVP - Se mejorará en Sprint 2) */}
          <div className="mt-8">
            <button className="w-full bg-pink-baby hover:bg-pink-400 text-white-nube font-bold py-3 rounded-full shadow-lg transition duration-300">
              ¡Quiero confirmar mi asistencia!
            </button>
          </div>
        </div>
      </div>
      {/* Prompt de Permiso para iOS (Se muestra si se necesita y no se ha otorgado) */}
      {showPermissionPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100]">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-xs mx-4">
            <p className="text-lg font-bold mb-4 text-text-dark">
              Activar Movimiento 3D
            </p>
            <p className="text-gray-700 mb-6">
              Para disfrutar del efecto de movimiento, necesitamos tu permiso
              para acceder al sensor de movimiento.
            </p>
            <button
              onClick={requestIOSPermission}
              className="bg-pink-baby hover:bg-pink-400 text-white-nube font-bold py-2 px-4 rounded-full transition duration-300"
            >
              Permitir Movimiento
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
