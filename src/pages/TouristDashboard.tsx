import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
import TrustedContacts from "@/components/TrustedContacts";

const TouristDashboard = ({ setGlobalNotification }: any) => {
  const { t } = useTranslation();

  const handleShareLocation = () => {
    if (!userLocation) {
      alert(t("enableLocationFirst"));
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

  const handleCallPolice = () => {
  window.location.href = "tel:100";
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
    alert(t("geolocationNotSupported"));
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
useEffect(() => {
  const setupRealtime = async () => {
    const { data } = await supabase.auth.getSession();
    const session = data.session;

    if (!session) return;

    const userId = session.user.id;

    const channel = supabase
      .channel("incident-status-listener")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "incidents",
        },
        async (payload) => {
          console.log("Realtime update received:", payload);

          if (payload.new.status === "assigned") {
            // 🔥 Confirm this incident belongs to this user
            const { data } = await supabase
              .from("incidents")
              .select("user_id")
              .eq("id", payload.new.id)
              .single();

            if (data?.user_id === userId) {
  const message = "🚓 Officer assigned – Help arriving in 2 mins";

  setGlobalNotification(message);
  localStorage.setItem("activeNotification", message);
}
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  setupRealtime();
}, [setGlobalNotification]);

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
    else alert(t("last4DigitsIncorrect"));
  };

  // SEND SOS (INSERT TO SUPABASE)
  const handleSOS = async () => {
  setSosActive(true);

  // 1️⃣ Get logged-in user
  const { data } = await supabase.auth.getSession();
  const session = data.session;

  if (!session) {
    alert(t("notLoggedIn"));
    setSosActive(false);
    return;
  }

if (!userLocation) {
  alert("Enable location first");
  setSosActive(false);
  return;
}


// 🔴 OFFLINE MODE
if (!navigator.onLine) {
  const message = `🚨 Emergency! I need help. My location: https://www.google.com/maps?q=${userLocation.latitude},${userLocation.longitude}`;

  localStorage.setItem(
    "offlineSOS",
    JSON.stringify({
      user_id: session.user.id,
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      time: new Date().toISOString(),
    })
  );

  window.location.href = `sms:100?body=${encodeURIComponent(message)}`;

  alert("📩 SMS opened. Please send it to contact police.");

  setSosActive(false);
  return;
}

const { error } = await supabase.from("incidents").insert({
  user_id: session.user.id,
  latitude: userLocation.latitude,
  longitude: userLocation.longitude,
  location: `https://www.google.com/maps?q=${userLocation.latitude},${userLocation.longitude}`, // 🔥 IMPORTANT
  city: "Mumbai",
  type: "SOS",
  description: "Emergency SOS triggered",
  status: "active",
});


  if (error) {
    console.error("❌ Failed to raise SOS", error);
    alert("Failed to send SOS");
  } else {
   await sendAlertToTrustedContacts(
  userLocation.latitude,
  userLocation.longitude
);

    alert("🚨 SOS sent to police!");
  }

  setTimeout(() => setSosActive(false), 3000);
};

// 🚨 SEND ALERT TO TRUSTED CONTACTS
const sendAlertToTrustedContacts = async (lat: number, lng: number) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: contacts } = await supabase
    .from("trusted_contacts")
    .select("*")
    .eq("user_id", user?.id);

  if (!contacts || contacts.length === 0) return;

 if (!lat || !lng) {
  console.error("Location missing for SOS email");
  return;
}

const liveLink = `https://www.google.com/maps?q=${lat},${lng}`;

  await fetch(`${import.meta.env.VITE_API_URL}/api/send-sos-alert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contacts,
      locationLink: liveLink,
    }),
  });
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

  if (!userLocation) {
  alert("Enable location first");
  return;
}

const { error } = await supabase.from("incidents").insert({
  user_id: session.user.id,
  type: incidentType,
  description: incidentDesc,
  latitude: userLocation.latitude,
  longitude: userLocation.longitude,
  city: "Mumbai",
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

      <h1 className="text-3xl font-bold mb-4">{t("staySafeAroundYou")}
      </h1>

      <p className="text-white/90 mb-8">{t("locationPopupDesc")}
      </p>

      <div className="space-y-3">

        <Button
          size="lg"
          className="w-full bg-white text-emerald-700 hover:bg-gray-100 font-semibold"
          onClick={requestLocationAccess}
        >{t("enableLocation")}
        </Button>

        <Button
          variant="ghost"
          size="lg"
          className="w-full text-white/80 hover:text-white"
          onClick={() => setShowLocationPrompt(false)}
        >{t("maybeLater")}
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
            <h1 className="text-xl font-bold">{t("touristSafetyDashboard")}</h1>
          </div>
          <Button variant="outline" onClick={() => navigate(-1)}>
            ← {t("back")}
          </Button>
        </div>
      </header>
<div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* LEFT */}
        <div className="lg:col-span-3 space-y-6 self-start">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-red-600 flex gap-2">
                <AlertTriangle />{t("emergencySOS")}
              </CardTitle>
              <CardDescription>{t("immediatePoliceAssistance")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full bg-red-600"
                onClick={handleSOS}
                disabled={sosActive}
              >{sosActive ? t("sosActive") : t("sendSOS")}
              </Button>
              <Button
  className="w-full bg-black text-white mt-2"
  onClick={handleCallPolice}
>
  📞 Call Police
</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("blockchainSafetyId")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {!showId ? (
                <><Label>{t("enterLast4Digits")}</Label>
                  <Input value={last4} onChange={(e) => setLast4(e.target.value)} />
                  <Button onClick={handleRevealId}>
                    <Eye className="mr-2 h-4 w-4" /> {t("revealId")}
                  </Button>
                </>
              ) : (
                <>
                  <p className="font-mono text-green-600">{storedBlockchainId}</p>
                  <Button variant="outline" onClick={() => setShowId(false)}>
                    <EyeOff className="mr-2 h-4 w-4" /> {t("hide")}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("accountStatus")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="bg-green-600">{t("verifiedTourist")}</Badge>
            </CardContent>
          </Card>
          {weather?.main && (
  <Card>
    <CardHeader>
      <CardTitle>🌦 {t("weatherNearby")}</CardTitle>
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
  💧 {t("humidity")}: {weather?.main?.humidity}%
</div>

<div className="text-sm min-w-[120px]">
  💨 {t("wind")}: {weather?.wind?.speed} m/s
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
                <FileText /> {t("reportIncident")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <select
                className="w-full border p-2 rounded"
                value={incidentType}
                onChange={(e) => setIncidentType(e.target.value)}
              >
                <option value="">{t("selectType")}</option>
                <option value="theft">{t("theft")}</option>
<option value="harassment">{t("harassment")}</option>
<option value="accident">{t("accident")}</option>
<option value="suspiciousActivity">{t("suspiciousActivity")}</option>
              </select>

              <textarea
                className="w-full border p-2 rounded"
                rows={3}
                value={incidentDesc}
                onChange={(e) => setIncidentDesc(e.target.value)}
                placeholder={t("describeIncident")}
              />

              <Button className="w-full bg-green-600" onClick={submitIncident}>
                {t("submitReport")}
              </Button>
            </CardContent>
          </Card>
<Card>
            <CardHeader>
              <CardTitle className="flex gap-2">
                <MapPin /> {t("nearbySafetyServices")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              
<Button
  variant="outline"
  className="w-full"
  onClick={() => openNearby("police station")}
>{t("policeStation")}
</Button>
<Button
  variant="outline"
  className="w-full"
  onClick={() => openNearby("hospital")}
>{t("hospital")}
</Button>
<Button
  variant="outline"
  className="w-full"
  onClick={() => openNearby("tourist help desk")}
>{t("touristHelpDesk")}
</Button>

            </CardContent>
          </Card>
          <TrustedContacts />
          <Card>
  <CardHeader>
    <CardTitle className="flex gap-2">
      <Bell /> {t("safetyAlerts")}
    </CardTitle>
  </CardHeader>
  <CardContent>{t("noActiveAlerts")}</CardContent>
</Card>
        </div>
 {restaurants.length > 0 && (
  <div className="lg:col-span-12">
  <Card>
    <CardHeader>
      <CardTitle>🍽 {t("nearbyRestaurants")}</CardTitle>
      <CardDescription>{t("basedOnYourLocation")}</CardDescription>
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
