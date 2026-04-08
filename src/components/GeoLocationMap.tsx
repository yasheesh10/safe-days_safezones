import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  Circle,
  Popup,
  useMap,
} from "react-leaflet";
import { supabase } from "@/lib/supabaseClient";
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


// ---------- main component ----------
type SafeZone = {
  lat: number;
  lng: number;
  radius: number;
  name: string;
  base_score: number;
  dynamic_score: number;
};
export default function GeoLocationMap() {
const [safeZones, setSafeZones] = useState<SafeZone[]>([]);
useEffect(() => {
  const fetchSafeZones = async () => {
    const { data, error } = await supabase
      .from("safe_zones")
      .select("*");

    console.log("📡 Supabase zones:", data);

    if (error) {
      console.error("Error fetching zones:", error);
      return;
    }

    //setSafeZones(data || []);
  };

  fetchSafeZones();
}, []);

const generateDynamicZones = (centerLat: number, centerLng: number) => {
  const zones: SafeZone[] = [];

  const locations = [
    { lat: centerLat + 0.02, lng: centerLng + 0.01 },
    { lat: centerLat - 0.015, lng: centerLng - 0.02 },
    { lat: centerLat + 0.01, lng: centerLng - 0.015 },
    { lat: centerLat - 0.025, lng: centerLng + 0.02 },
    { lat: centerLat + 0.03, lng: centerLng - 0.01 },
  ];

  locations.forEach((loc, i) => {
    const base_score = Math.floor(50 + Math.random() * 50);
    const dynamic_score = Math.floor(Math.random() * 10);

    zones.push({
      lat: loc.lat,
      lng: loc.lng,
      radius: 1 + Math.random(), // 🔥 varied size
      name: `Zone ${i + 1}`,
      base_score,
      dynamic_score,
    });
  });

  setSafeZones(zones);
};

  const [pos, setPos] = useState<LatLngTuple | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [status, setStatus] = useState<"unknown" | "inside" | "outside">("unknown");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [watching, setWatching] = useState(true);
  const watchIdRef = useRef<number | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const [nearestZone, setNearestZone] = useState<SafeZone | null>(null);
  const [nearestDistance, setNearestDistance] = useState<number | null>(null);
  const [prevStatus, setPrevStatus] = useState<"unknown" | "inside" | "outside">("unknown");
  


  useEffect(() => {
  if (!watching) return;

  const id = navigator.geolocation.watchPosition(
    (p) => {
      updatePos(
        p.coords.latitude,
        p.coords.longitude,
        p.coords.accuracy ?? null
      );
    },
    (err) => console.error(err),
    {
      enableHighAccuracy: true,
      maximumAge: 5000,
      timeout: 10000,
    }
  );

  return () => navigator.geolocation.clearWatch(id);
}, [watching]);

  // ---------- your polygon (safe zone) ----------


  // compute center
  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Earth radius in km

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}


const updatePos = (lat: number, lng: number, acc?: number | null) => {
  const p: LatLngTuple = [lat, lng];
  setPos(p);
  if (!safeZones.length) {
  generateDynamicZones(lat, lng);
}
  setAccuracy(acc ?? null);

  mapRef.current?.flyTo([lat, lng], 13);

if (!safeZones || safeZones.length === 0) return;

let inside = false;
let minDistance = Infinity;
let closestZone: SafeZone | null = null;

safeZones.forEach(zone => {
  const distance = calculateDistance(
    lat,
    lng,
    zone.lat,
    zone.lng
  );

  // check inside
  if (distance <= zone.radius) {
    inside = true;
  }

  // find nearest
  if (distance < minDistance) {
    minDistance = distance;
    closestZone = zone;
  }
});

// ✅ update nearest zone
setNearestZone(closestZone);
setNearestDistance(minDistance);

  const newStatus = inside ? "inside" : "outside";

// 🚨 trigger alert ONLY when status changes
if (prevStatus !== newStatus) {
  if (newStatus === "outside") {
    alert("⚠️ Warning: You are entering an unsafe area!");
  } else if (newStatus === "inside") {
    alert("✅ You are now in a safe zone.");
  }
}

setStatus(newStatus);
setPrevStatus(newStatus);
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

  const center: LatLngTuple = pos ?? [19.0760, 72.8777];

  return (
    <div className="relative w-full h-[85vh] rounded-xl overflow-hidden">
      {/* ---------- status badge ---------- */}
      <div className="absolute z-[1000] left-3 top-3">
        {nearestZone && nearestDistance !== null && (
  <div className="mt-2 px-3 py-2 rounded-lg bg-white text-sm shadow">
    📍 Nearest: <strong>{nearestZone.name}</strong><br />
    Distance:{" "}
    {nearestDistance < 1
      ? `${Math.round(nearestDistance * 1000)} m`
      : `${nearestDistance.toFixed(2)} km`}
  </div>
)}
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
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        
      >
        <SetMapRef mapRef={mapRef} /> {/* ✅ attach map reference */}

        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

{safeZones.map((zone, index) => {
  let color = "red";

  if (zone.base_score + zone.dynamic_score >= 80) color = "green";
  else if (zone.base_score + zone.dynamic_score >= 60) color = "orange";

  // ✅ skip invalid zones
  if (zone.lat === undefined || zone.lng === undefined) return null;

  return (
    <Circle
      key={index}
      center={[zone.lat, zone.lng] as LatLngTuple}
      radius={zone.radius * 1000}
      pathOptions={{
        color,
        fillColor: color,
        fillOpacity: 0.15,
        weight: 2,
      }}
    >
      <Popup>
        <strong>{zone.name}</strong> <br />
        Safety Score: {zone.base_score + zone.dynamic_score}
      </Popup>
    </Circle>
  );
})}
{/* ✅ USER LOCATION */}
  {pos && (
    <>
      <Marker position={pos} />
      {accuracy && (
        <Circle center={pos} radius={Math.max(accuracy, 10)} />
      )}
    </>
  )}

</MapContainer>
</div>
  );
}
