"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";

import tenants from "@/public/TenantIcon.png";
import bill from "@/public/BillIcon.png";
import ticket from "@/public/TicketIcon.png";

import TenantsGrowthChart from '@/src/components/TenantsGrowthChart';
import SupportTicketChart from '@/src/components/SupportTicketChart';

const Home = () => {
  const [activeTenants, setActiveTenants] = useState(0);
   const [tenantsCount, setTenantsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // FETCH ACTIVE TENANTS COUNT -------------------------
useEffect(() => {
  const token = Cookies.get("token");

  const fetchAll = async () => {
    try {
      const [activeRes, totalRes] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/admin/get-active-tenants-count", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch("http://127.0.0.1:8000/api/admin/get-tenants-count", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const activeData = await activeRes.json();
      const totalData = await totalRes.json();

      setActiveTenants(activeData.activeTenants ?? 0);
      setTenantsCount(totalData.tenantsCount ?? 0);

    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchAll();
}, []);



  // TABLE DATA -----------------------------------------
  const TableHeads = [
    { Title: "Merchant", key: "merchant", width: "10%" },
    { Title: "Active Tenants", key: "active_tenants", width: "10%" },
    { Title: "Status", key: "status", width: "10%" },
  ];

  const TableRows = [
    { merchant: "Cafe", active_tenants: "50", status: "Active" },
    { merchant: "Glow Spa", active_tenants: "50", status: "Active" },
    { merchant: "Super Shop", active_tenants: "50", status: "Active" },
  ];

  return (
    <div className="grid grid-cols-8 gap-10">

      {/* TOTAL TENANTS */}
      <div className="bg-[#F9F9F9] rounded-2xl col-span-2 p-5 flex flex-col items-center gap-2">
        <Image src={tenants} alt="user" />
        <p className="font-inter text-[#121212]">Tenants Register</p>
        <p className="font-inter font-semibold text-[#121212]">
          {loading ? "Loading..." : tenantsCount}
        </p>
      </div>

      {/* ACTIVE TENANTS */}
      <div className="bg-[#F9F9F9] rounded-2xl col-span-2 p-5 flex flex-col items-center gap-2">
        <span className="w-14 h-14 bg-[#4CAF50] rounded-full"></span>
        <p className="font-inter text-[#121212]">Active Tenants</p>
        <p className="font-inter font-semibold text-[#121212]">
          {loading ? "Loading..." : activeTenants}
        </p>
      </div>

      {/* SUPPORT TICKET */}
      <div className="bg-[#F9F9F9] rounded-2xl col-span-2 p-5 flex flex-col items-center gap-2">
        <Image src={ticket} alt="ticket" />
        <p className="font-inter text-[#121212]">Support Ticket</p>
        <p className="font-inter font-semibold text-[#121212]">324</p>
      </div>

      {/* BILLING ISSUE */}
      <div className="bg-[#F9F9F9] rounded-2xl col-span-2 p-5 flex flex-col items-center gap-2">
        <Image src={bill} alt="bill" />
        <p className="font-inter text-[#121212]">Billing Issue</p>
        <p className="font-inter font-semibold text-[#121212]">324</p>
      </div>

      {/* TABLE */}
      <div className="bg-[#F9F9F9] rounded-2xl col-span-8 p-5">
        <table className="w-full border-collapse bg-[#F9F9F9] rounded-2xl overflow-hidden">
          <thead>
            <tr key={'header'}>
              {TableHeads.map((head) => (
                <th
                  className="text-center font-medium bg-[#7AA3CC] text-[#000000] py-[22px] text-2xl"
                  style={{ width: head.width }}
                >
                  {head.Title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {TableRows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {TableHeads.map((head) => (
                  <td className="border border-[#7AA3CC]/20 py-[22px] text-center px-3 font-inter text-xl text-[#000000]">
                    {row[head.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TENANTS GROWTH */}
      <div className="rounded-2xl col-span-5">
        <h2 className="text-2xl mb-4 font-inter font-medium">Tenants Growth</h2>
        <TenantsGrowthChart />
      </div>

      {/* SUPPORT TICKET */}
      <div className="rounded-2xl col-span-3">
        <h2 className="text-2xl mb-4 font-inter font-medium">Support Ticket</h2>
        <SupportTicketChart />
      </div>

    </div>
  );
};

export default Home;
