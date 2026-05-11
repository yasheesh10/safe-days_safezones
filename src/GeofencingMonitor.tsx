import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
//import { MapPin, Shield, AlertTriangle, Navigation } from 'lucide-react';
//import { Badge } from '@/components/ui/badge';
//import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
//import { Button } from '@/components/ui/button';
//import { Progress } from '@/components/ui/progress';
//import { MapContainer, TileLayer, Marker, Circle, Popup } from "react-leaflet";
//import "leaflet/dist/leaflet.css";
//import { patchLeafletIcons } from "@/leaflet-fix";
import L from "leaflet";
import { supabase } from "@/lib/supabaseClient";

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
const location: Location = {
  latitude,
  longitude,
  accuracy: 10,
};
 const [safeZones, setSafeZones] = useState<SafeZone[]>([]);
  const [currentZone, setCurrentZone] = useState<SafeZone | null>(null);
  



  useEffect(() => {
    if (location) {
      checkSafeZones();
    }
  }, [location, safeZones]);


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


  // const sendLocationToBackend = async (
  //   latitude: number,
  //   longitude: number,
  //   accuracy?: number
  // ) => {
  //   console.log("📡 Sending location to backend", {
  //     latitude,
  //     longitude,
  //     accuracy,
  //   });
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       console.error("No auth token found");
  //       return;
  //     }

    // await fetch("http://localhost:5000/api/geofencing/location", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify({
    //     latitude,
    //     longitude,
    //     accuracy,
    //   }),
    // });

//     console.log("📍 Location sent to backend");
//   } catch (err) {
//     console.error("❌ Failed to send location", err);
//   }
// };

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
  <div>
    <h1>WORKING</h1>
  </div>
);
};

export default GeofencingMonitor;