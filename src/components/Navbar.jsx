"use client";
import React, { useState } from "react";
import Container from "./Container";
import Link from "next/link";
import Dropdown from "./Dropdown";
import { FiX, FiMenu } from "react-icons/fi";

const navitems = [
  { name: "Home" },
  { name: "Featured" },
  { name: "Offer" },
  { name: "About us" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Container>
        <div className="md:bg-[#AAC6D9] py-6 rounded-2xl shadow md:border md:border-black/20 flex items-center justify-between px-6">

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-3xl cursor-pointer "
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center justify-end gap-8 w-[65%]">
            {navitems.map((item, index) => (
              <Link
                href="/"
                key={index}
                className="py-2 px-2 font-inter text-2xl font-medium gap-4 cursor-pointer rounded-lg transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}

            <Dropdown
              className="w-[10%] font-inter text-2xl"
              options={["EN", "NL", "FR", "BN"]}
              placeholder="EN"
            />
          </ul>

          <Link href="/businessowner/signin">
            <button className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl px-4 font-inter py-3 rounded-2xl cursor-pointer hidden md:block">
              Login for business
            </button>
          </Link>
        </div>

        {/* Mobile Slide Menu */}
        <div
          className={`md:hidden bg-[#AAC6D9] rounded-2xl  transition-all duration-300 overflow-hidden ${
            open ? "max-h-[15%] py-8 mt-2 border border-black/20" : "max-h-0 "
          }`}
        >
          <ul className="flex flex-col items-start gap-4 px-6">
            {navitems.map((item, index) => (
              <Link
                href="/"
                key={index}
                className="py-2 px-2 font-inter text-xl font-medium w-full rounded-lg"
              >
                {item.name}
              </Link>
            ))}

            <Dropdown
              className="w-[40%] font-inter text-xl"
              options={["EN", "NL", "FR", "BN"]}
              placeholder="EN"
            />

            <Link href="/businessowner/signin" className="mt-10  w-full">
              <button className="bg-[#7AA3CC] w-full text-[#010101] font-semibold text-lg px-4 py-3 rounded-xl mt-3">
                Login for business
              </button>
            </Link>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
