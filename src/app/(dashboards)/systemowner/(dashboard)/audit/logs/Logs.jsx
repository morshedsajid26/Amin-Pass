"use client";

import Bredcumb from "@/src/components/Bredcumb";
import Pagination from "@/src/components/Pagination";
import Table from "@/src/components/Table";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BiExport } from "react-icons/bi";
import axios from "axios";
import { BASE_URL } from "@/src/config/api";
import Cookies from "js-cookie";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const itemsPerPage = 10;

  /* ================= TABLE HEAD ================= */
  const TableHeads = [
    { Title: "Business Name", key: "name", width: "20%" },
    { Title: "Date", key: "date", width: "15%" },
    { Title: "Time", key: "time", width: "15%" },
    { Title: "Action", key: "action", width: "25%" },
    { Title: "Details", key: "details", width: "25%" },
  ];

  /* ================= FETCH LOGS ================= */
  const fetchLogs = async () => {
    try {
      const token = Cookies.get("accessToken");
      const res = await axios.get(
        `${BASE_URL}/system-owner/audit-logs`,
        {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            search,
          },
          // withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { logs, meta } = res.data.data;

      const formatted = logs.map((log) => {
        const dateObj = new Date(log.date);

        return {
          name: log.businessName,
          date: dateObj.toLocaleDateString(),
          time: dateObj.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          action: log.action,
          details: JSON.stringify(log.details),
        };
      });

      setLogs(formatted);
      setTotalPages(meta.totalPages);
    } catch (error) {
      console.error("Failed to fetch audit logs", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [currentPage, search]);

  /* ================= CSV EXPORT ================= */
  const handleExportCSV = () => {
    const headers = TableHeads.map((h) => h.Title);

    const rows = logs.map((row) =>
      TableHeads.map((h) => `"${row[h.key]}"`).join(",")
    );

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audit_logs.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Bredcumb />

      {/* ================= TOP BAR ================= */}
      <div className="flex flex-col md:flex-row md:justify-between items-end gap-5">

        {/* SEARCH */}
        <div className="relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className="border py-3.5 px-12 w-[462px] rounded-[15px]"
          />
          <FaSearch className="absolute top-1/2 left-6 -translate-y-1/2 text-[#7AA3CC]" />
        </div>

        {/* EXPORT */}
        <div className="relative">
          <button
            onClick={handleExportCSV}
            className="py-3.5 pl-14 pr-7 border-2 border-[#7AA3CC] rounded-lg"
          >
            Export to CSV
          </button>
          <BiExport className="absolute top-1/2 left-6 -translate-y-1/2 w-6 h-6" />
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-auto mt-6">
        <Table TableHeads={TableHeads} TableRows={logs} />
      </div>

      {/* ================= PAGINATION ================= */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Logs;
