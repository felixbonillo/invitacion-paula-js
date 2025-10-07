"use client";
import React from "react";
import Image from "next/image";

/**
 * WishList.jsx — Versión final (estilo del prototipo)
 * Cinta real en CSS, 2 columnas, elefantitos decorativos.
 * Sin estado, ni selección. Solo visual 💖
 */

const LEFT = [
    {
        h: "PAÑALES (P-M-G)"
    },
    { h: "ROPITA (0-6/6-12 meses)", items: ["Bodys / franelillas / pijamas / cocoliso"] },
    { h: "ROPA PARA SALIR" },
    {
        h: "KIT HIGIENE", items: ["Jabon / Shampoo / Cepillo y peine / Cortaúñas / Aceite de bebe / Crema Corporal / Aspirador nasal"]
    },
    { h: "KIT PERSONAL", items: ["Toallas Humedas / Bolitas de Algodon / Alcohol Absoluto / Termometro / Jabon Antibacterial"] },
];

const RIGHT = [
    {
        h: "PAÑALES DE TELA"
    },
    { h: "TOALLA DE BAÑO" },
    {
        h: "ACCESORIOS", items: ["Cintillos / Gorros / Manoplas / Medias / Colitas / Baberos"]
    },

    {
        h: "EXTRACTOR DE LECHE"
    },

    {
        h: "CAMBIADOR ACOLCHADO"
    },

    {
        h: "COBIJAS/ MANTAS/ SABANAS DE CORRAL/ ALMOHADITAS"
    },
    {
        h: "TERMO DE BEBE"
    },
    {
        h: "SET DE ALIMENTACION DE SILICONA"
    },
    {
        h: "MONITOR DE VIDEO PARA BEBE"
    },
    {
        h: "ANDADERA"
    },

    {
        h: "MESEDORA"
    },
    {
        h: "ALFOMBRA ALCHOCHADA"
    },
    {
        h: "GIMNASIO PARA BEBE"
    },
    {
        h: "JUGUETES"
    },
];

export default function WishList() {
    return (
        <section className="relative mx-auto my-8 flex w-full max-w-sm flex-col items-center px-4">
            {/* Tarjeta principal */}
            <div className="relative w-full overflow-hidden rounded-2xl border border-pink-300 bg-white/95 shadow-md">
                {/* Fondo nube pastel */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(247,191,203,1),transparent_60%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(232,246,255,1),transparent_60%)]" />
                </div>

                {/* Header con elefantitos */}
                <div className="relative z-10 px-5 pt-6 pb-3 text-center">

                    <h2 className="text-[30px] font-extrabold tracking-wide font-[Dancing_Script]  text-pink-700">
                        ✨Lista de Deseos✨
                    </h2>

                    {/* Cinta “de Paula” */}
                    <Ribbon text="de Paula" />
                </div>

                {/* Cuerpo de dos columnas */}
                <div className="relative z-10 grid grid-cols-1 gap-0 px-5 py-5 sm:grid-cols-2 sm:px-6 sm:py-6">
                    <div
                        className="pointer-events-none absolute inset-y-5 left-1/2 hidden w-px -translate-x-1/2 border-l border-dashed border-pink-300 sm:block"
                        aria-hidden
                    />
                    <Column blocks={LEFT} />
                    <Column blocks={RIGHT} />
                </div>

                {/* Footer con elefantitos */}
                <div className="relative z-10 rounded-b-2xl border-t border-pink-200/70 bg-pink-50/70 px-5 py-3 text-center text-[12px] text-pink-700">
                    <div className="pointer-events-none absolute -bottom-1 left-2 h-22 w-22 sm:h-26 sm:w-26" aria-hidden>
                        <Image src="/assets/elefante5.png" alt="" fill className="object-contain drop-shadow-sm" />
                    </div>
                    <div className="pointer-events-none absolute -bottom-1 right-2 h-22 w-22 sm:h-26 sm:w-26" aria-hidden>
                        <Image src="/assets/elefante5.png" alt="" fill className="object-contain drop-shadow-sm" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function Column({ blocks }) {
    return (
        <div className="py-1">
            {blocks.map(({ h, items }, idx) => (
                <div key={idx} className={idx > 0 ? "mt-3" : ""}>
                    {h ? (
                        <p className="text-[12px] font-extrabold tracking-wide text-black/80">
                            {h}
                        </p>
                    ) : null}
                    {items?.length > 0 && (
                        <ul className="mt-1 list-none space-y-1 text-[13px] text-black/85">
                            {items.map((it) => (
                                <li key={it} className="leading-5">
                                    {it}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}

/* 🎀 Cinta con bordes triangulares */
function Ribbon({ text }) {
    return (
        <div className="relative mx-auto mt-2 inline-block">
            <span className="relative z-10 inline-block rounded-none bg-pink-200 px-5 py-1 text-[13px] font-semibold text-pink-700 shadow-md before:absolute before:-left-3 before:top-0 before:h-full before:w-3 before:-skew-x-[20deg] before:bg-pink-200 before:content-[''] after:absolute after:-right-3 after:top-0 after:h-full after:w-3 after:skew-x-[20deg] after:bg-pink-200 after:content-['']">
                {text}
            </span>
        </div>
    );
}
