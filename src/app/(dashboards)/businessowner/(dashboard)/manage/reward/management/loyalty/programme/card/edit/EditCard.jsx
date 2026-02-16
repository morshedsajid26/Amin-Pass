"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BsImages } from "react-icons/bs";
import QR from "@/public/QR.png";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditCard({ id }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

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

  const [cardData, setCardData] = useState({});

  /* ================= FETCH CARD DATA ================= */
  useEffect(() => {
    const fetchCardDetails = async () => {
      if (!id) return;
      const accessToken = Cookies.get("accessToken");
      try {
        const res = await fetch(`${BASE_URL}/business-owner/cards/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const json = await res.json();

        if (res.ok && json.data) {
          const card = json.data;
          setCardData(card);
          setStampCount(card.stampsCount || 6);
          setColors({
            cardBg: card.cardBackground || "#FFFFFF",
            text: card.textColor || "#100F10",
            active: card.activeStamp || card.activeStampColor || "#1C1919",
            inactive: card.inactiveStamp || card.inactiveStampColor || "#626262",
          });
          if (card.logo) setLogoPreview(card.logo);
          if (card.stampBackground) setStampBgPreview(card.stampBackground);
          // Assuming stored setup data isn't needed for edit if we just update visual/stamp properties
          // If other properties (cardType, etc) are editable, we would need input fields for them.
          // Based on Create.jsx, some data comes from localStorage 'cardSetup'. 
          // For edit, we likely only edit what's on this screen + maybe some hidden fields if API requires them.
        } else {
          toast.error("Failed to fetch card details");
        }
      } catch (error) {
        console.error("Error fetching card:", error);
        toast.error("Something went wrong while fetching card");
      } finally {
        setFetching(false);
      }
    };

    fetchCardDetails();
  }, [id]);

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

  /* ================= FINAL UPDATE ================= */
  const handleUpdate = async () => {
    const token = Cookies.get("accessToken");
    const businessId = Cookies.get("businessId");

    if (!token || !businessId) {
      toast.error("Business authentication missing");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    // Preserve existing data if not editable here, but API might need them or just partial update
    formData.append("businessId", businessId);
    
    // We append these only if they are present in cardData (fetched)
    if (cardData.cardType) formData.append("cardType", cardData.cardType);
    if (cardData.cardDesc) formData.append("cardDesc", cardData.cardDesc);
    if (cardData.earnRuleType) formData.append("earnRuleType", cardData.earnRuleType);
    if (cardData.companyName) formData.append("companyName", cardData.companyName);
    if (cardData.earnedRewardMessage) formData.append("earnedRewardMessage", cardData.earnedRewardMessage);
    if (cardData.barcodeType) formData.append("barcodeType", cardData.barcodeType);
    if (cardData.rewardProgram) formData.append("rewardProgram", cardData.rewardProgram);
    if (cardData.earnValue) formData.append("earnValue", cardData.earnValue);
    if (cardData.earnUnit) formData.append("earnUnit", cardData.earnUnit);

    // Editable fields
    formData.append("stampsCount", stampCount);
    formData.append("cardBackground", colors.cardBg);
    formData.append("textColor", colors.text);
    formData.append("activeStamp", colors.active);
    formData.append("inactiveStamp", colors.inactive);

    if (logoFile) formData.append("logo", logoFile);
    if (stampBgFile) formData.append("stampBackground", stampBgFile);

    // Debug logging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const res = await fetch(
        `${BASE_URL}/business-owner/cards/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Update failed:", data);
        const errorMsg = data?.message || "Card update failed";
        toast.error(errorMsg);
        return;
      }

      toast.success("Card updated successfully!");
      router.push("/businessowner/manage/reward/management/loyalty/programme");
      
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div>
     
      <div className="flex flex-col md:flex-row gap-14 w-full mt-5">
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

        {/* RIGHT PREVIEW */}
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
                  <Image src={logoPreview} width={60} height={60} alt="Logo" className="object-contain" />
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
                  className="rounded-lg mb-3 object-cover h-[80px] w-full"
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

      {/* UPDATE */}
      <div className="flex justify-center mt-25">
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl font-inter py-3 px-25 rounded-lg disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Card"}
        </button>
      </div>
    </div>
  );
}
