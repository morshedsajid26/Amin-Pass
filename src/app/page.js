"use client";
import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

import Navbar from "../components/Navbar";
import Banner from "./(landing page)/Banner";
import FeaturedItem from "./(landing page)/FeaturedItem";
import ProductShow from "./(landing page)/ProductShow";
import Works from "./(landing page)/Works";
import ReaLImpact from "./(landing page)/ReaLImpact";
import RealConnection from "./(landing page)/RealConnection";
import Footer from "../components/Footer";
import FAQ from "./(landing page)/FAQ";
import Surprise from "./(landing page)/Surprise";
import Plan from "./(landing page)/Plan";
import Testimonial from "./(landing page)/Testimonial";

const Page = () => {
  const [cookieOpen, setCookieOpen] = useState(false);

useEffect(() => {
  const accepted = localStorage.getItem("cookieAccepted");
  if (!accepted) {
    setCookieOpen(true);
  }
}, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookieAccepted", "true");
    setCookieOpen(false);
  };

  return (
    <div className="relative">
      {/* ✅ Cookie Popup */}
      {cookieOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gradient-to-t from-[#F4F1EC] to-[#B3CBDB] w-[90%] sm:w-[37%] rounded-[15px] pt-[70px] px-8 sm:px-12 shadow-2xl animate-fadeIn overflow-y-auto hide-scrollbar">
            <div className="flex justify-between items-center pb-6">
              <p className="font-inter font-semibold text-2xl text-gray-800">
                Manage Your Cookie Preferences
              </p>
              <div
                className="bg-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition"
                onClick={() => setCookieOpen(false)}
              >
                <FiX className="w-5 h-5 text-gray-700" />
              </div>
            </div>

            <div className="flex justify-center gap-8 py-10 border-t border-[#C2C2C2]">
              <div className="text-center">
                <p className="font-inter font-medium text-xl text-gray-700 leading-relaxed">
                  We use cookies to improve your experience. Please see our
                  Privacy Policy for more details.
                </p>
                <div className="mt-10 flex justify-end">
                  <button
                    onClick={handleAcceptAll}
                    className="font-inter bg-[#7AA3CC] hover:bg-[#6C96C0] text-[#121212] py-4 px-10 rounded-3xl font-bold transition"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Landing Page */}
      <div className="bg-[#AAC5D8] md:bg-gradient-to-t from-[#F4F1EC] to-[#B3CBDB] pt-5 h-screen overflow-y-auto hide-scrollbar">
        <Navbar />
        <Banner />
        <FeaturedItem />
        <ProductShow />
        <Works />
        <Plan />
        <ReaLImpact />
        <RealConnection />
        <Testimonial/>
        <FAQ />
        <Surprise />
        <Footer />
      </div>
    </div>
  );
};

export default Page;
