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
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState("All Businesses");
  const [allBranches, setAllBranches] = useState([]);

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
        const result = await res.json();
        if (res.ok && result.data) {
          setBusinesses(result.data.map(b => ({
            id: b.id,
            name: b.businessName || "Unknown Business"
          })));
        }
      } catch (error) {
        console.error("Fetch businesses error:", error);
      }
    };
    fetchBusinesses();
  }, []);

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
        if (data.success && data.data) {
          setAllBranches(data.data);
        }
      } catch (error) {
        console.error("Branch load error:", error);
      }
    };

    fetchBranches();
  }, []);

  // ===============================
  // RENDER MARKERS (WITH FILTERING)
  // ===============================
  useEffect(() => {
    if (!map || !allBranches.length) return;

    // Clear existing markers
    markers.forEach((m) => m.setMap(null));

    const filtered =
      selectedBusiness === "All Businesses"
        ? allBranches
        : allBranches.filter((b) => {
            const branchBizName = (
              b.business?.businessName ||
              b.business?.name ||
              ""
            )
              .trim()
              .toLowerCase();
            const targetName = selectedBusiness.trim().toLowerCase();
            return branchBizName === targetName;
          });

    const newMarkers = filtered.map((b) => {
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
  }, [map, allBranches, selectedBusiness, businesses]);

  // ===============================
  // SEARCH → GEOCODE ADDRESS
  // ===============================
  const handleSearch = async () => {
    const address = searchRef.current.value;

    if (!address) return;

    const token = Cookies.get("accessToken");
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
              options={["All Businesses", ...businesses.map((b) => b.name)]}
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
