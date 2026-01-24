"use client";
import Bredcumb from "@/src/components/Bredcumb";
import Dropdown from "@/src/components/Dropdown";
import Pagination from "@/src/components/Pagination";
import Table from "@/src/components/Table";
import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import Image from "next/image";
import Avatar from "@/public/Avatar.png";
import { FiX } from "react-icons/fi";

const Support = () => {
  const [baseOnTitle, setBaseOnTitle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewOpen, setViewOpen] = useState(false);

  let ActionButton = () => {
    return (
      <div>
        <button
          onClick={() => setViewOpen(true)}
          className="bg-[#7AA3CC] font-inter font-medium py-2 px-11 rounded-full text-[#121212] cursor-pointer  hover:bg-[#7AA3CC]/80 transition-all duration-300"
        >
          View
        </button>
      </div>
    );
  };

  const TableHeads = [
    { Title: "Business Name", key: "name", width: "10%" },
    { Title: "Ticket ID", key: "id", width: "10%" },
    { Title: "Date", key: "date", width: "10%" },
    { Title: "Issue", key: "issue", width: "10%" },
    { Title: "Priority", key: "priority", width: "10%" },
    { Title: "Action", key: "action", width: "10%" },
  ];

  const TableRows = [
    {
      name: "James Carter",
      id: "#1245",
      date: "10/08/2025",
      issue: "Billing",
      priority: "High",
      action: <ActionButton />,
    },
    {
      name: "James Carter",
      id: "#1245",
      date: "10/08/2025",
      issue: "Technical",
      priority: "low",
      action: <ActionButton />,
    },
    {
      name: "James Carter",
      id: "#1245",
      date: "10/08/2025",
      issue: "Account",
      priority: "Medium",
      action: <ActionButton />,
    },
    {
      name: "James Carter",
      id: "#1245",
      date: "10/08/2025",
      issue: "Billing",
      priority: "High",
      action: <ActionButton />,
    },
    {
      name: "James Carter",
      id: "#1245",
      date: "10/08/2025",
      issue: "Billing",
      priority: "Low",
      action: <ActionButton />,
    },
  ];

  useEffect(() => {
    setBaseOnTitle(TableRows);
  }, []);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(baseOnTitle.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = baseOnTitle.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <Bredcumb />

      <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-16 ">
        <Dropdown
          placeholder="All"
          className={`md:w-[8%]  bg-[#7AA3CC] rounded-xl p-2 font-inter font-medium`}
          inputClass="text-base"
          options={["All", "One", "Two"]}
          optionClass={`text-base`}
        />

        <div className="relative  ">
          <input
            type="text"
            className="border outline-none border-[#000000] py-[14px] px-12 w-full md:w-[462px] rounded-[15px] text-[#000000] placeholder:text-[#000000] font-inter"
            placeholder="Search"
          />
          <FaSearch className=" absolute top-1/2 left-6 -translate-y-1/2 text-[#7AA3CC]" />
        </div>
      </div>

      <div className="overflow-auto">
        <Table TableHeads={TableHeads} TableRows={currentItems} />
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {viewOpen && (
        <div className="fixed inset-0  bg-[#D9D9D9]/80 flex items-center justify-center z-50 ">
          <div className="bg-[#EFEFEF] rounded-3xl  p-5 md:w-[50%]">
           
            <div className="flex justify-end">
            <FiX 
            onClick={() => setViewOpen(false)}
            className="w-7 h-7 mb-5 cursor-pointer " />
            </div>

            {/* Header */}
            <div className="flex items-center gap-3  pb-3 mb-3">
              <Image
                src={Avatar}
                alt="User"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h2 className="font-inter text-2xl font-medium text-[#000000]">
                  Jane D.
                </h2>
                <p className="text-xl text-[#000000]">example@gmail.com</p>
              </div>
            </div>

            {/* Ticket Details */}
            <div className=" font-inter text-2xl text-[#000000]">
              <div className="flex justify-between border-b border-[#000000]/10 py-4">
                <span className="font-medium">Ticket ID:</span>
                <span className="font-normal">#1252</span>
              </div>

              <div className="flex justify-between border-b border-[#000000]/10 py-4">
                <span className="font-medium">Date:</span>
                <span className="font-normal">04/05/2025</span>
              </div>

              <div className="flex justify-between border-b border-[#000000]/10 py-4">
                <span className="font-medium">Priority:</span>
                <span className="font-normal">High</span>
              </div>

              <div className="flex justify-between border-b border-[#000000]/10 py-4">
                <span className="font-medium">Issue:</span>
                <span className="font-normal">Billing</span>
              </div>

              <div className="flex justify-between py-4">
                <span className="font-medium">Description:</span>
                <span className="text-[#000000] italic">—</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
