"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { BiExport } from "react-icons/bi";

import tenants from "@/public/TenantIcon.png";
import visit from "@/public/VisitIcon.png";
import reward from "@/public/reward.png";

import Table from "@/src/components/Table";
import Dropdown from "@/src/components/Dropdown";
import { BASE_URL } from "@/src/config/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    rewardRedeemed: 0,
    totalVisitsThisMonth: 0,
  });

  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  /* ================= TABLE CONFIG ================= */
  const TableHeads = [
    { Title: "Date", key: "date", width: "15%" },
    { Title: "Transaction", key: "transaction", width: "20%" },
    { Title: "Reward Redeemed", key: "reward", width: "20%" },
    { Title: "Net Program Cost", key: "cost", width: "20%" },
  ];

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  /* ================= FETCH ANALYTICS ================= */
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = Cookies.get("accessToken");
        if (!token) return;

        const res = await fetch(`${BASE_URL}/business-owner/analytics`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();
        console.log("ANALYTICS RESPONSE:", result);

        if (!res.ok) throw new Error(result.message);

        setStats(result.data.stats || {});
        setTableData(result.data.table || []);
        setFilteredData(result.data.table || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnalytics();
  }, []);

  /* ================= CSV EXPORT ================= */
  const handleExportCSV = () => {
    if (!tableData.length) return;

    const headers = TableHeads.map((h) => h.Title);
    const rows = tableData.map((row) =>
      TableHeads.map((h) => row[h.key] ?? "").join(",")
    );

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "analytics.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ================= UI ================= */
  return (
    <div className="grid grid-cols-12 gap-10">
      {/* ===== STATS ===== */}
      <StatCard
        icon={tenants}
        title="Total Customers"
        value={stats.totalCustomers}
      />
      <StatCard
        icon={reward}
        title="Reward Redeem"
        value={stats.rewardRedeemed}
      />
      <StatCard
        icon={visit}
        title="Total visit this month"
        value={stats.totalVisitsThisMonth}
      />

      {/* ===== TABLE ===== */}
      <div className="col-span-12">
        <div className="flex items-center justify-between mb-4">
          <Dropdown
            placeholder="Location Filter"
            options={[]}
            className="bg-[#7AA3CC] dark:bg-transparent dark:border dark:border-[#7AA3CC] rounded-xl p-2.5 font-inter font-medium"
          />

          <div className="relative">
            <button
              onClick={handleExportCSV}
              className="font-inter font-medium text-[#000000] py-3.5 pl-15 pr-7 bg-[#7AA3CC] rounded-lg"
            >
              Export to CSV
            </button>
            <BiExport className="w-6 h-6 top-1/2 left-7 -translate-y-1/2 absolute" />
          </div>
        </div>

        <div className="w-full overflow-auto">
          <Table TableHeads={TableHeads} TableRows={currentItems} />
        </div>
      </div>
    </div>
  );
};

/* ================= STAT CARD ================= */
const StatCard = ({ icon, title, value }) => (
  <div className="bg-[#F9F9F9] dark:bg-transparent rounded-2xl p-5 flex flex-col items-center gap-2 dark:border dark:border-white col-span-12 md:col-span-4">
    <Image src={icon} alt={title} className="dark:invert" />
    <p className="font-inter text-[#121212] dark:text-white">{title}</p>
    <p className="font-inter font-semibold text-[#121212] dark:text-white">
      {value}
    </p>
  </div>
);

export default Dashboard;
