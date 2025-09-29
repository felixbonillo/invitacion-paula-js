import { useState, useEffect } from "react";

// Este hook gestiona el acceso a la API DeviceOrientation y calcula las coordenadas de movimiento
export function useGyroParallax(sensitivity = 15) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false); // Para mostrar un mensaje al usuario

  useEffect(() => {
    // Verificar si el navegador soporta DeviceOrientationEvent
    if (!window.DeviceOrientationEvent) {
      console.warn("DeviceOrientationEvent no soportado en este navegador.");
      setPermissionGranted(false); // No podemos obtener datos si no está soportado
      return;
    }

    // Función para solicitar permiso en iOS
    const requestIOSPermission = async () => {
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
            // Opcional: Podrías mostrar un mensaje permanente o deshabilitar el efecto
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
    };

    // Lógica para decidir cuándo intentar solicitar el permiso
    // Para iOS, se necesita una interacción del usuario. Por ahora, si detectamos iOS y no hay permiso,
    // mostramos un prompt. En un entorno real, esto se activaría con un botón.
    const isIOS =
      /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (
      isIOS &&
      !permissionGranted &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      setShowPermissionPrompt(true); // Indica que debemos mostrar un mensaje o botón
    } else if (!isIOS) {
      // No es iOS o no tiene la función de pedir permiso, asumimos que está bien o no es necesario
      setPermissionGranted(true);
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
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [sensitivity, permissionGranted]);

  // Retornamos las coordenadas Y la función para intentar obtener el permiso si es iOS
  return {
    coords,
    requestIOSPermission: permissionGranted
      ? null
      : () => setShowPermissionPrompt(true),
    showPermissionPrompt,
  };
}
