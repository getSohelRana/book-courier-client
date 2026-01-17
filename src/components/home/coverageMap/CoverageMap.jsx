import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Loading from "../../shared/loading/Loading";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapRef = useRef(null)

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

  // search location

  const handleLocationSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.trim();
    // console.log(location)

    const district = cities.find( c => c.district.toLowerCase().includes(location.toLowerCase()));
    if(district){
      const flyMap = [district.latitude, district.longitude];
      // console.log(flyMap)
      mapRef.current.flyTo(flyMap, 13)
    }

  }

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="py-15">
      <div>
        <h1 className="heading_title">Delivery Coverage</h1>
        <p className="heading_subtitle">
          We currently deliver books to the following cities across Bangladesh.
        </p>
      </div>
      {/* search location */}
      <form onSubmit={handleLocationSearch} className="flex gap-1 sm:gap-2 mt-10 justify-center items-center">
        <label className="input mr-2 w-70 sm:w-80 md:w-120">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" name="location" required placeholder="Search your delivery location"  />
        </label>
        <button className="btn btn-secondary">Seacrch</button>
      </form>

      {/* ===== Loading ===== */}
      {loading && <Loading></Loading>}

      <div className="w-full h-full mt-15">
        <MapContainer
          className="h-175"
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          ref = {mapRef}
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
