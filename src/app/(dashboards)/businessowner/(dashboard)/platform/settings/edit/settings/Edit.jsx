"use client";
import InputField from "@/src/components/InputField";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Avatar from "@/public/Avatar.png";
import QR from "@/public/QR.png";
import { FiEdit } from "react-icons/fi";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";
import { useRouter } from "next/navigation";

const Edit = () => {
  const router = useRouter();

  /* ================= REFS ================= */
  const logoRef = useRef(null);

  /* ================= STATE ================= */
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(Avatar);

  const [form, setForm] = useState({
    name: "",
    ownerAddress: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= FETCH CURRENT PROFILE ================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("accessToken");
        if (!token) return;

        const res = await fetch(`${BASE_URL}/business-owner/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
        if (!res.ok) throw new Error(json.message);

        const data = json.data;

        setForm({
          name: data.name || "",
          ownerAddress: data.owner?.address || "",
          ownerName: data.owner?.name || "",
          ownerEmail: data.owner?.email || "",
          ownerPhone: data.owner?.phone || "",
        });

        if (data.businessLogoUrl) {
          setLogoPreview(data.businessLogoUrl);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= HANDLE LOGO ================= */
  const handleLogoSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  /* ================= UPDATE PROFILE ================= */
  const handleSave = async () => {
    try {
      setLoading(true);
      setError("");

      const token = Cookies.get("accessToken");
      if (!token) return;

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("address", form.ownerAddress);
      formData.append("ownerName", form.ownerName);
      formData.append("ownerEmail", form.ownerEmail);
      formData.append("ownerPhone", form.ownerPhone);

      if (logoFile) {
        formData.append("businessLogo", logoFile);
      }

      const res = await fetch(
        `${BASE_URL}/business-owner/profile/update`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      router.push("/businessowner/platform/settings");
    } catch (err) {
      setError(err.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div>
      {/* ===== LOGO ===== */}
      <div className="mt-10 w-[120px] relative">
        <p className="font-inter text-xl mb-2 dark:text-white">
          Cafe Logo
        </p>

        <Image
          src={logoPreview}
          alt="cafe logo"
          width={120}
          height={120}
          className="rounded-lg"
        />

        <button
          onClick={() => logoRef.current.click()}
          className="w-11 h-11 bg-[#7AA3CC] flex items-center justify-center 
                     rounded-lg absolute right-0 bottom-0 cursor-pointer"
        >
          <FiEdit className="w-8 h-8" />
        </button>

        <input
          type="file"
          ref={logoRef}
          className="hidden"
          accept="image/*"
          onChange={handleLogoSelect}
        />
      </div>

      {/* ===== FORM ===== */}
      <div className="grid grid-cols-12 gap-y-10 md:gap-x-20 mt-7">
        <InputField
          label="Shop Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="col-span-12 md:col-span-6"
        />

        <InputField
          label="Address"
          name="address"
          value={form.ownerAddress}
          onChange={handleChange}
          className="col-span-12 md:col-span-6"
        />

        <InputField
          label="Owner Name"
          name="ownerName"
          value={form.ownerName}
          onChange={handleChange}
          className="col-span-12 md:col-span-6"
        />

        <InputField
          label="Owner Gmail"
          name="ownerEmail"
          value={form.ownerEmail}
          onChange={handleChange}
          className="col-span-12 md:col-span-6"
        />

        <InputField
          label="Owner Number"
          name="ownerPhone"
          value={form.ownerPhone}
          onChange={handleChange}
          className="col-span-12 md:col-span-6"
        />
      </div>

      {error && (
        <p className="text-red-500 font-inter mt-6 text-center">
          {error}
        </p>
      )}

      <div className="flex justify-center">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-[#7AA3CC] text-[#000000] font-bold font-inter 
                     py-3 px-15 mt-20 rounded-lg disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default Edit;
