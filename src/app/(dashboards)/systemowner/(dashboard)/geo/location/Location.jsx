"use client";

import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { Loader } from "@googlemaps/js-api-loader";
import Bredcumb from "@/src/components/Bredcumb";
import { FaSearch } from "react-icons/fa";

export default function Location() {
  const searchRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const token = Cookies.get("token");

  // ===============================
  // LOAD GOOGLE MAPS
  // ===============================
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      console.error("❌ Google Maps API Key Missing.");
      return;
    }

    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
      const mapInstance = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 23.8103, lng: 90.4125 }, // Dhaka
        zoom: 12,
      });

      setMap(mapInstance);
    });
  }, []);

  // ===============================
  // FETCH BRANCH MARKERS
  // ===============================
  useEffect(() => {
    if (!map) return;

    const fetchBranches = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/admin/geolocation/branches", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("Branches:", data);

        if (!data.branches) return;

        // Add markers on map
        data.branches.forEach((b) => {
          const marker = new google.maps.Marker({
            position: { lat: parseFloat(b.latitude), lng: parseFloat(b.longitude) },
            map,
            title: b.name,
          });

          setMarkers((prev) => [...prev, marker]);
        });
      } catch (error) {
        console.error("Branch load error:", error);
      }
    };

    fetchBranches();
  }, [map]);

  // ===============================
  // SEARCH → GEOCODE ADDRESS
  // ===============================
  const handleSearch = async () => {
    const address = searchRef.current.value;

    if (!address) return;

    const res = await fetch("http://127.0.0.1:8000/api/admin/geolocation/geocode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ address }),
    });

    const data = await res.json();
    console.log("Geocode result:", data);

    if (data.lat && data.lng) {
      const position = { lat: data.lat, lng: data.lng };

      map.setCenter(position);
      map.setZoom(16);

      new google.maps.Marker({
        position,
        map,
      });
    }
  };

  // ===============================
  // MAP CLICK → REVERSE GEOCODE
  // ===============================
  useEffect(() => {
    if (!map) return;

    map.addListener("click", async (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      console.log("Clicked:", lat, lng);

      const res = await fetch("http://127.0.0.1:8000/api/admin/geolocation/reverse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ lat, lng }),
      });

      const data = await res.json();
      console.log("Reverse Geocode:", data);
    });
  }, [map]);

  // ===============================
  // RENDER UI
  // ===============================
  return (
    <div>
      <Bredcumb />

      {/* Search Bar */}
      <div className="flex justify-center gap-10 mt-10">
        <div className="relative">
          <input
            ref={searchRef}
            type="text"
            className="border outline-none border-[#000000] py-[14px] px-12 w-[462px] rounded-[15px]"
            placeholder="Search location"
          />
          <FaSearch className="absolute top-1/2 left-6 -translate-y-1/2 text-[#7AA3CC]" />
        </div>

        <button
          onClick={handleSearch}
          className="bg-[#7AA3CC] font-bold font-inter px-10 py-3 rounded-2xl text-[#000000]"
        >
          Search
        </button>
      </div>

      {/* MAP */}
      <div id="map" className="w-full h-[550px] rounded-2xl mt-10"></div>
    </div>
  );
}
