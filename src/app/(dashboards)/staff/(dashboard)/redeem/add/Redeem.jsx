"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { MdQrCodeScanner } from "react-icons/md";
import { FiX } from "react-icons/fi";

import Bredcumb from "@/src/components/Bredcumb";
import { BASE_URL } from "@/src/config/api";

const QR_REGION_ID = "staff-qr-camera-region";

const Redeem = () => {
  const inputs = useRef([]);
  const router = useRouter();
  const html5QrcodeRef = useRef(null);
  const isStoppingRef = useRef(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ----------- Camera state ----------- */
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [scanning, setScanning] = useState(false);

  /* ================================================================
     stopCameraScanner — state-checked, safe to call multiple times
  ================================================================ */
  const stopCameraScanner = async () => {
    if (isStoppingRef.current) return;
    isStoppingRef.current = true;

    if (html5QrcodeRef.current) {
      try {
        const state = html5QrcodeRef.current.getState?.();
        if (state === 2 || state === 3) {          // 2=SCANNING, 3=PAUSED
          await html5QrcodeRef.current.stop();
        }
      } catch (_) {}
      try { html5QrcodeRef.current.clear(); } catch (_) {}
      html5QrcodeRef.current = null;
    }

    setCameraOpen(false);
    setScanning(false);
    setCameraError("");
    isStoppingRef.current = false;
  };

  /* ================================================================
     Start scanner when cameraOpen = true
     cancelled flag handles React Strict Mode double-effect
  ================================================================ */
  useEffect(() => {
    if (!cameraOpen) return;

    let cancelled = false;
    let qrInstance = null;

    const timer = setTimeout(() => {
      if (cancelled) return;

      import("html5-qrcode")
        .then(({ Html5Qrcode }) => {
          if (cancelled) return;

          qrInstance = new Html5Qrcode(QR_REGION_ID);
          html5QrcodeRef.current = qrInstance;

          setScanning(true);
          setCameraError("");

          return qrInstance.start(
            { facingMode: "environment" },
            { fps: 15, qrbox: { width: 220, height: 220 } },
            (decodedText) => {
              if (cancelled) return;
              const match = decodedText.match(/\d{6}/);
              if (match) {
                const code = match[0];
                stopCameraScanner().then(() => {
                  fillBoxes(code);
                  searchByCode(code);
                });
              }
            },
            () => {}
          );
        })
        .catch((err) => {
          if (cancelled) return;
          console.error("Camera error:", err);
          setCameraError(
            "Camera access denied. Please allow camera permission and try again."
          );
          setScanning(false);
        });
    }, 150);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (qrInstance) {
        try {
          const state = qrInstance.getState?.();
          if (state === 2 || state === 3) {
            qrInstance.stop().catch(() => {});
          }
        } catch (_) {}
        try { qrInstance.clear(); } catch (_) {}
        if (html5QrcodeRef.current === qrInstance) {
          html5QrcodeRef.current = null;
        }
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraOpen]);

  /* ================= OTP BOX HELPERS ================= */

  const fillBoxes = (code) => {
    const digits = code.slice(0, 6).split("");
    inputs.current.forEach((input, i) => {
      if (input) input.value = digits[i] || "";
    });
  };

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = value;
    if (value && index < inputs.current.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const getCode = () =>
    inputs.current.map((input) => input?.value || "").join("");

  /* ================= SEARCH API ================= */

  const searchByCode = async (code) => {
    if (code.length !== 6) {
      setError("Please enter 6 digit code");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = Cookies.get("token");
      const branchId = localStorage.getItem("branchId");

      if (!token || !branchId) throw new Error("Unauthorized");

      const res = await fetch(`${BASE_URL}/staff/redeem/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code, branchId }),
      });

      const result = await res.json();
      console.log("REDEEM SEARCH RESPONSE:", result);

      if (
        !res.ok ||
        !result?.success ||
        !result?.data?.customer ||
        !result?.data?.reward
      ) {
        throw new Error(result?.message || "Invalid redeem response");
      }

      localStorage.setItem(
        "redeemData",
        JSON.stringify({
          customer: result.data.customer,
          reward: result.data.reward,
        })
      );

      router.push("/staff/redeem/add/redeem");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => searchByCode(getCode());

  /* ================= UI ================= */

  return (
    <div>
      <Bredcumb />

      {/* OTP boxes + buttons */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mt-4 flex-wrap">
        <div className="flex gap-4">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              inputMode="numeric"
              ref={(el) => (inputs.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="md:w-[77px] w-15 md:h-[77px] h-15
                border border-[#7AA3CC] rounded-[10px]
                text-center outline-none text-2xl
                font-inter font-bold text-[#005FA8]"
            />
          ))}
        </div>

        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-[#7AA3CC] text-[#010101]
            font-semibold text-xl font-inter py-3 px-10
            rounded-lg disabled:opacity-60"
        >
          {loading ? "Searching..." : "Search"}
        </button>

        {/* Camera QR Scan button */}
        <button
          onClick={() => {
            isStoppingRef.current = false;
            setCameraOpen(true);
          }}
          className="flex items-center gap-2 border border-[#7AA3CC]
            text-[#005FA8] dark:text-[#7AA3CC]
            font-semibold text-xl font-inter py-3 px-6 rounded-lg
            hover:bg-[#7AA3CC]/10 transition-colors"
        >
          <MdQrCodeScanner className="w-6 h-6" />
          Scan QR
        </button>
      </div>

      {error && (
        <p className="text-red-500 mt-6 font-inter">{error}</p>
      )}

      {/* ===== CAMERA MODAL ===== */}
      {cameraOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 w-[90vw] max-w-sm shadow-2xl relative">

            <button
              onClick={stopCameraScanner}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400
                hover:text-red-500 transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>

            <h3 className="font-inter font-semibold text-xl text-center mb-1 dark:text-white">
              Scan Customer QR
            </h3>
            <p className="font-inter text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
              Point the camera at the customer&apos;s QR code
            </p>

            {/* html5-qrcode mounts here */}
            <div
              id={QR_REGION_ID}
              className="w-full rounded-2xl overflow-hidden bg-black"
              style={{ minHeight: "280px" }}
            />

            {scanning && !cameraError && (
              <p className="mt-3 text-center text-sm text-gray-400 dark:text-gray-500 font-inter animate-pulse">
                Scanning... hold steady
              </p>
            )}

            {cameraError && (
              <p className="mt-3 text-center text-sm text-red-500 font-inter">
                {cameraError}
              </p>
            )}

            <button
              onClick={stopCameraScanner}
              className="mt-4 w-full border border-red-400 text-red-500
                font-semibold font-inter py-2.5 rounded-xl text-sm
                hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Redeem;
