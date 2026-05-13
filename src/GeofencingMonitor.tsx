import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
//import { MapPin, Shield, AlertTriangle, Navigation } from 'lucide-react';
//import { Badge } from '@/components/ui/badge';
//import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
//import { Progress } from '@/components/ui/progress';
//import { MapContainer, TileLayer, Marker, Circle, Popup } from "react-leaflet";
//import "leaflet/dist/leaflet.css";
//import { patchLeafletIcons } from "@/leaflet-fix";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { supabase } from "@/lib/supabaseClient";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";

import { Shield } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


interface Location {
  latitude: number;
  longitude: number;
  accuracy: number;
}

interface SafeZone {
  name: string;
  center: { lat: number; lng: number };
  radius: number; // in kilometers
  safetyLevel: 'safe' | 'caution' | 'danger';
}

// Predefined safe zones in North East India


interface Props {
  latitude: number;
  longitude: number;
}

function RecenterMap({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView([latitude, longitude]);
  }, [latitude, longitude, map]);

  return null;
}

const GeofencingMonitor: React.FC<Props> = ({ latitude, longitude}) => {
   console.log("🔥 GeofencingMonitor rendered");  // 👈 ADD THIS
  const { t } = useTranslation();
const handleShareLocation = async () => {
  if (!location) return;

  const mapsLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;

  // 📱 Native mobile share sheet
  if (navigator.share) {
    try {
      await navigator.share({
        title: "My Live Location",
        text: "Track my live location:",
        url: mapsLink,
      });
    } catch (err) {
      console.log("Share cancelled");
    }
  }
  // 💻 Desktop fallback
  else {
    navigator.clipboard.writeText(mapsLink);
    alert("📍 Location link copied");
  }
};

const handleSafeRoutes = () => {
  if (!location) return;

  const navLink = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}&travelmode=walking`;

  window.open(navLink, "_blank");
};
const [location, setLocation] = useState<Location>({
  latitude,
  longitude,
  accuracy: 10,
});
 const [safeZones, setSafeZones] = useState<SafeZone[]>([]);
  const [currentZone, setCurrentZone] = useState<SafeZone | null>(null);
  



useEffect(() => {
  if (safeZones.length > 0) {
    checkSafeZones();
  }
}, [safeZones, location]);

  useEffect(() => {
  console.log("🚀 useEffect triggered");
  const fetchSafeZones = async () => {
    const { data, error } = await supabase
      .from("safe_zones")
      .select("*");
          console.log("Fetched from Supabase:", data);
          console.log("📡 Supabase raw response:", { data, error });

    if (error) {
      console.error("Error fetching safe zones:", error);
      return;
    }
    
    if (!data) return;
    const formattedZones = (data as any[]).map((zone) => {
      const finalScore = zone.dynamic_score;

      let safetyLevel = "danger";
      if (finalScore >= 0.7) safetyLevel = "safe";
      else if (finalScore >= 0.4) safetyLevel = "caution";

      return {
        name: zone.name,
        center: { lat: zone.lat, lng: zone.lng },
        radius: zone.radius,
        safetyLevel
      };
    });

    console.log("Formatted Zones:", formattedZones);

    setSafeZones(formattedZones as SafeZone[]);
  };

  fetchSafeZones();
}, []);



  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const checkSafeZones = () => {
    if (!location) return;

    let closestZone: SafeZone | null = null;
    let minDistance = Infinity;

    safeZones.forEach(zone => {
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        zone.center.lat,
        zone.center.lng
      );

      if (distance <= zone.radius / 1000 && distance < minDistance) {
        minDistance = distance;
        closestZone = zone;
      }
    });

    setCurrentZone(closestZone);
  };

  const getSafetyScore = (): number => {
    if (!currentZone) return 60; // Unknown area - moderate safety
    
    switch (currentZone.safetyLevel) {
      case 'safe': return 90;
      case 'caution': return 70;
      case 'danger': return 30;
      default: return 60;
    }
  };

  const [isTracking, setIsTracking] = useState(false);
  
  useEffect(() => {
  let watchId: number;

  if (isTracking) {
    watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        console.log("📍 Tracking:", pos.coords.latitude);

        setLocation({
  latitude: pos.coords.latitude,
  longitude: pos.coords.longitude,
  accuracy: pos.coords.accuracy,
});
const { data } = await supabase.auth.getSession();

const session = data.session;

if (session) {
  const { error } = await supabase
    .from("profiles")
    .update({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    })
    .eq("id", session.user.id);

  if (error) {
    console.error("Supabase update failed:", error);
  } else {
    console.log("✅ Location updated in Supabase");
  }

  await sendLocationToBackend(
  pos.coords.latitude,
  pos.coords.longitude,
  pos.coords.accuracy
);

}
      },
      (err) => {
        console.error(err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 15000,
      }
    );
  }

  

  return () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
    }
  };
}, [isTracking]);

const getSafetyBadge = () => {
  const score = getSafetyScore();

  if (score >= 80)
    return {
      variant: "default" as const,
      label: t("safeZone"),
      color: "bg-primary text-primary-foreground",
    };

  if (score >= 60)
    return {
      variant: "secondary" as const,
      label: t("cautionZone"),
      color: "bg-accent text-accent-foreground",
    };

  return {
    variant: "destructive" as const,
    label: t("highRiskZone"),
    color: "bg-destructive text-destructive-foreground",
  };
};



  const sendLocationToBackend = async (
  latitude: number,
  longitude: number,
  accuracy?: number
  ) => {
  console.log("📡 Sending location to backend", {
  latitude,
  longitude,
  accuracy,
  });
  try {
  const token = localStorage.getItem("token");
  if (!token) {
  console.error("No auth token found");
  return;
  }

  await fetch("https://https://safe-days-safezones.onrender.com/api/geofencing/location", {
  method: "POST",
    headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
    latitude,
    longitude,
    accuracy,
    }),
    });

console.log("📍 Location sent to backend");
} catch (err) {
console.error("❌ Failed to send location", err);
}
};

const startLiveTracking = async () => {
  alert("Live tracking coming soon");
};

 // const stopLiveTracking = () => {
   // if (watchId !== null) {
     // navigator.geolocation.clearWatch(watchId);
      //setWatchId(null);
    //}
    //setIsTracking(false);
  //};

  const stopLiveTracking = () => {
  setIsTracking(false);
};


  const safetyBadge = getSafetyBadge();
  const safetyScore = getSafetyScore();

console.log("✅ Component reached render");


return (
  <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        Realtime Safety Monitor
      </CardTitle>

      <CardDescription>
        AI-powered geofencing safety monitoring
      </CardDescription>
    </CardHeader>

    <CardContent className="space-y-4">

      <div>
        <p>Latitude: {location.latitude}</p>
        <p>Longitude: {location.longitude}</p>
      </div>

<div className="space-y-3">

  <div className="flex items-center justify-between">

    <div>
      <p className="text-sm text-cyan-200 font-medium">
        Current Area Safety
      </p>

      <p className="text-xs text-gray-500">
        Live AI geofencing analysis
      </p>
    </div>

    <div
      className={`px-4 py-1 rounded-full text-xs font-semibold ${
        safetyScore >= 80
          ? "bg-green-100 text-green-700"
          : safetyScore >= 60
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {safetyScore >= 80
        ? "Safe Zone"
        : safetyScore >= 60
        ? "Caution Zone"
        : "Danger Zone"}
    </div>

  </div>

  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
    <div
      className={`h-3 rounded-full transition-all duration-500 ${
        safetyScore >= 80
          ? "bg-green-500"
          : safetyScore >= 60
          ? "bg-yellow-500"
          : "bg-red-500"
      }`}
      style={{ width: `${safetyScore}%` }}
    />
  </div>

</div>

      <div className="rounded-xl overflow-hidden border">
      <MapContainer
        center={[location.latitude, location.longitude]}
        zoom={13}
        style={{ height: "350px", width: "100%" }}
      >
      
      <RecenterMap
      latitude={location.latitude}
      longitude={location.longitude}
      />

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={[location.latitude, location.longitude]}>
          <Popup>You are here</Popup>
        </Marker>

        <Circle
          center={[location.latitude, location.longitude]}
          radius={100}
          pathOptions={{
            color: "blue",
            fillOpacity: 0.2,
          }}
        />
      </MapContainer>
      </div>

<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

  <Button
    className="w-full"
    variant={isTracking ? "destructive" : "default"}
    onClick={() => setIsTracking(!isTracking)}
  >
    {isTracking ? "Stop Tracking" : "Start Tracking"}
  </Button>

  <Button
    className="w-full"
    variant="secondary"
    onClick={handleShareLocation}
  >
    Share Location
  </Button>

  <Button
  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
  onClick={handleSafeRoutes}
  >
  Safe Routes
  </Button>

</div>

  </CardContent>
  </Card>
);
};

export default GeofencingMonitor;