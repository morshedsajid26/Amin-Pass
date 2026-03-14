"use client";

import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { Loader } from "@googlemaps/js-api-loader";
import Bredcumb from "@/src/components/Bredcumb";
import { FaSearch } from "react-icons/fa";
import { BASE_URL } from "@/src/config/api";
import Dropdown from "@/src/components/Dropdown";

export default function Location() {
  const searchRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  // Missing States
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState("All Businesses");
  const [searchCoords, setSearchCoords] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");

  // ===============================
  // LOAD GOOGLE MAPS
  // ===============================
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      console.error("  Google Maps API Key Missing.");
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
  // FETCH BUSINESSES (TENANTS)
  // ===============================
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const token = Cookies.get("accessToken");
        const res = await fetch(`${BASE_URL}/system-owner/tenants`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setBusinesses(data.data || []);
        }
      } catch (error) {
        console.error("Fetch businesses error:", error);
      }
    };
    fetchBusinesses();
  }, []);

  // ===============================
  // FETCH BRANCHES
  // ===============================
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const token = Cookies.get("accessToken");
        const res = await fetch(`${BASE_URL}/system-owner/geo/branches`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("Branches Data:", data);

        if (!data.success || !data.data) return;

        // Clear existing markers if needed
        markers.forEach(m => m.setMap(null));
        setMarkers([]);

        const newMarkers = data.data.map((b) => {
          const lat = parseFloat(b.latitude);
          const lng = parseFloat(b.longitude);

          if (isNaN(lat) || isNaN(lng)) return null;

          const marker = new google.maps.Marker({
            position: { lat, lng },
            map,
            title: b.name || b.branchName,
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `<div style="color: black; font-weight: bold;">${b.name || b.branchName || "Branch"}</div>`,
          });

          marker.addListener("click", () => {
            infoWindow.open(map, marker);
          });

          return marker;
        }).filter(m => m !== null);

        setMarkers(newMarkers);
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

    if (!address) {
      setSearchCoords(null);
      setSearchFilter("");
      return;
    }

    // Always update text filter immediately
    setSearchFilter(address);

    const token = Cookies.get("accessToken");
    try {
      const res = await fetch(`${BASE_URL}/system-owner/geo/geocode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ address }),
      });

      const data = await res.json();

      if (data.lat && data.lng) {
        const position = { lat: data.lat, lng: data.lng };
        setSearchCoords(position);

        map.setCenter(position);
        map.setZoom(13);

        // Pin the searched location
        new google.maps.Marker({
          position,
          map,
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          },
          title: "Searched Location",
        });
      } else {
        // If geocode fails, just search by text
        setSearchCoords(null);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      setSearchCoords(null);
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

      const token = Cookies.get("accessToken");
      const res = await fetch(`${BASE_URL}/system-owner/geo/reverse`, {
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

      <div className="mt-10 flex flex-col gap-6">
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row justify-center items-end md:gap-10 gap-5">
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

        {/* Business Filter Dropdown (Now below search and on the left) */}
        <div className="flex justify-start">
          <div className="w-[300px]">
            <Dropdown
              label="Filter by Business"
              placeholder="All Businesses"
              options={["All Businesses", ...businesses.map((b) => b.businessName || b.name || "Unknown")]}
              value={selectedBusiness}
              onSelect={(val) => setSelectedBusiness(val)}
              className="w-full"
              inputClass="border border-[#000000] py-[14px] px-6 rounded-[15px]"
              labelClass="mb-2 font-bold"
            />
          </div>
        </div>
      </div>

      {/* MAP */}
      <div id="map" className="w-full h-[550px] rounded-2xl mt-10"></div>
    </div>
  );
}
