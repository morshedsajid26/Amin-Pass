"use client";
import React, { useState } from "react";
import Container from "./Container";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Dropdown from "./Dropdown";
import { FiX } from "react-icons/fi";

const navitems = [
  { name: "Home" },
  { name: "Featured" },
  { name: "Offer" },
  { name: "About us" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [cookieOpen, setCookieOpen] = useState(false);
  return (
    <div>
      <Container>
        <div className="bg-[#AAC6D9] py-6 rounded-2xl shadow border border-black/20 flex items-center ju justify-between px-6">
          <ul className="flex items-center justify-end gap-8 w-[65%]  ">
            {navitems.map((item, index) => {
              return (
                <Link
                  href="/"
                  key={index}
                  className={`py-2 px-2 font-inter text-2xl font-medium  gap-4 cursor-pointer rounded-lg transition-all duration-200`}
                >
                  {item.name}
                </Link>
              );
            })}

            <Dropdown
              className="w-[10%] font-inter text-2xl  "
              options={["EN", "NL", "FR", "BN"]}
              placeholder="EN"
            />
          </ul>

          <button
            onClick={() => setCookieOpen(true)}
            className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl px-4 font-inter py-3 rounded-2xl cursor-pointer "
          >
            Login for business
          </button>
        </div>
      </Container>
      {cookieOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 ">
          <div className="bg-linear-to-t from-[#F4F1EC] to-[#B3CBDB]  w-[37%] rounded-[15px] pt-[70px] px-12  ">
            <div className="flex justify-between items-center pb-6">
              <p className="font-inter font-semibold text-2xl">Manage Your Cookie preferences</p>

              <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
              <FiX 
              onClick={() => setCookieOpen(false)}
              className="w-5 h-5"/>

              </div>
            </div>

            <div className="flex justify-center gap-8 py-10 border-t border-[#C2C2C2]">
              <div className="">
                <p className="font-inter font-medium text-[32px]">
                  We use cookies. Please see our Privacy Policy for more details
                </p>
                <div className="mt-10 flex justify-end">
                  <Link href='/'>
                  <button
                    
                    className="font-inter  bg-[#7AA3CC] cursor-pointer text-[#121212] py-6 px-19  rounded-3xl font-bold"
                  >
                    Accept All
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
