"use client";

import { useEffect, useRef } from "react";

export function AudioProvider({ src, triggerRef, children }) {
    const audioRef = useRef(null);

    useEffect(() => {
        const el = new Audio(src);
        el.preload = "auto";
        el.loop = true;
        el.volume = 0.85;
        el.muted = false;
        audioRef.current = el;

        // Arranca al hacer click en el botón (triggerRef)
        const handlePlay = () => {
            el.play().catch((err) => console.warn("No se pudo reproducir el audio:", err));
        };

        if (triggerRef?.current) {
            triggerRef.current.addEventListener("click", handlePlay);
        }

        return () => {
            if (triggerRef?.current) {
                triggerRef.current.removeEventListener("click", handlePlay);
            }
            el.pause();
            el.src = "";
            el.load();
            audioRef.current = null;
        };
    }, [src, triggerRef]);

    return children;
}
