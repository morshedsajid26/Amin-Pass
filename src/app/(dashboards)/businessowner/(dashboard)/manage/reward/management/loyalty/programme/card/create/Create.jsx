"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BsImages } from "react-icons/bs";
import QR from "@/public/QR.png";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Create() {
  const router = useRouter();

  const [stampCount, setStampCount] = useState(6);
  const [activeStamps, setActiveStamps] = useState(0);

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const [stampBgFile, setStampBgFile] = useState(null);
  const [stampBgPreview, setStampBgPreview] = useState(null);

  const [colors, setColors] = useState({
    cardBg: "#FFFFFF",
    text: "#100F10",
    active: "#1C1919",
    inactive: "#626262",
  });

  /* ================= FILE HANDLERS ================= */
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleStampBgUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setStampBgFile(file);
      setStampBgPreview(URL.createObjectURL(file));
    }
  };

  /* ================= ORDINAL ================= */
  function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  /* ================= FINAL CREATE ================= */
  const handleCreate = async () => {
    const token = Cookies.get("accessToken");
    const businessId = Cookies.get("businessId");

    if (!token || !businessId) {
      toast.error("Business authentication missing");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("cardSetup")) || {};

    const formData = new FormData();

    // ===== PREVIOUS STEPS =====
    formData.append("businessId", businessId);
    formData.append("cardType", stored.cardType);
    formData.append("cardDesc", stored.cardDesc);
    formData.append("earnRuleType", stored.earnRule);
    formData.append("companyName", stored.companyName);
    formData.append("earnedRewardMessage", stored.earnedRewardMessage);
    formData.append("barcodeType", stored.barcodeType);
    formData.append("rewardProgram", stored.rewardProgram);
    formData.append("earnValue", stored.earnValue);
    formData.append("earnUnit", stored.earnUnit);

    // ===== FINAL STEP =====
    formData.append("stampsCount", stampCount);
    formData.append("cardBackground", colors.cardBg);
    formData.append("textColor", colors.text);
    formData.append("activeStampColor", colors.active);
    formData.append("inactiveStampColor", colors.inactive);

    if (logoFile) formData.append("logo", logoFile);
    if (stampBgFile) formData.append("stampBackground", stampBgFile);

    try {
      const res = await fetch(
        `${BASE_URL}/business-owner/cards/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data?.message || "Card creation failed";
        toast.error(errorMsg);
        return;
      }

      //    clear temp storage
      localStorage.removeItem("cardSetup");

      //    success redirect
      toast.success("Card created successfully!");
      setTimeout(() => {
        router.push("/businessowner/manage/reward/management/loyalty/programme");
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-14 w-full mt-10">
        {/* LEFT SETTINGS */}
        <div className="md:w-1/2 space-y-8">
          {/* Stamp Count */}
          <div>
            <h3 className="font-inter font-semibold text-xl mb-3">
              Stamps Count
            </h3>

            <div className="flex gap-3 flex-wrap">
              {[...Array(12)].map((_, i) => {
                const num = i + 1;
                return (
                  <button
                    key={num}
                    onClick={() => setStampCount(num)}
                    className={`w-10 h-10 rounded-full border transition font-inter 
                    ${
                      stampCount === num
                        ? "bg-black dark:bg-[#373737] text-white"
                        : "bg-white border-black text-black"
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Logo */}
          <div>
            <h3 className="font-inter font-semibold text-xl mb-2 text-black dark:text-white">
              Logo
            </h3>
            <div className="border border-black dark:border-white rounded-xl px-4 py-3 flex justify-between">
              <BsImages className="w-9 h-9 text-black dark:text-white" />
              <label className="cursor-pointer bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-md">
                Select File
                <input type="file" hidden onChange={handleLogoUpload} />
              </label>
            </div>
          </div>

          {/* Stamp BG */}
          <div>
            <h3 className="font-inter font-semibold text-xl mb-2 text-black dark:text-white">
              Background under stamps
            </h3>
            <div className="border border-black dark:border-white rounded-xl px-4 py-3 flex justify-between">
              <BsImages className="w-9 h-9 text-black dark:text-white" />
              <label className="cursor-pointer bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-md">
                Select File
                <input type="file" hidden onChange={handleStampBgUpload} />
              </label>
            </div>
          </div>

          {/* Colors */}
          <div>
            <h3 className="font-inter font-semibold text-xl mb-3 text-black dark:text-white">
              Colors
            </h3>

            {[
              ["Card Background", "cardBg"],
              ["Text Color", "text"],
              ["Active Stamp", "active"],
              ["Inactive Stamp", "inactive"],
            ].map(([label, key]) => (
              <div key={key} className="mt-4">
                <label className="font-inter text-sm text-black dark:text-white">{label}</label>
                <input
                  type="color"
                  value={colors[key]}
                  onChange={(e) =>
                    setColors({ ...colors, [key]: e.target.value })
                  }
                  className="w-full h-12 rounded-lg border border-black dark:border-white mt-1"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PREVIEW (UNCHANGED) */}
        <div className="md:w-1/2 flex justify-center">
          <div className="border-4 rounded-3xl w-[280px] h-[540px] bg-white shadow-xl px-1 py-5 relative overflow-hidden">
            <div
              className="rounded-xl pb-4 overflow-y-scroll hide-scrollbar"
              style={{
                backgroundColor: colors.cardBg,
                height: "calc(540px - 70px)",
              }}
            >
              <div className="h-12 flex justify-center mb-3">
                {logoPreview ? (
                  <Image src={logoPreview} width={60} height={60} alt="Logo" />
                ) : (
                  <p className="text-sm text-gray-400">Company Logo</p>
                )}
              </div>

              {stampBgPreview && (
                <Image
                  src={stampBgPreview}
                  width={300}
                  height={80}
                  alt="Stamp BG"
                  className="rounded-lg mb-3 object-cover"
                />
              )}

              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {[...Array(stampCount)].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full"
                    style={{
                      backgroundColor:
                        i < activeStamps
                          ? colors.active
                          : colors.inactive,
                    }}
                  />
                ))}
              </div>

              <p
                className="text-center font-inter text-lg font-semibold mt-2"
                style={{ color: colors.text }}
              >
                {getOrdinal(stampCount + 1)} ☕ on us
              </p>

              <div className="mt-4 flex justify-center">
                <Image src={QR} alt="QR" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CREATE */}
      <div className="flex justify-center mt-25">
        <button
          onClick={handleCreate}
          className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl font-inter py-3 px-25 rounded-lg"
        >
          Create
        </button>
      </div>
    </div>
  );
}
