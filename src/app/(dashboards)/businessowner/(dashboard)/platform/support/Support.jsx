"use client";
import Bredcumb from "@/src/components/Bredcumb";
import Dropdown from "@/src/components/Dropdown";
import Pagination from "@/src/components/Pagination";
import Table from "@/src/components/Table";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import Avatar from "@/public/Avatar.png";
import { FiX } from "react-icons/fi";
import Link from "next/link";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";

const Support = () => {
  const [supports, setSupports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  /* ================= FETCH SUPPORT TICKETS ================= */
  useEffect(() => {
    const fetchSupports = async () => {
      try {
        const token = Cookies.get("accessToken");

        const res = await fetch(
          `${BASE_URL}/business-owner/support/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const json = await res.json();

        if (res.ok) {
          const formatted = json.data.map((item) => ({
            name: item.branchName || "—",
            id: item.ticketId,
            date: item.date?.slice(0, 10),
            issue: item.issue,
            priority: item.priority,
            raw: item,
          }));

          setSupports(formatted);
        }
      } catch (err) {
        console.error("Support fetch error:", err);
      }
    };

    fetchSupports();
  }, []);

  /* ================= ACTION BUTTON ================= */
  const ActionButton = ({ data }) => (
    <button
      onClick={() => {
        setSelectedTicket(data);
        setViewOpen(true);
      }}
      className="bg-[#7AA3CC] font-inter font-medium py-2 px-11 rounded-full text-[#121212] cursor-pointer hover:bg-[#7AA3CC]/80 transition-all duration-300"
    >
      View
    </button>
  );

  /* ================= TABLE CONFIG ================= */
  const TableHeads = [
    { Title: "Business Name", key: "name", width: "10%" },
    { Title: "Ticket ID", key: "id", width: "10%" },
    { Title: "Date", key: "date", width: "10%" },
    { Title: "Issue", key: "issue", width: "10%" },
    { Title: "Priority", key: "priority", width: "10%" },
    { Title: "Action", key: "action", width: "10%" },
  ];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(supports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentItems = supports
    .slice(startIndex, startIndex + itemsPerPage)
    .map((row) => ({
      ...row,
      action: <ActionButton data={row.raw} />,
    }));

  return (
    <div>
      <Bredcumb />

      {/* ================= FILTER BAR ================= */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-16">
        <Dropdown
          placeholder="All"
          className="md:w-[8%] bg-[#7AA3CC] rounded-xl p-2 font-inter font-medium"
          options={["All", "HIGH", "MEDIUM", "NORMAL"]}
        />

        <div className="flex items-center justify-between w-full">
          <div className="relative">
            <input
              type="text"
              className="border outline-none border-[#000000] py-3 px-12 md:w-[462px] rounded-[15px] font-inter"
              placeholder="Search"
            />
            <FaSearch className="absolute top-1/2 left-6 -translate-y-1/2 text-[#7AA3CC]" />
          </div>

          <Link href="/businessowner/platform/support/create/support">
            <button className="bg-[#7AA3CC] font-inter font-medium py-3 px-2 md:px-11 rounded-lg text-[#121212]">
              Create Support
            </button>
          </Link>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-auto">
        <Table TableHeads={TableHeads} TableRows={currentItems} />
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* ================= VIEW MODAL ================= */}
      {viewOpen && selectedTicket && (
        <div className="fixed inset-0 bg-[#D9D9D9]/80 flex items-center justify-center z-50">
          <div className="bg-[#EFEFEF] rounded-3xl p-5 w-[90%] md:w-[50%]">
            <div className="flex justify-end">
              <FiX
                onClick={() => setViewOpen(false)}
                className="w-7 h-7 mb-5 cursor-pointer"
              />
            </div>

            {/* Header */}
            <div className="flex items-center gap-3 pb-3 mb-3">
              <Image
                src={Avatar}
                alt="User"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h2 className="font-inter text-2xl font-medium">
                  {selectedTicket.branchName || "—"}
                </h2>
                <p className="text-xl">{selectedTicket.ticketId}</p>
              </div>
            </div>

            {/* Details */}
            <div className="font-inter text-2xl">
              <div className="flex justify-between border-b py-4">
                <span className="font-medium">Date:</span>
                <span>{selectedTicket.date?.slice(0, 10)}</span>
              </div>

              <div className="flex justify-between border-b py-4">
                <span className="font-medium">Priority:</span>
                <span>{selectedTicket.priority}</span>
              </div>

              <div className="flex justify-between border-b py-4">
                <span className="font-medium">Issue:</span>
                <span>{selectedTicket.issue}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
