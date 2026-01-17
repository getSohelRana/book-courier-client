import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Loading from "../../shared/loading/Loading";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/cities.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load cities");
        return res.json();
      })
      .then((data) => setCities(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="py-15">
      <div>
        <h1 className="heading_title">Delivery Coverage</h1>
        <p className="heading_subtitle">
          We currently deliver books to the following cities across Bangladesh.
        </p>
      </div>

      {/* ===== Loading ===== */}
      {loading && (
        <Loading></Loading>
      )}

      <div className="w-full h-full mt-15">
        <MapContainer
          className="h-175"
          center={position}
          zoom={7}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {cities.map((city, i) => (
            <Marker key={i} position={[city.latitude, city.longitude]}>
              <Popup>
                In this {city.district}, We are coverage {city.covered_area}{" "}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
