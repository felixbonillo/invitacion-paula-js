"use client";
import React from "react";
import { isEventExpired } from "@/lib/eventUtils";
import { eventConfig } from "@/lib/config";

export default function ExpirationOverlay() {
    const [expired, setExpired] = React.useState(false);

    React.useEffect(() => {
        setExpired(isEventExpired(eventConfig.dateISO));
    }, []);

    if (!expired) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 text-center text-white backdrop-blur-md">
            <div>
                <p className="text-2xl font-bold mb-3">✨ Gracias por acompañarnos ✨</p>
                <p>El evento ya ha finalizado, pero guardamos cada recuerdo en el corazón 💖</p>
            </div>
        </div>
    );
}
