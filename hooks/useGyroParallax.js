import { useState, useEffect, useCallback } from "react";

export function useGyroParallax(sensitivity = 15) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);

  // Usamos useCallback para memoizar la función de solicitud de permiso.
  // Esto es una buena práctica y asegura que la función no cambie innecesariamente.
  const requestIOSPermission = useCallback(async () => {
    // 'requestPermission' solo existe en dispositivos iOS 13+
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      try {
        const permissionState =
          await DeviceOrientationEvent.requestPermission();
        if (permissionState === "granted") {
          setPermissionGranted(true);
          setShowPermissionPrompt(false); // Ocultar el prompt si se otorga
          console.log("Permiso de giroscopio otorgado.");
        } else {
          console.warn("Permiso de giroscopio denegado.");
          alert(
            "Para el efecto 3D, por favor permite el acceso al sensor de movimiento en la configuración de tu dispositivo."
          );
          setPermissionGranted(false);
          setShowPermissionPrompt(false);
        }
      } catch (error) {
        console.error("Error al solicitar permiso de giroscopio:", error);
        setPermissionGranted(false);
        setShowPermissionPrompt(false);
      }
    } else {
      // En otros navegadores (Android, Desktop), no se necesita permiso explícito
      setPermissionGranted(true);
      setShowPermissionPrompt(false);
    }
  }, []); // Array de dependencias vacío, esta función no necesita recrearse

  useEffect(() => {
    if (!window.DeviceOrientationEvent) {
      console.warn("DeviceOrientationEvent no soportado en este navegador.");
      setPermissionGranted(false);
      return;
    }

    const isIOS =
      /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;

    // Si es iOS, el permiso NO ha sido otorgado, y la función para pedir permiso existe,
    // entonces mostramos el prompt.
    if (
      isIOS &&
      !permissionGranted &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      setShowPermissionPrompt(true);
    } else if (!isIOS) {
      // No es iOS, o no tiene la función de pedir permiso, asumimos que está bien o no es necesario
      setPermissionGranted(true);
      setShowPermissionPrompt(false); // Asegurarnos de que el prompt no se muestre en no-iOS
    }

    const handleOrientation = (event) => {
      const moveX = (event.gamma || 0) * (sensitivity / 90);
      const moveY = (event.beta || 0) * (sensitivity / 180);

      setCoords({
        x: -moveX,
        y: moveY,
      });
    };

    if (permissionGranted) {
      // Solo si el permiso está otorgado, añadimos el listener
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [sensitivity, permissionGranted, requestIOSPermission]); // Añadimos requestIOSPermission a las dependencias

  // El hook devuelve un objeto con coords, la función requestIOSPermission y el estado showPermissionPrompt
  return { coords, requestIOSPermission, showPermissionPrompt };
}
