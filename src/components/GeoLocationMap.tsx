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

function ZoomTracker({ onZoomChange }: { onZoomChange: (z: number) => void }) {
  const map = useMap();
  useEffect(() => {
    const handleZoom = () => onZoomChange(map.getZoom());
    map.on("zoomend", handleZoom);
    return () => { map.off("zoomend", handleZoom); };
  }, [map]);
  return null;
}

// ---------- helper: point-in-polygon ----------


// ---------- main component ----------
type SafeZone = {
  id?: string;
  lat: number;
  lng: number;
  radius: number;
  name: string;
  base_score: number;
  dynamic_score: number;
  is_tourist_landmark?: boolean;
  zone_type?: string;
  incident_count?: number;
};

export default function GeoLocationMap() {
const [safeZones, setSafeZones] = useState<SafeZone[]>([]);
const [zoom, setZoom] = useState<number>(12);
const [banner, setBanner] = useState<{ type: "safe" | "danger" | "info"; msg: string } | null>(null);
const lastPosRef = useRef<{ lat: number; lng: number; acc: number | null } | null>(null);
const safeZonesRef = useRef<SafeZone[]>([]);
const watchIdRef = useRef<number | null>(null);
const mapRef = useRef<LeafletMap | null>(null);
const prevStatusRef = useRef<"unknown" | "inside" | "outside" | "landmark">("unknown");

// 🔹 FETCH ZONES
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

    setSafeZones(data || []);
  };

  fetchSafeZones();
}, []);

useEffect(() => {
  safeZonesRef.current = safeZones;
  // Re-run position check now that zones are loaded
  if (safeZones.length > 0 && lastPosRef.current) {
    const { lat, lng, acc } = lastPosRef.current;
    updatePos(lat, lng, acc);
  }
}, [safeZones]);


// 🔥 REALTIME (ADD THIS HERE)
useEffect(() => {
  const channel = supabase
    .channel("safe-zones-live")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "safe_zones",
      },
      (payload) => {
        console.log("🔥 Realtime update:", payload);

        setSafeZones((prev) =>
          prev.map((zone) =>
            zone.id === payload.new.id
              ? { ...zone, ...payload.new }
              : zone
          )
        );
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);


  const [pos, setPos] = useState<LatLngTuple | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [status, setStatus] = useState<"unknown" | "inside" | "outside" | "landmark">("unknown");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [watching, setWatching] = useState(true);
  const [nearestZone, setNearestZone] = useState<SafeZone | null>(null);
  const [nearestDistance, setNearestDistance] = useState<number | null>(null);
 
  


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
  setAccuracy(acc ?? null);
  lastPosRef.current = { lat, lng, acc: acc ?? null };

  mapRef.current?.flyTo([lat, lng], 13);

if (!safeZonesRef.current || safeZonesRef.current.length === 0) return;

let inside = false;
let insideLandmark = false;
let landmarkName = "";
let minDistance = Infinity;
let closestZone: SafeZone | null = null;

safeZonesRef.current.forEach((zone) => {
  const distanceKm = calculateDistance(lat, lng, zone.lat, zone.lng);
  const radiusKm = zone.radius / 1000;

  if (distanceKm <= radiusKm) {
    if (zone.is_tourist_landmark) {
      insideLandmark = true;
      landmarkName = zone.name;
    } else {
      inside = true;
    }
  }

  if (distanceKm < minDistance) {
    minDistance = distanceKm;
    closestZone = zone;
  }
});

setNearestZone(closestZone);
setNearestDistance(minDistance);

const newStatus = inside ? "inside" : insideLandmark ? "landmark" : "outside";

if (prevStatusRef.current !== "unknown" && prevStatusRef.current !== newStatus) {
  if (newStatus === "outside") {
    setBanner({ type: "danger", msg: "⚠️ You are leaving a safe zone! Stay alert." });
  } else if (newStatus === "inside") {
    setBanner({ type: "safe", msg: "✅ You are now inside a safe zone." });
  } else if (newStatus === "landmark") {
    setBanner({ type: "info", msg: `📍 You are near ${landmarkName}. Stay aware of your surroundings.` });
  }
}

prevStatusRef.current = newStatus;
setStatus(newStatus as "unknown" | "inside" | "outside" | "landmark");
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
          ) : status === "landmark" ? (
  <div className="px-3 py-2 rounded-lg bg-blue-100 text-blue-900 text-sm shadow">
    📍 Tourist Landmark Nearby{" "}
    {accuracy && (
      <span className="opacity-70 ml-2">(±{Math.round(accuracy)} m)</span>
    )}
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
         <ZoomTracker onZoomChange={setZoom} />
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          
        />

        

{safeZones.filter((zone) => {
  if (zone.is_tourist_landmark) return true;
  if (zoom >= 13) return true;
  return zone.dynamic_score <= 0.5;
}).map((zone, index) => {
  let color = "red";

  if (zone.is_tourist_landmark) {
    color = "blue"; // landmarks always blue
  } else {
    const score = zone.dynamic_score;
    if (score > 0.8) color = "green";
    else if (score > 0.5) color = "orange";
    else color = "red";
  }


  return (
    <Circle
      key={index}
      center={[zone.lat, zone.lng] as LatLngTuple}
      radius={zone.radius}
      pathOptions={{
        color,
        fillColor: color,
        fillOpacity: 0.15,
        weight: 2,
      }}
    >
      <Popup>
        <strong>{zone.name}</strong><br />
        {zone.is_tourist_landmark
          ? "📍 Tourist Landmark"
          : `Safety Score: ${(zone.dynamic_score * 100).toFixed(0)}%`
        }
        {zone.incident_count && zone.incident_count > 0
          ? <><br />⚠️ {zone.incident_count} recent incident(s) nearby</>
          : null
        }
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
 {banner && (
        <div className={`absolute z-[1001] bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md px-4 py-3 rounded-xl shadow-lg flex justify-between items-center text-sm font-medium transition-all ${
          banner.type === "danger" ? "bg-red-500 text-white" :
          banner.type === "safe" ? "bg-emerald-500 text-white" :
          "bg-blue-500 text-white"
        }`}>
          <span>{banner.msg}</span>
          <button
            onClick={() => setBanner(null)}
            className="ml-4 text-white text-lg leading-none hover:opacity-70"
          >
            ✕
          </button>
</div>
 )}
 </div>
  );
}
