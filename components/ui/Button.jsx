"use client";
import React from "react";

const base =
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10 active:scale-95 disabled:opacity-60 disabled:pointer-events-none";
const sizes = { md: "px-5 py-3 text-sm", lg: "px-6 py-3.5 text-base" };
const variants = {
    pink: "bg-[var(--baby-pink,#F7BFCB)] text-white shadow-lg shadow-black/15 hover:bg-[#E59CAF] ring-1 ring-white/40",
    white: "bg-white text-[var(--baby-ink,#374151)] shadow-sm ring-1 ring-black/5 hover:bg-white/90",
    ghost: "bg-transparent text-[var(--baby-ink,#374151)] hover:bg-black/5",
};

export default function Button({
    as,
    href,
    size = "lg",
    variant = "pink",
    loading = false,
    fullWidth = false,
    className = "",
    children,
    ...props
}) {
    const cls = [base, sizes[size], variants[variant], fullWidth && "w-full", className]
        .filter(Boolean)
        .join(" ");

    if (href || as === "a") {
        return (
            <a href={href} className={cls} {...props}>
                {loading ? "Cargando…" : children}
            </a>
        );
    }
    return (
        <button className={cls} {...props}>
            {loading ? "Cargando…" : children}
        </button>
    );
}
