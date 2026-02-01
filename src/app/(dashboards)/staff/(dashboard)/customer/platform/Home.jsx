"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import tenants from "@/public/TenantIcon.png";
import visit from "@/public/VisitIcon.png";
import Bredcumb from "@/src/components/Bredcumb";
import Table from "@/src/components/Table";
import Pagination from "@/src/components/Pagination";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";

const Home = () => {
  /* ================= STATE ================= */
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    monthlyVisits: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [loading, setLoading] = useState(false);

  /* ================= TABLE HEADS ================= */
  const TableHeads = [
    { Title: "Customer Name", key: "name", width: "25%" },
    { Title: "Customer Email", key: "email", width: "25%" },
    { Title: "Reward Point", key: "point", width: "20%" },
    { Title: "Last Visit", key: "date", width: "30%" },
  ];

  /* ================= FETCH STATS ================= */
  const fetchStats = async () => {
    try {
      const token = Cookies.get("token");
      const branchId = localStorage.getItem("branchId");
      if (!token || !branchId) return;

      const res = await fetch(
        `${BASE_URL}/staff/customers/stats?branchId=${branchId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      setStats({
        totalCustomers: json.data.totalCustomers || 0,
        monthlyVisits: json.data.monthlyVisits || 0,
      });
    } catch (err) {
      console.error("Stats error:", err);
    }
  };

  /* ================= FETCH CUSTOMERS ================= */
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("token");
      const branchId = localStorage.getItem("branchId");
      if (!token || !branchId) return;

      const res = await fetch(
        `${BASE_URL}/staff/customers?branchId=${branchId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      const formatted = (json.data.customers || []).map((c) => ({
        name: c.name,
        email: c.email,
        point: c.rewardPoint,
        date: c.lastVisit
          ? new Date(c.lastVisit).toLocaleDateString()
          : "-",
      }));

      setCustomers(formatted);
    } catch (err) {
      console.error("Customer fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= INIT ================= */
  useEffect(() => {
    fetchStats();
    fetchCustomers();
  }, []);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(customers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = customers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  /* ================= UI ================= */
  return (
    <div>
      <Bredcumb />

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-12 gap-10 mb-10">
        <div className="bg-[#F9F9F9] rounded-2xl col-span-12 md:col-span-3 p-5 flex flex-col items-center gap-2">
          <Image src={tenants} alt="customers" />
          <p className="font-inter text-[#121212]">Total Customers</p>
          <p className="font-inter font-semibold text-[#121212]">
            {stats.totalCustomers}
          </p>
        </div>

        <div className="bg-[#F9F9F9] rounded-2xl col-span-12 md:col-span-3 p-5 flex flex-col items-center gap-2">
          <Image src={visit} alt="visit" />
          <p className="font-inter text-[#121212]">
            Total visit this month
          </p>
          <p className="font-inter font-semibold text-[#121212]">
            {stats.monthlyVisits}
          </p>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="overflow-auto">
        <Table TableHeads={TableHeads} TableRows={currentItems} />
      </div>

      {loading && (
        <p className="font-inter text-center mt-4">Loading customers...</p>
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Home;
