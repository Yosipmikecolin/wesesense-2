import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import classes from "./Map.module.css";

interface MapProps {
  latitude: number; // Coordenada de latitud
  longitude: number; // Coordenada de longitud
}

const MapWithLeaflet = ({ latitude, longitude }: MapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Asegurar que las coordenadas no sean nulas
    const coords: [number, number] = [latitude, longitude];

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove(); // Elimina el mapa anterior antes de crear uno nuevo
    }

    const map = L.map(mapContainerRef.current, { minZoom: 17 }).setView(
      coords,
      18
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // 🔥 Creando el `divIcon`
    const customIcon = L.divIcon({
      className: "custom-marker", // Clases CSS para los estilos
      html: `
        <div class=${classes["location-container"]}>
          <div class=${classes["location-dot"]}></div>
          <div class=${classes["location-ring"]}></div>
          <div class=${classes["location-ring"]}></div>
        </div>
      `,
      iconSize: [40, 40], // Tamaño fijo
      iconAnchor: [20, 40], // Ajuste para que el marcador esté bien anclado
    });

    L.marker(coords, { icon: customIcon }).addTo(map);

    mapInstanceRef.current = map;
  }, [latitude, longitude]);

  return (
    <div
      ref={mapContainerRef}
      style={{ height: "200px", width: "100%", borderRadius: 5 }}
    />
  );
};

export default MapWithLeaflet;
