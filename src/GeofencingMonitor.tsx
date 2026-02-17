import { useEffect, useRef, useState } from "react";
import { MapPin, Shield, AlertTriangle, Navigation } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MapContainer, TileLayer, Marker, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { patchLeafletIcons } from "@/leaflet-fix";
import { supabase } from "@/lib/supabaseClient";

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
const SAFE_ZONES: SafeZone[] = [
  {
    name: 'Guwahati City Center',
    center: { lat: 26.1445, lng: 91.7362 },
    radius: 5,
    safetyLevel: 'safe'
  },
  {
    name: 'Kaziranga National Park',
    center: { lat: 26.5775, lng: 93.1717 },
    radius: 3,
    safetyLevel: 'caution'
  },
  {
    name: 'Shillong Central',
    center: { lat: 25.5788, lng: 91.8933 },
    radius: 4,
    safetyLevel: 'safe'
  },
  {
    name: 'Tawang Town',
    center: { lat: 27.5886, lng: 91.8597 },
    radius: 2,
    safetyLevel: 'caution'
  }
];

interface Props {
  latitude: number;
  longitude: number;
}

const GeofencingMonitor: React.FC<Props> = ({ latitude, longitude}) => {
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
 const [location, setLocation] = useState<Location | null>(null);
  const [currentZone, setCurrentZone] = useState<SafeZone | null>(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeGeolocation();
  }, []);

  useEffect(() => {
    if (location) {
      checkSafeZones();
    }
  }, [location]);

  useEffect(() => {
    patchLeafletIcons();
  }, []);


  const initializeGeolocation = () => {
    if (!navigator.geolocation) {
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation: Location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
        setLocation(newLocation);
        setLocationEnabled(true);
        setLoading(false);
        
        // Start watching position for real-time updates
        watchPosition();
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLoading(false);
        // Use demo location for Guwahati
        setLocation({
          latitude: 26.1445,
          longitude: 91.7362,
          accuracy: 10
        });
        setLocationEnabled(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const watchPosition = () => {
    navigator.geolocation.watchPosition(
      (position) => {
        const newLocation: Location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
        setLocation(newLocation);
      },
      (error) => {
        console.error('Position watch error:', error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 60000,
        timeout: 15000
      }
    );
  };

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

    SAFE_ZONES.forEach(zone => {
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        zone.center.lat,
        zone.center.lng
      );

      if (distance <= zone.radius && distance < minDistance) {
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
  const [watchId, setWatchId] = useState<number | null>(null);

  const getSafetyBadge = () => {
    const score = getSafetyScore();
    if (score >= 80) return { variant: 'default' as const, label: 'Safe Zone', color: 'bg-primary text-primary-foreground' };
    if (score >= 60) return { variant: 'secondary' as const, label: 'Caution Zone', color: 'bg-accent text-accent-foreground' };
    return { variant: 'destructive' as const, label: 'High Risk Zone', color: 'bg-destructive text-destructive-foreground' };
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
    console.log("🟢 Start Live Tracking clicked");

    const { data } = await supabase.auth.getSession();
    const session = data.session;

    if (!session) {
      console.error("❌ No Supabase session found");
      return;
    }

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    const id = navigator.geolocation.watchPosition(
      async (pos) => {
        const newLocation = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        };

      setLocation(newLocation);

      console.log("📍 Updating Supabase profile", newLocation);

      const { error } = await supabase
        .from("profiles")
        .update({
          latitude: newLocation.latitude,
          longitude: newLocation.longitude,
        })
        .eq("id", session.user.id);

        if (error) {
          console.error("❌ Supabase update failed", error);
        }
      },

    //   // 🔥 THIS is what was missing
    //   sendLocationToBackend(
    //     newLocation.latitude,
    //     newLocation.longitude,
    //     newLocation.accuracy
    //   );
    // },
    (err) => {
      console.error("Live tracking error:", err);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 15000,
    }
  );

  setWatchId(id);
  setIsTracking(true);
};

  const stopLiveTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setIsTracking(false);
  };

  if (loading) {
    return (
      <Card className="card-cultural border-0">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <Navigation className="h-8 w-8 text-primary animate-spin mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Initializing location services...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const safetyBadge = getSafetyBadge();
  const safetyScore = getSafetyScore();

  return (
    <Card className="card-cultural border-0">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-primary" />
          <span>Real-time Safety Monitor</span>
        </CardTitle>
        <CardDescription>AI-powered geofencing and location safety analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Location Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Location Status</span>
          </div>
          <Badge className={locationEnabled ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'}>
            {locationEnabled ? 'GPS Active' : 'Demo Mode'}
          </Badge>
        </div>

        {/* Live Tracking Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Live Tracking</span>
          <Badge variant={isTracking ? "default" : "secondary"}>
            {isTracking ? "Active" : "Off"}
          </Badge>
        </div>

        {/* Safety Zone Information */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Current Area Safety</span>
            <Badge className={safetyBadge.color}>
              {safetyBadge.label}
            </Badge>
          </div>
          <Progress value={safetyScore} className="h-2" />
          <div className="text-xs text-muted-foreground">
            {currentZone ? `In ${currentZone.name}` : 'Unknown area - exercise caution'}
          </div>
        </div>

        {/* Location Coordinates (for debugging/demo) */}
        {location && (
          <div className="bg-muted/50 rounded-lg p-3 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-muted-foreground">Lat:</span> {location.latitude.toFixed(4)}
              </div>
              <div>
                <span className="text-muted-foreground">Lng:</span> {location.longitude.toFixed(4)}
              </div>
            </div>
            <div className="mt-1">
              <span className="text-muted-foreground">Accuracy:</span> ±{Math.round(location.accuracy)}m
            </div>
          </div>
        )}

        {/* Live Map */}
{location && (
  <div className="relative z-0 h-[300px] w-full rounded-lg overflow-hidden border mt-4">
    <MapContainer

            center={[location.latitude, location.longitude]}
            zoom={14}
            className="h-full w-full"
          >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={[location.latitude, location.longitude]}>
            <Popup>You are here</Popup>
          </Marker>

          <Circle
            center={[location.latitude, location.longitude]}
            radius={location.accuracy}
            pathOptions={{ color: "blue", fillOpacity: 0.15 }}
          />
          </MapContainer>
        </div>
      )}

      {/* Live Tracking Controls */}
      <div className="relative z-50 mt-4 flex gap-2">
        {!isTracking ? (
          <Button
            type="button"
            size="sm"
            onClick={() => {
              console.log("🟢 Start Live Tracking clicked");
              startLiveTracking();
            }}
          >
            ▶ Start Live Tracking
          </Button>
        ) : (
          <Button
            type="button"
            size="sm"
            variant="destructive"
            onClick={() => {
              console.log("🛑 Stop Live Tracking clicked");
              stopLiveTracking();
            }}
          >
            ⏹ Stop Live Tracking
          </Button>
        )}
      </div>

        {/* Safety Alerts */}
        {safetyScore < 70 && (
          <div className="flex items-start space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-destructive">Safety Advisory</p>
              <p className="text-muted-foreground">
                {safetyScore < 50 
                  ? 'High risk area detected. Consider moving to a safer location.'
                  : 'Exercise caution in this area. Stay alert and avoid isolated areas.'
                }
              </p>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="relative z-[1000] grid grid-cols-2 gap-2">

  <Button
    variant="outline"
    size="sm"
    className="text-xs"
    onClick={handleShareLocation}
  >
    <MapPin className="h-3 w-3 mr-1" />
    Share Location
  </Button>

  <Button
    variant="outline"
    size="sm"
    className="text-xs"
    onClick={handleSafeRoutes}
  >
    <Navigation className="h-3 w-3 mr-1" />
    Safe Routes
  </Button>
</div>

      </CardContent>
    </Card>
  );
};

export default GeofencingMonitor;