import { useEffect, useState } from "react";
import {
  Shield,
  AlertTriangle,
  MapPin,
  Clock,
  Phone,
  Eye,
  Navigation,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface PoliceIncident {
  id: string;
  type: string | null;
  description: string | null;
  latitude: number;
  longitude: number;
  city: string | null;
  status: string;
  created_at: string;
  user_id: string;

  profiles: {
    full_name: string | null;
    email: string | null;
  } | null;
}

const PoliceDashboard = () => {
  const [incidents, setIncidents] = useState<PoliceIncident[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadIncidents();
  }, []);

  const loadIncidents = async () => {
  const { data, error } = await supabase
  .from("incidents")
  .select(`
  id,
  type,
  description,
  latitude,
  longitude,
  city,
  status,
  created_at,
  user_id,
  profiles:profiles!incidents_user_id_fkey (
    full_name,
    email
  )
`)

  .order("created_at", { ascending: false });


  if (error) {
    console.error("Failed to load incidents", error);
    return;
  }
  console.log("INCIDENT DATA 👉", data);
  setIncidents(data || []);
};


    return (
    <div className="min-h-screen bg-slate-100">

      {/* HEADER */}
      <header className="bg-gradient-to-r from-emerald-500 to-blue-500 p-4 text-white flex justify-between items-center">

  {/* LEFT SIDE */}
  <div className="flex items-center gap-3">

    <Button
  variant="ghost"
  className="flex items-center gap-2 text-white hover:bg-white/20 px-3 py-2 text-base"
  onClick={() => navigate(-1)}
>
  <ArrowLeft size={20} />
  BACK
</Button>


    <div className="flex items-center gap-2">
      <Shield />
      <h1 className="text-xl font-bold">Police Command Center</h1>
    </div>

  </div>

  {/* RIGHT SIDE */}
  <Badge className="bg-white text-black">
    {incidents.length} Active Incidents
  </Badge>

</header>


      <div className="container mx-auto px-6 py-8">

        <Card className="bg-white shadow">
          <CardHeader>
            <CardTitle className="flex gap-2 text-emerald-600">
              <AlertTriangle /> Live Emergency Alerts
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            {incidents.length === 0 && (
              <p>No incidents yet</p>
            )}

            {incidents.map((alert) => (
              <div
                key={alert.id}
                className="p-4 bg-slate-50 border-l-4 border-red-500 rounded"
              >

                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-red-600">
  🚨 {alert.type || "Emergency Alert"}
</h3>

                    <p className="text-sm font-medium text-gray-800">
  {alert.type || "SOS"}
</p>

<p className="text-sm text-gray-600">
  {alert.description || "No description provided"}
</p>


                    <p className="text-sm text-gray-600">
                      {alert.profiles?.full_name || "Unknown User"}
                    </p>

                    <p className="text-xs text-gray-500">
                      {alert.profiles?.email}
                    </p>
                  </div>

                  <Badge className="bg-red-100 text-red-600">
                    ACTIVE
                  </Badge>
                </div>

                <div className="flex gap-4 text-sm mt-2 text-gray-500">
                  <div className="flex gap-1">
                    <MapPin size={16} /> {alert.city || "Unknown"}
                  </div>
                  <div className="flex gap-1">
                    <Clock size={16} />
                    {new Date(alert.created_at).toLocaleTimeString()}
                  </div>
                </div>



                <div className="flex gap-2 mt-3">
                  <Button size="sm" className="bg-red-600 text-white">
                    <Phone size={16} className="mr-1" /> Call
                  </Button>

                  <Button
                    size="sm"
                    className="bg-emerald-600 text-white"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${alert.latitude},${alert.longitude}`,
                        "_blank"
                      )
                    }
                  >
                    <Navigation size={16} className="mr-1" /> Navigate
                  </Button>
                </div>

              </div>
            ))}

          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default PoliceDashboard;
