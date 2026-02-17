import { useEffect, useState } from "react";
import {
  Shield,
  AlertTriangle,
  MapPin,
  Eye,
  EyeOff,
  Bell,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import GeofencingMonitor from "@/GeofencingMonitor";
import { supabase } from "@/lib/supabaseClient";

const TouristDashboard = () => {

  const handleShareLocation = () => {
    if (!userLocation) {
      alert("Enable location first");
      return;
    }

    const { latitude, longitude } = userLocation;
    const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

    if (navigator.share) {
      navigator.share({
        title: "My Live Location",
        text: "Track my location here:",
        url: mapsLink,
      });
    } else {
      window.open(`https://wa.me/?text=Track my live location: ${mapsLink}`);
    }
  };

  const handleSafeRoute = () => {
    if (!userLocation) {
      alert("Enable location first");
      return;
    }

    const { latitude, longitude } = userLocation;

    const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&travelmode=walking`;

    window.open(url, "_blank");
  };

  const openNearby = (place: string) => {
    if (!userLocation) {
      alert("Enable location first");
      return;
    }

    const { latitude, longitude } = userLocation;

    const url = `https://www.google.com/maps/search/${place}/@${latitude},${longitude},15z`;

    window.open(url, "_blank");
  };

  const navigate = useNavigate();


  const [showLocationPrompt, setShowLocationPrompt] = useState(true);
  const [storedBlockchainId, setStoredBlockchainId] = useState<string | null>(null);
  const [last4, setLast4] = useState("");
  const [showId, setShowId] = useState(false);
  const [sosActive, setSosActive] = useState(false);

  const [incidentType, setIncidentType] = useState("");
  const [incidentDesc, setIncidentDesc] = useState("");

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [locationPermission, setLocationPermission] = useState<
    "granted" | "denied" | "pending"
  >("pending");
const [weather, setWeather] = useState<any>(null);
const [restaurants, setRestaurants] = useState<any[]>([]);

  const requestLocationAccess = async () => {
  console.log("📍 Enable location clicked");
if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      setUserLocation({
        latitude: lat,
        longitude: lng,
      });

      setLocationPermission("granted");
      setShowLocationPrompt(false);

      // 🔥 UPDATE SUPABASE PROFILE
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (!session) return;

      const { error } = await supabase
        .from("profiles")
        .update({
          latitude: lat,
          longitude: lng,
        })
        .eq("id", session.user.id);

      if (error) {
        console.error("Failed to update location in DB:", error);
      } else {
        console.log("✅ Location updated in Supabase");
      }
    },
    () => {
      setLocationPermission("denied");
      setShowLocationPrompt(false);
    }
  );
};

useEffect(() => {
  const saved = localStorage.getItem("safeUser");   // ✅ correct key

  if (saved) {
    const u = JSON.parse(saved);
    setStoredBlockchainId(u.blockchainId);
  }
}, []);
useEffect(() => {
  if (!userLocation) return;

  const fetchWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.latitude}&lon=${userLocation.longitude}&units=metric&appid=4e2fdd42a8c5a5e52a6bfb99d9318087`
      );

      const data = await res.json();
      setWeather(data);
      // 🍽 Fetch nearby restaurants
const res2 = await fetch(
  `https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:${userLocation.longitude},${userLocation.latitude},3000&limit=10&apiKey=b149ee806e4542e4b8a0d2b9485ba9ce`
);

const restData = await res2.json();
console.log("🍽 restaurants data", restData);
setRestaurants(restData.features);

    } catch (err) {
      console.error("Weather fetch failed", err);
    }
  };

  fetchWeather();
}, [userLocation]);


  // AUTO REQUEST LOCATION ON DASHBOARD LOAD
// useEffect(() => {
//   if (!navigator.geolocation) {
//     setLocationPermission("denied");
//     return;
//   }

//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const lat = position.coords.latitude;
//       const lng = position.coords.longitude;

//       setUserLocation({
//         latitude: lat,
//         longitude: lng,
//       });

//       setLocationPermission("granted");
//     },
//     (error) => {
//       console.error("Location permission denied", error);
//       setLocationPermission("denied");
//     }
//   );
// }, []);

  // REVEAL ID
  const handleRevealId = () => {
    if (!storedBlockchainId) return;
    if (storedBlockchainId.slice(-4) === last4.toUpperCase())
 setShowId(true);
    else alert("Last 4 digits incorrect");
  };

  // SEND SOS (INSERT TO SUPABASE)
  const handleSOS = async () => {
  setSosActive(true);

  // 1️⃣ Get logged-in user
  const { data } = await supabase.auth.getSession();
  const session = data.session;

  if (!session) {
    alert("You are not logged in");
    setSosActive(false);
    return;
  }

  // 2️⃣ Get latest location from profiles
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (profileError || !profile?.latitude || !profile?.longitude) {
    alert("Location not available yet");
    setSosActive(false);
    return;
  }

  // 3️⃣ Create incident
  const { error } = await supabase.from("incidents").insert({
    user_id: session.user.id,
    latitude: profile.latitude,
    longitude: profile.longitude,
    city: profile.city || "Unknown",
    status: "active",
    name: profile.full_name,        
    phone: profile.phone,           
    email: profile.email, 
  });

  if (error) {
    console.error("❌ Failed to raise SOS", error);
    alert("Failed to send SOS");
  } else {
    alert("🚨 SOS sent to police!");
  }

  setTimeout(() => setSosActive(false), 3000);
};


  // REPORT INCIDENT
const submitIncident = async () => {
  if (!incidentType || !incidentDesc) {
    alert("Fill all fields");
    return;
  }

  const { data } = await supabase.auth.getSession();
  const session = data.session;

  if (!session) {
    alert("You are not logged in");
    return;
  }

  // get latest profile with location
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (profileError || !profile?.latitude || !profile?.longitude) {
    alert("Location not available");
    return;
  }

  const { error } = await supabase.from("incidents").insert({
    user_id: session.user.id,
    type: incidentType,
    description: incidentDesc,
    latitude: profile.latitude,
    longitude: profile.longitude,
    city: profile.city || "Unknown",
    status: "active",
  });

  if (error) {
    console.error(error);
    alert("Failed to send incident");
  } else {
    alert("Incident sent to police 🚨");
  }

  setIncidentType("");
  setIncidentDesc("");
};


  return (
    <div className="min-h-screen bg-gray-50">
      
      {showLocationPrompt && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center text-white"> 

    <div className="text-center max-w-md px-6 animate-fade-in">

      <div className="mb-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md shadow-xl">
          <MapPin className="w-10 h-10" />
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-4">
        Stay Safe Around You
      </h1>

      <p className="text-white/90 mb-8">
        SAFE DAYS uses your live location to show nearby police stations,
        hospitals, tourist help desks, and real-time safety alerts.
      </p>

      <div className="space-y-3">

        <Button
          size="lg"
          className="w-full bg-white text-emerald-700 hover:bg-gray-100 font-semibold"
          onClick={requestLocationAccess}
        >
          Enable Location
        </Button>

        <Button
          variant="ghost"
          size="lg"
          className="w-full text-white/80 hover:text-white"
          onClick={() => setShowLocationPrompt(false)}
        >
          Maybe Later
        </Button>

      </div>
    </div>
  </div>
)}


      {/* HEADER */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">

          <div className="flex items-center gap-2">
            <Shield className="text-green-600" />
            <h1 className="text-xl font-bold">Tourist Safety Dashboard</h1>
          </div>
          <Button variant="outline" onClick={() => navigate(-1)}>
            ← Back
          </Button>
        </div>
      </header>
<div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* LEFT */}
        <div className="lg:col-span-3 space-y-6 self-start">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-red-600 flex gap-2">
                <AlertTriangle /> Emergency SOS
              </CardTitle>
              <CardDescription>Immediate police assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full bg-red-600"
                onClick={handleSOS}
                disabled={sosActive}
              >
                {sosActive ? "SOS ACTIVE..." : "SEND SOS"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Blockchain Safety ID</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {!showId ? (
                <>
                  <Label>Enter Last 4 Digits</Label>
                  <Input value={last4} onChange={(e) => setLast4(e.target.value)} />
                  <Button onClick={handleRevealId}>
                    <Eye className="mr-2 h-4 w-4" /> Reveal ID
                  </Button>
                </>
              ) : (
                <>
                  <p className="font-mono text-green-600">{storedBlockchainId}</p>
                  <Button variant="outline" onClick={() => setShowId(false)}>
                    <EyeOff className="mr-2 h-4 w-4" /> Hide
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="bg-green-600">Verified Tourist</Badge>
            </CardContent>
          </Card>
          {weather?.main && (
  <Card>
    <CardHeader>
      <CardTitle>🌦 Weather Nearby</CardTitle>
      <CardDescription>{weather.name}</CardDescription>
    </CardHeader>
<CardContent className="flex flex-wrap items-center justify-between gap-4">

      <div className="text-3xl font-bold min-w-[90px]">
  {Math.round(weather?.main?.temp)}°C
</div>

<div className="text-sm capitalize text-muted-foreground min-w-[120px]">
  {weather?.weather?.[0]?.description}
</div>

<div className="text-sm min-w-[120px]">
  💧 Humidity: {weather?.main?.humidity}%
</div>

<div className="text-sm min-w-[120px]">
  💨 Wind: {weather?.wind?.speed} m/s
</div>
    </CardContent>
  </Card>
)}
        </div>

        {/* MIDDLE */}
        <div className="lg:col-span-6 space-y-6">

          {locationPermission === "granted" && userLocation && (
            <GeofencingMonitor
              latitude={userLocation.latitude}
              longitude={userLocation.longitude}
            />
          )}

        </div>

        {/* RIGHT */}
<div className="lg:col-span-3 space-y-6 self-start">

          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex gap-2">
                <FileText /> Report Incident
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <select
                className="w-full border p-2 rounded"
                value={incidentType}
                onChange={(e) => setIncidentType(e.target.value)}
              >
                <option value="">Select Type</option>
                <option>Theft</option>
                <option>Harassment</option>
                <option>Accident</option>
                <option>Suspicious Activity</option>
              </select>

              <textarea
                className="w-full border p-2 rounded"
                rows={3}
                value={incidentDesc}
                onChange={(e) => setIncidentDesc(e.target.value)}
                placeholder="Describe what happened..."
              />

              <Button className="w-full bg-green-600" onClick={submitIncident}>
                Submit Report
              </Button>
            </CardContent>
          </Card>
<Card>
            <CardHeader>
              <CardTitle className="flex gap-2">
                <MapPin /> Nearby Safety Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              
<Button
  variant="outline"
  className="w-full"
  onClick={() => openNearby("police station")}
>
  Police Station
</Button>
<Button
  variant="outline"
  className="w-full"
  onClick={() => openNearby("hospital")}
>
  Hospital
</Button>
<Button
  variant="outline"
  className="w-full"
  onClick={() => openNearby("tourist help desk")}
>
  Tourist Help Desk
</Button>

            </CardContent>
          </Card>
          
          <Card>
  <CardHeader>
    <CardTitle className="flex gap-2">
      <Bell /> Safety Alerts
    </CardTitle>
  </CardHeader>
  <CardContent>No active alerts</CardContent>
</Card>
        </div>
 {restaurants.length > 0 && (
  <div className="lg:col-span-12">
  <Card>
    <CardHeader>
      <CardTitle>🍽 Nearby Restaurants</CardTitle>
      <CardDescription>Based on your current location</CardDescription>
    </CardHeader>

    <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {restaurants.map((place, index) => (
        <div
          key={index}
          className="p-3 border rounded-xl text-sm hover:bg-muted cursor-pointer bg-white"
          onClick={() =>
            window.open(
              `https://www.google.com/maps/search/?api=1&query=${place.properties.lat},${place.properties.lon}`,
              "_blank"
            )
          }
        >
          <p className="font-medium">{place.properties.name}</p>
          <p className="text-xs text-muted-foreground">
            {place.properties.address_line2}
          </p>
        </div>
      ))}
    </CardContent>
  </Card>
  </div>
)}       
        
      </div>
      
    </div>
  );
};

export default TouristDashboard;
