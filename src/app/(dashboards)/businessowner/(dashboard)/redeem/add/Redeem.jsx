"use client";

import Bredcumb from "@/src/components/Bredcumb";
import { BASE_URL } from "@/src/config/api";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdQrCodeScanner } from "react-icons/md";
import { FiX } from "react-icons/fi";

const QR_REGION_ID = "qr-camera-region";

const Redeem = () => {
  const inputs = useRef([]);
  const html5QrcodeRef = useRef(null);
  const isStoppingRef = useRef(false);

  const [loading, setLoading] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [scanning, setScanning] = useState(false);

  /* ================================================================
     stopCameraScanner — awaited, safe to call multiple times
  ================================================================ */
  const stopCameraScanner = async () => {
    if (isStoppingRef.current) return;
    isStoppingRef.current = true;

    if (html5QrcodeRef.current) {
      try {
        const state = html5QrcodeRef.current.getState?.();
        // 2 = SCANNING, 3 = PAUSED — only stop if actually active
        if (state === 2 || state === 3) {
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
     `cancelled` flag handles React Strict Mode double-effect:
       1st run  → cancelled=false → scanner starts
       cleanup  → cancelled=true  → stop any pending instance
       2nd run  → cancelled=false → scanner starts once more (OK)
  ================================================================ */
  useEffect(() => {
    if (!cameraOpen) return;

    let cancelled = false;
    let qrInstance = null;

    // Use a timeout so the modal div is definitely in the DOM
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
            () => {} // suppress per-frame not-found noise
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
    }, 150); // 150ms — enough for React to paint the modal div

    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (qrInstance) {
        try {
          const state = qrInstance.getState?.();
          // Only stop if scanner is actively running
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

  /* ---------------------------------------------------------------- */

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

  const searchByCode = async (code) => {
    const token = Cookies.get("accessToken");
    if (!token) { toast.error("Unauthorized: access token missing"); return; }

    setLoading(true);
    setCustomerData(null);
    setSelectedBranch(null);

    try {
      const res = await fetch(
        `${BASE_URL}/business-owner/add-redeem/find-customer/${code}`,
        { method: "GET", headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      if (!res.ok || data?.success === false) {
        throw new Error(data?.message || "Customer not found");
      }
      setCustomerData(data.data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    const qrCode = getCode();
    if (qrCode.length !== 6) { alert("Please enter 6 digit code"); return; }
    await searchByCode(qrCode);
  };

  const handleNext = () => {
    if (!selectedBranch || !customerData) return;
    const payload = {
      customerId: customerData.customer.id,
      customerName: customerData.customer.name,
      customerEmail: customerData.customer.email,
      rewardHistoryId: selectedBranch.rewardHistoryId,
      branchId: selectedBranch.branchId,
      branchName: selectedBranch.branchName,
      availableRewards: selectedBranch.availableRewards,
      points: selectedBranch.rewardPoints,
      qrCode: getCode(),
      lastRewardReceived: selectedBranch.lastRewardReceived,
      activeRewards: selectedBranch.activeRewards,
    };
    localStorage.setItem("redeemData", JSON.stringify(payload));
  };

  return (
    <div>
      <Bredcumb />
      <Toaster />

      {/* ===== OTP INPUT + BUTTONS ===== */}
      <div className="mt-6 flex items-center gap-4 flex-wrap">
        <div className="flex gap-4">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              ref={(el) => (inputs.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="appearance-none md:w-[77px] w-12 h-12 md:h-[77px]
                border border-[#7AA3CC] rounded-[10px]
                text-center outline-none text-2xl
                font-bold text-[#005FA8]"
            />
          ))}
        </div>

        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-[#7AA3CC] dark:text-white text-[#010101]
            font-semibold text-xl font-inter py-3 px-10 rounded-lg
            disabled:opacity-60"
        >
          {loading ? "Searching..." : "Search"}
        </button>

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

            {/* This single div is the only element html5-qrcode mounts into */}
            <div
              id={QR_REGION_ID}
              className="w-full rounded-2xl overflow-hidden bg-black"
              style={{ minHeight: "280px" }}
            />

            {scanning && !cameraError && (
              <>
                <p className="mt-3 text-center text-sm text-gray-400 dark:text-gray-500 font-inter animate-pulse">
                  Scanning... hold steady
                </p>
              </>
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

      {/* CUSTOMER + BRANCH LIST */}
      {customerData && (
        <div className="mt-10 max-w-xl space-y-5">
          <h2 className="text-xl font-bold dark:text-white">
            Customer: {customerData.customer.name}
          </h2>

          <div className="space-y-3">
            {customerData.rewardHistories.map((item, idx) => (
              <label
                key={item.id ?? idx}
                className={`flex items-center gap-3 border p-3 rounded cursor-pointer
                  dark:text-white text-[#010101] font-inter
                  ${selectedBranch?.rewardHistoryId === item.id ? "border-[#005FA8]" : ""}`}
              >
                <input
                  type="radio"
                  name="branch"
                  onChange={() =>
                    setSelectedBranch({
                      rewardHistoryId: item.id,
                      branchId: item.branchId,
                      branchName: item.branch.name,
                      rewardPoints: item.rewardPoints,
                      availableRewards: item.availableRewards,
                      lastRewardReceived: item.lastRewardReceived,
                      activeRewards: item.activeRewards,
                    })
                  }
                />
                <span className="font-medium">
                  {item.branch.name} — Total Points: {item.rewardPoints}
                </span>
              </label>
            ))}
          </div>

          <Link href="/businessowner/redeem/add/redeem">
            <button
              onClick={handleNext}
              disabled={!selectedBranch}
              className="bg-[#7AA3CC] dark:text-white text-[#010101]
                font-semibold text-xl font-inter py-3 px-10 rounded-lg
                disabled:opacity-50"
            >
              Next
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Redeem;
