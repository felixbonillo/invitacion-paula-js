import React from "react";
import { motion } from "framer-motion";

/*
 * PaulaWelcome.jsx
 * ------------------------------------------------------------
 * Pantalla de apertura para la invitación de Paula con CTA
 * "Muéstrame mi invitación". Diseño minimalista, tierno y
 * 100% accesible. Pensado para Next.js/React + Tailwind.
 *
 * Props esperados:
 * - guestName (string, opcional): Nombre del invitado.
 * - onShowInvite (function): Acción al hacer clic en el botón.
 */

const cloudBg =
    "bg-[radial-gradient(ellipse_at_top_left,rgba(255,239,245,0.8),transparent_50%),radial-gradient(ellipse_at_top_right,rgba(232,246,255,0.8),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(255,247,237,0.85),transparent_50%)]";

export default function PaulaWelcome({ guestName, onShowInvite }) {
    return (
        <div className={`relative min-h-[100dvh] ${cloudBg} overflow-hidden`}>
            {/* Globos flotantes decorativos */}
            <FloatingBalloons />

            <main className="relative z-10 flex items-center justify-center px-4 py-10 sm:py-16">
                <motion.section
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    aria-labelledby="paula-heading"
                    className="w-full max-w-2xl rounded-3xl border border-pink-200/60 bg-white/80 shadow-xl backdrop-blur-sm p-6 sm:p-10"
                >
                    <header className="text-center">
                        <h1
                            id="paula-heading"
                            className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-pink-700"
                        >
                            {guestName ? (
                                <span>
                                    ¡Bienvenid@! <span className="capitalize">{guestName}</span> <br />
                                    <span>Mi nombre es <span className="font-[Dancing_Script]" style={{ fontSize: '31px' }}>Paula 🐘💕</span></span>
                                </span>

                            ) : (
                                <span>
                                    Hola a todos, soy Paula <span aria-hidden>👶💖</span>
                                </span>
                            )}
                        </h1>
                        <p className="mt-2 text-sm text-pink-700/80">
                            Desde la pancita de mami, deseo decirte que...
                        </p>
                    </header>

                    <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
                        <p>
                            Quiero invitarte a ser parte de esta aventura, donde estarás acompañando a mis papis en la preparación para el gran encuentro: ¡Mi llegada! 🥳

                        </p>
                        <p>
                            Aunque todavía estoy calientita en la barriguita de mi mami 🤰🏻, ya siento todo el amor que tienen para mí. 🤗
                        </p>
                        <p>
                            Mi familia y yo estamos muy emocionados emprendiendo un viaje lleno de nuevos retos, alegría y felicidad. 💖
                        </p>
                        <p>
                            Somos una manada con buena memoria 🐘✨ y guardaremos cada segundo compartido contigo en esta dulce espera. ¡Será un tesoro para mi corazón de elefantita! 💖</p>
                        <p>
                            Mi mami y papi han preparado una pequeña lista de deseos para mí 🎀, donde te sugieren un par de cositas que les ayudarían a prepararse para mi llegada. Si deseas obsequiarme un gesto, por pequeño que sea, ¡es un granito de amor que me llevo como recuerdo de ti! 🎁 Pero lo que verdaderamente me emociona es saber que todos me están esperando con tanto cariño. 🤍
                        </p>
                        <p>
                            Quiero que sepas que tu alegría y tu presencia son para mis papis y para mí: ¡EL MEJOR REGALO DE TODOS! 🌟
                        </p>
                        <p>Agradezco que puedas estar aquí acompañándonos a cumplir este precioso sueño. 🙏🏽</p>
                        <p>¡Ya estoy ansiosa por conocerte, jugar contigo y darte un gran abrazo con mi pequeña trompa! 🐘💕👣</p>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <motion.button
                            type="button"
                            aria-label="Muéstrame mi invitación"
                            onClick={onShowInvite}
                            onTouchEnd={(e) => { e.preventDefault(); onShowInvite(e); }} // 👈 iOS asegura el gesto
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2 rounded-2xl bg-pink-600 px-6 py-3 text-white font-semibold shadow-lg shadow-pink-200/60 hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300"
                        >
                            <span aria-hidden>💌</span>
                            Muéstrame mi invitación
                        </motion.button>

                    </div>
                </motion.section>
            </main>

            {/* Suelo suave para dar profundidad */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-pink-100/80 to-transparent" />
        </div>
    );
}

function FloatingBalloons() {
    return (
        <>
            <motion.div
                className="absolute -left-6 top-8 h-28 w-28 rounded-full bg-pink-200/60"
                initial={{ y: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute right-6 top-16 h-20 w-20 rounded-full bg-pink-100/70"
                initial={{ y: 0 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.6 }}
            />
            <motion.div
                className="absolute right-24 top-6 h-14 w-14 rounded-full bg-rose-200/60"
                initial={{ y: 0 }}
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.2 }}
            />
        </>
    );
}
