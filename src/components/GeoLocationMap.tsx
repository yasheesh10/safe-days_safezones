import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  Circle,
  useMap,
} from "react-leaflet";
import type { LatLngTuple, Map as LeafletMap } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { patchLeafletIcons } from "../leaflet-fix";

patchLeafletIcons();

// ---------- helper to attach map instance in v4 ----------
function SetMapRef({ mapRef }: { mapRef: React.MutableRefObject<LeafletMap | null> }) {
  const map = useMap();
  useEffect(() => {
    mapRef.current = map;
  }, [map]);
  return null;
}

// ---------- helper: point-in-polygon ----------
function pointInPolygon(point: LatLngTuple, polygon: LatLngTuple[]): boolean {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersect =
      (yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

// ---------- main component ----------
export default function GeoLocationMap() {
  const [pos, setPos] = useState<LatLngTuple | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [status, setStatus] = useState<"unknown" | "inside" | "outside">("unknown");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [watching, setWatching] = useState(false);
  const watchIdRef = useRef<number | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  // ---------- your polygon (safe zone) ----------
  const safeZone: LatLngTuple[] = useMemo(
    () => [
      [25.5796, 91.8843],
      [25.5750, 91.8918],
      [25.5699, 91.8870],
      [25.5728, 91.8788],
      [25.5773, 91.8785],
    ],
    []
  );

  // compute center
  const zoneCenter: LatLngTuple = useMemo(() => {
    const lat = safeZone.reduce((s, p) => s + p[0], 0) / safeZone.length;
    const lng = safeZone.reduce((s, p) => s + p[1], 0) / safeZone.length;
    return [lat, lng];
  }, [safeZone]);

  const updatePos = (lat: number, lng: number, acc?: number | null) => {
    const p: LatLngTuple = [lat, lng];
    setPos(p);
    setAccuracy(acc ?? null);
    setStatus(pointInPolygon(p, safeZone) ? "inside" : "outside");
  };

  const locateOnce = () => {
    if (!("geolocation" in navigator)) {
      setErrorMsg("Geolocation not supported on this device/browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setErrorMsg(null);
        updatePos(p.coords.latitude, p.coords.longitude, p.coords.accuracy ?? null);
        mapRef.current?.flyTo([p.coords.latitude, p.coords.longitude], 17, {
          duration: 0.6,
        });
      },
      (err) => setErrorMsg(err.message || "Unable to get location."),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const toggleWatch = () => {
    if (!("geolocation" in navigator)) {
      setErrorMsg("Geolocation not supported.");
      return;
    }
    if (watching) {
      if (watchIdRef.current != null)
        navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
      setWatching(false);
      return;
    }
    const id = navigator.geolocation.watchPosition(
      (p) => {
        setErrorMsg(null);
        updatePos(p.coords.latitude, p.coords.longitude, p.coords.accuracy ?? null);
      },
      (err) => setErrorMsg(err.message || "Unable to track location."),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
    );
    watchIdRef.current = id;
    setWatching(true);
  };

  useEffect(() => {
    return () => {
      if (watchIdRef.current != null)
        navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, []);

  const center: LatLngTuple = pos ?? zoneCenter;

  return (
    <div className="relative w-full h-[85vh] rounded-xl overflow-hidden">
      {/* ---------- status badge ---------- */}
      <div className="absolute z-[1000] left-3 top-3">
        {errorMsg ? (
          <div className="px-3 py-2 rounded-lg bg-rose-100 text-rose-900 text-sm shadow">
            {errorMsg}
          </div>
        ) : status === "unknown" ? (
          <div className="px-3 py-2 rounded-lg bg-slate-100 text-slate-900 text-sm shadow">
            Fetching location…
          </div>
        ) : status === "inside" ? (
          <div className="px-3 py-2 rounded-lg bg-emerald-100 text-emerald-900 text-sm shadow">
            ✅ Inside Safe Zone{" "}
            {accuracy && (
              <span className="opacity-70 ml-2">(±{Math.round(accuracy)} m)</span>
            )}
          </div>
        ) : (
          <div className="px-3 py-2 rounded-lg bg-amber-100 text-amber-900 text-sm shadow">
            ⚠️ Outside Safe Zone{" "}
            {accuracy && (
              <span className="opacity-70 ml-2">(±{Math.round(accuracy)} m)</span>
            )}
          </div>
        )}
      </div>

      {/* ---------- controls ---------- */}
      <div className="absolute z-[1000] right-3 top-3 flex gap-2">
        <button
          onClick={locateOnce}
          className="px-3 py-2 rounded-lg bg-white shadow text-sm hover:bg-slate-50"
          title="Locate me once"
        >
          📍 Locate me
        </button>
        <button
          onClick={() => pos && mapRef.current?.flyTo(pos, 17)}
          className="px-3 py-2 rounded-lg bg-white shadow text-sm hover:bg-slate-50"
          title="Recenter"
        >
          🎯 Recenter
        </button>
        <button
          onClick={toggleWatch}
          className={`px-3 py-2 rounded-lg shadow text-sm ${
            watching ? "bg-green-600 text-white" : "bg-white hover:bg-slate-50"
          }`}
          title="Start/stop live tracking"
        >
          {watching ? "🛑 Stop live" : "▶️ Live"}
        </button>
      </div>

      {/* ---------- leaflet map ---------- */}
      <MapContainer
        center={center}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <SetMapRef mapRef={mapRef} /> {/* ✅ attach map reference */}

        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polygon positions={safeZone} pathOptions={{ weight: 2 }} />

        {pos && (
          <>
            <Marker position={pos} />
            {accuracy && <Circle center={pos} radius={Math.max(accuracy, 10)} />}
          </>
        )}
      </MapContainer>
    </div>
  );
}
