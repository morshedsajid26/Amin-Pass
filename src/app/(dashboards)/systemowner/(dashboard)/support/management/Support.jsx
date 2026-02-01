"use client";
import Bredcumb from "@/src/components/Bredcumb";
import Dropdown from "@/src/components/Dropdown";
import Pagination from "@/src/components/Pagination";
import Table from "@/src/components/Table";
import React, { useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import Avatar from "@/public/Avatar.png";
import { FiX } from "react-icons/fi";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";

const Support = () => {
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [viewOpen, setViewOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  /* ================= TABLE HEADS ================= */
  const TableHeads = [
    { Title: "Business Name", key: "name", width: "15%" },
    { Title: "Ticket ID", key: "id", width: "15%" },
    { Title: "Date", key: "date", width: "15%" },
    { Title: "Issue", key: "issue", width: "15%" },
    { Title: "Priority", key: "priority", width: "10%" },
    { Title: "Action", key: "action", width: "15%" },
  ];

  /* ================= FETCH SUPPORT TICKETS ================= */
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = Cookies.get("accessToken");
        if (!token) return;

        const res = await fetch(
          `${BASE_URL}/system-owner/support?page=${currentPage}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const json = await res.json();
        if (!res.ok) throw new Error(json.message);

        const formatted = json.data.tickets.map((item) => ({
          id: item.ticketId,
          name: item.businessName || "—",
          date: item.createdAt?.slice(0, 10),
          issue: item.issue,
          priority: item.priority,
          description: item.description,
          raw: item,
        }));

        setTickets(formatted);
        setTotalPages(json.data.meta.totalPages || 1);
      } catch (err) {
        console.error("Support fetch error:", err);
      }
    };

    fetchTickets();
  }, [currentPage]);

  /* ================= FILTER + SEARCH ================= */
  const filteredTickets = useMemo(() => {
    let data = [...tickets];

    if (priorityFilter !== "All") {
      data = data.filter(
        (t) => t.priority?.toUpperCase() === priorityFilter
      );
    }

    if (searchText.trim()) {
      const text = searchText.toLowerCase();
      data = data.filter(
        (t) =>
          t.name?.toLowerCase().includes(text) ||
          t.id?.toLowerCase().includes(text) ||
          t.issue?.toLowerCase().includes(text)
      );
    }

    return data;
  }, [tickets, priorityFilter, searchText]);

  /* ================= TABLE ROWS ================= */
  const TableRows = filteredTickets.map((row) => ({
    ...row,
    action: (
      <button
        onClick={() => {
          setSelectedTicket(row);
          setViewOpen(true);
        }}
        className="bg-[#7AA3CC] font-inter font-medium py-2 px-11 rounded-full text-[#121212] hover:bg-[#7AA3CC]/80 transition-all"
      >
        View
      </button>
    ),
  }));

  /* ================= UI ================= */
  return (
    <div>
      <Bredcumb />

      {/* ===== FILTER BAR ===== */}
      <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-16">
        <Dropdown
          placeholder="All"
          options={["All", "HIGH", "MEDIUM", "LOW"]}
          onSelect={(value) => setPriorityFilter(value)}
          className="md:w-[10%] bg-[#7AA3CC] rounded-xl p-2 font-inter font-medium"
        />

        <div className="relative">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border outline-none border-[#000000] py-[14px] px-12 w-full md:w-[462px] rounded-[15px] font-inter"
            placeholder="Search"
          />
          <FaSearch className="absolute top-1/2 left-6 -translate-y-1/2 text-[#7AA3CC]" />
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="overflow-auto mt-6">
        <Table TableHeads={TableHeads} TableRows={TableRows} />
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* ===== VIEW MODAL ===== */}
      {viewOpen && selectedTicket && (
        <div className="fixed inset-0 bg-[#D9D9D9]/80 flex items-center justify-center z-50">
          <div className="bg-[#EFEFEF] rounded-3xl p-5 w-[90%] md:w-[50%]">
            <div className="flex justify-end">
              <FiX
                onClick={() => setViewOpen(false)}
                className="w-7 h-7 mb-5 cursor-pointer"
              />
            </div>

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
                  {selectedTicket.name}
                </h2>
                <p className="text-xl">{selectedTicket.id}</p>
              </div>
            </div>

            <div className="font-inter text-2xl">
              <Detail label="Date" value={selectedTicket.date} />
              <Detail label="Priority" value={selectedTicket.priority} />
              <Detail label="Issue" value={selectedTicket.issue} />
              <Detail
                label="Description"
                value={selectedTicket.description || "—"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;

/* ================= SMALL COMPONENT ================= */
const Detail = ({ label, value }) => (
  <div className="flex justify-between border-b py-4">
    <span className="font-medium">{label}:</span>
    <span>{value}</span>
  </div>
);
