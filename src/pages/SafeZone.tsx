// src/pages/SafeZone.tsx
import GeoLocationMap from "../components/GeoLocationMap";

export default function SafeZone() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Check Your Safe Zone</h1>
      <p className="text-sm text-slate-600 mb-4">
        Tap “Locate me” to see your position and whether you’re inside the defined safe area.
      </p>
      <GeoLocationMap />
    </div>
  );
}
