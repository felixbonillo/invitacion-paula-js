"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import PaulaWelcome from "@/components/PaulaWelcome";
import WishList from "@/components/WishList";
import RSVPForm from "@/components/RSVPForm";

const CountdownTimer = dynamic(() => import("@/components/CountdownTimer"), {
    ssr: false,
});

export default function InviteClient({ initialName }) {
    const [showInvite, setShowInvite] = React.useState(false);
    const name = initialName || "Invitado";

    const goToForm = () => {
        document.querySelector("#rsvp")?.scrollIntoView({ behavior: "smooth" });
    };

    // Gate inicial: si no se mostró la invitación, renderiza PaulaWelcome
    if (!showInvite) {
        const handleShowInvite = () => {
            setShowInvite(true);
            // forzamos scroll al tope tras el repaint (iOS friendly)
            requestAnimationFrame(() => {
                try {
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                } catch { }
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                document.getElementById("invite-top")?.scrollIntoView({ block: "start" });
            });
        };

        return <PaulaWelcome guestName={name} onShowInvite={handleShowInvite} />;
    }

    // Contenido de la invitación (hero + countdown + wishlist visual + formulario)
    return (
        <main
            id="invite-top"
            className="relative mx-auto min-h-screen max-w-sm overflow-hidden px-4 text-center"
        >
            {/* fondo */}
            <div className="pointer-events-none fixed inset-0 -z-10">
                <Image
                    src="/assets/fondo.png"
                    alt=""
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            {/* HERO */}
            <section className="relative flex min-h-[100vh] flex-col items-center justify-center pb-24 pt-10">
                <div className="relative mx-auto h-72 w-72 select-none sm:h-80 sm:w-80">
                    <Image
                        src="/assets/elefante1.png"
                        alt="Elefantita con globos"
                        fill
                        priority
                        sizes="(max-width: 400px) 288px, 320px"
                        className="object-contain drop-shadow-[0_12px_28px_rgba(247,191,203,0.35)]"
                    />
                </div>

                <p
                    className="mt-1 text-sm text-[var(--baby-dark,#374151)]/80"
                    style={{ fontSize: "18px" }}
                >
                    🤍 Hola,{" "}
                    <span
                        className="font-semibold font-[Dancing_Script] text-[var(--baby-dark,#111827)]"
                        style={{ fontSize: "22px" }}
                    >
                        {name} 🤍
                    </span>
                </p>

                <h1
                    className="mt-2 font-bold font-[Dancing_Script] text-[var(--text-dark,#374151)]"
                    style={{ fontSize: "25px" }}
                >
                    Una pequeña Elefanta viene en camino
                </h1>

                <div className="mt-4 w-full rounded-2xl border border-[var(--baby-pink,#F7BFCB)]/30 bg-white/80 p-4 text-left shadow-sm backdrop-blur-sm">
                    <p
                        className="text-xs leading-relaxed text-[var(--baby-ink,#374151)]/90 text-center"
                        style={{ fontSize: "18px" }}
                    >
                        La aventura más grande de nuestras vidas está a punto de comenzar...
                        <br />
                        <span>
                            Y se llama
                            <span
                                className="font-[Dancing_Script] font-bold text-[var(--baby-pink,#F7BFCB)] ml-1"
                                style={{ fontSize: "28px" }}
                            >
                                ¡Paula Isabella! 🌟
                            </span>
                        </span>
                    </p>
                    <div className="mt-3 text-center">
                        <span className="text-md font-medium">
                            <span className=" text-[var(--baby-pink,#374151)]/90 font-bold">
                                Lugar:
                            </span>{" "}
                            <a href="https://maps.app.goo.gl/XUv5V4rPuPh9Tx1T7"> Ver ubicacion</a>
                        </span>
                        <br />
                        <span className="text-md font-medium">
                            <span className=" text-[var(--baby-pink,#374151)]/90 font-bold">
                                Fecha:
                            </span>{" "}
                            <span>Domingo, 19 de Octubre</span>
                        </span>
                        <br />
                        <span className="text-md font-medium">
                            <span className=" text-[var(--baby-pink,#374151)]/90 font-bold">
                                Hora:
                            </span>{" "}
                            <span>2:00 Pm.</span>
                        </span>
                        <br />
                        <CountdownTimer />
                    </div>
                </div>
            </section>

            {/* LISTA (solo visual) */}
            <WishList />

            {/* FORMULARIO */}
            <section
                id="rsvp"
                className="relative flex min-h-[100vh] flex-col items-center justify-center pb-24 pt-10"
            >
                <div className="w-full">
                    <RSVPForm prefillName={name} />
                </div>
            </section>
        </main>
    );
}
