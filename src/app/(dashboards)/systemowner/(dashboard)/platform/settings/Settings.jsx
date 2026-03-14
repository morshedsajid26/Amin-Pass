"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '@/src/config/api'
import Cookies from 'js-cookie'
import { toast } from 'react-hot-toast'

const Settings = () => {
  const [geoSetting, setGeoSetting] = useState({
    isEnabled: false,
    radiusMeters: 0
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchGeoSettings = async () => {
    try {
      const token = Cookies.get("accessToken");
      const res = await axios.get(`${BASE_URL}/system-owner/geo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setGeoSetting({
          isEnabled: res.data.data.isEnabled,
          radiusMeters: res.data.data.radiusMeters
        });
      }
    } catch (error) {
      console.error("Failed to fetch geo settings", error);
      toast.error("Failed to fetch geo settings");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const token = Cookies.get("accessToken");
      const res = await axios.patch(`${BASE_URL}/system-owner/geo`, {
        radiusMeters: Number(geoSetting.radiusMeters),
        isEnabled: geoSetting.isEnabled
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        toast.success("Geo settings updated successfully");
      }
    } catch (error) {
      console.error("Failed to update geo settings", error);
      toast.error("Failed to update geo settings");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchGeoSettings();
  }, []);

  if (loading) {
    return <div className="mt-10 text-2xl">Loading...</div>;
  }

  return (
    <div className="mt-10 max-w-2xl">
      <form onSubmit={handleUpdate} className="space-y-8">
        <div className="flex items-center justify-between border-b border-black/10 py-6">
          <div>
            <h3 className="text-2xl font-medium text-[#000000]">Geo Fencing Status</h3>
            <p className="text-lg text-gray-500">Enable or disable geo-fencing for the platform.</p>
          </div>
          <input
            type="checkbox"
            checked={geoSetting.isEnabled}
            onChange={(e) => setGeoSetting({ ...geoSetting, isEnabled: e.target.checked })}
            className="toggle toggle-white !bg-[#020202] checked:!bg-[#7F56D9] checked:!border-[#7F56D9]"
          />
        </div>

        <div className="flex flex-col gap-4 border-b border-black/10 py-6">
          <div>
            <h3 className="text-2xl font-medium text-[#000000]">Radius (Meters)</h3>
            <p className="text-lg text-gray-500">Set the allowed radius for geo-fencing in meters.</p>
          </div>
          <input
            type="number"
            value={geoSetting.radiusMeters}
            onChange={(e) => setGeoSetting({ ...geoSetting, radiusMeters: e.target.value })}
            className="border py-3.5 px-6 w-full md:w-[300px] rounded-[15px] text-xl"
            placeholder="Enter radius"
          />
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={updating}
            className={`py-4 px-10 bg-[#7AA3CC] hover: text-black rounded-xl text-xl font-medium transition-colors ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {updating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Settings
