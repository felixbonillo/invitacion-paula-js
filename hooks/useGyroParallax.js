import { useEffect, useRef, useState } from "react";

/*
 * Hook de parallax
 * SSR-safe (No lee window/navigator en top-level)
 * Throttle con requestAnimationFrame para renderizar suave
 * Soporta permisos IOS + fallback a pointermove
 */

export function useGyroParallax(sensitivity = 15) {
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const coordsRef = useRef({ x: 0, y: 0 });
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  //Pedir permiso en IOS (Cuando el usuario pulse)
  const requestIOSPermission = async () => {
    if (typeof window === "undefined") return;
    const isIOS = /iPhone|iPad|iPod/.test(window.navigator.userAgent);
    const hasAPI =
      "DeviceOrientationEvent" in window &&
      typeof window.DeviceOrientationEvent.requestPermission === "function";

    if (isIOS && hasAPI) {
      try {
        const state = await window.DeviceOrientationEvent.requestPermission();
        setPermissionGranted(state === "granted");
        setShowPermissionPrompt(false);
      } catch {
        setPermissionGranted(false);
        setShowPermissionPrompt(false);
      }
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    let needsRAF = false;

    const push = (x, y) => {
      coordsRef.current.x = x;
      coordsRef.current.y = y;
      if (!needsRAF) {
        needsRAF = true;
        raf = requestAnimationFrame(() => {
          needsRAF = false;
          setCoords({ ...coordsRef.current });
        });
      }
    };

    const onOrient = (e) => {
      //Normalizamos -45..45 -> -1..1
      const gx = Math.max(-1, Math.max(-1, Math.min(1, (e.gamma ?? 0) / 45)));
      const gy = Math.max(-1, Math.min(1, (e.beta ?? 0) / 45));
      push(-(gx * sensitivity), gy * sensitivity);
    };

    const onPointer = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const nx = (e.clientX / w - 0.5) * 2;
      const ny = (e.clientY / h - 0.5) * 2;
      push(nx * sensitivity, ny * sensitivity);
    };

    const isIOS = /iPhone | iPad | iPod /.test(window.navigator.userAgent);
    const needsPermission =
      isIOS &&
      "DeviceOrientationEvent" in window &&
      typeof window.DeviceOrientationEvent.requestPermission === "function";

    if (needsPermission && !permissionGranted) {
      setShowPermissionPrompt(true);
      window.addEventListener("pointermove", onPointer);
    } else {
      if ("DeviceOrientationEvent" in window) {
        window.addEventListener("deviceorientation", onOrient);
      } else {
        window.addEventListener("pointermove", onPointer);
      }
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("deviceorientation", onOrient);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [permissionGranted, sensitivity]);
  return { coords, requestIOSPermission, showPermissionPrompt };
}
