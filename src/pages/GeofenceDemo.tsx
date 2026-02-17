import GeoLocationMap from "../components/GeoLocationMap";


export default function GeofenceDemo() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-3">
        🌍 DAYS Shield — Live Geolocation Demo
      </h1>
      <GeoLocationMap />
    </div>
  );
}
