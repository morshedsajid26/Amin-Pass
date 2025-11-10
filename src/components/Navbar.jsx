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

          <Link href='/signup'>
          
          <button className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl px-4 font-inter py-3 rounded-2xl cursor-pointer ">
            Login for business
          </button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
