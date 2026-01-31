"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import tenants from "@/public/TenantIcon.png";
import bill from "@/public/BillIcon.png";
import ticket from "@/public/TicketIcon.png";

import TenantsGrowthChart from "@/src/components/TenantsGrowthChart";
import SupportTicketChart from "@/src/components/SupportTicketChart";
import { BASE_URL } from "@/src/config/api";

const Home = () => {
  const [loading, setLoading] = useState(true);

  const [tenantsCount, setTenantsCount] = useState(0);
  const [activeTenants, setActiveTenants] = useState(0);
  const [supportTickets, setSupportTickets] = useState(0);
  const [billingIssues, setBillingIssues] = useState(0);

  const [tableRows, setTableRows] = useState([]);
  const [tenantsGrowth, setTenantsGrowth] = useState([]);
  const [ticketSummary, setTicketSummary] = useState({});

  // FETCH DASHBOARD OVERVIEW -------------------------
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");

    const fetchDashboard = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/system-owner/dashboard/overview`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const result = await res.json();
        const data = result.data;

        setTenantsCount(data.stats.tenantsRegistered ?? 0);
        setActiveTenants(data.stats.activeTenants ?? 0);
        setSupportTickets(data.stats.supportTickets ?? 0);
        setBillingIssues(data.stats.billingIssues ?? 0);

        setTableRows(data.tenantsTable ?? []);
        setTenantsGrowth(data.tenantsGrowth ?? []);
        setTicketSummary(data.supportTicketSummary ?? {});
      } catch (error) {
        console.log("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // TABLE CONFIG ------------------------------------
  const TableHeads = [
    { Title: "Merchant", key: "name", width: "10%" },
    { Title: "Active Tenants", key: "activeTenants", width: "10%" },
    { Title: "Status", key: "status", width: "10%" },
  ];

  return (
    <div className="grid grid-cols-12 gap-10">

      {/* TOTAL TENANTS */}
      <div className="bg-[#F9F9F9] rounded-2xl col-span-6 md:col-span-3 p-5 flex flex-col items-center gap-2">
        <Image src={tenants} alt="user" />
        <p className="font-inter text-[#121212]">Tenants Register</p>
        <p className="font-inter font-semibold text-[#121212]">
          {loading ? "Loading..." : tenantsCount}
        </p>
      </div>

      {/* ACTIVE TENANTS */}
      <div className="bg-[#F9F9F9] rounded-2xl col-span-6 md:col-span-3 p-5 flex flex-col items-center gap-2">
        <span className="w-14 h-14 bg-[#4CAF50] rounded-full"></span>
        <p className="font-inter text-[#121212]">Active Tenants</p>
        <p className="font-inter font-semibold text-[#121212]">
          {loading ? "Loading..." : activeTenants}
        </p>
      </div>

      {/* SUPPORT TICKET */}
      <div className="bg-[#F9F9F9] rounded-2xl col-span-6 md:col-span-3 p-5 flex flex-col items-center gap-2">
        <Image src={ticket} alt="ticket" />
        <p className="font-inter text-[#121212]">Support Ticket</p>
        <p className="font-inter font-semibold text-[#121212]">
          {loading ? "Loading..." : supportTickets}
        </p>
      </div>

      {/* BILLING ISSUE */}
      <div className="bg-[#F9F9F9] rounded-2xl col-span-6 md:col-span-3 p-5 flex flex-col items-center gap-2">
        <Image src={bill} alt="bill" />
        <p className="font-inter text-[#121212]">Billing Issue</p>
        <p className="font-inter font-semibold text-[#121212]">
          {loading ? "Loading..." : billingIssues}
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-[#F9F9F9] rounded-2xl col-span-12 p-5">
        <table className="w-full border-collapse bg-[#F9F9F9] rounded-2xl overflow-hidden">
          <thead>
            <tr>
              {TableHeads.map((head) => (
                <th
                  key={head.key}
                  className="text-center font-medium bg-[#7AA3CC] text-[#000000] py-[22px] text-2xl"
                  style={{ width: head.width }}
                >
                  {head.Title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {tableRows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {TableHeads.map((head) => (
                  <td
                    key={head.key}
                    className="border border-[#7AA3CC]/20 py-[22px] text-center px-3 font-inter text-xl text-[#000000]"
                  >
                    {row[head.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TENANTS GROWTH */}
      <div className="rounded-2xl col-span-12 md:col-span-8">
        <h2 className="text-2xl mb-4 font-inter font-medium">
          Tenants Growth
        </h2>
        <TenantsGrowthChart data={tenantsGrowth} />
      </div>

      {/* SUPPORT TICKET */}
      <div className="rounded-2xl col-span-12 md:col-span-4">
        <h2 className="text-2xl mb-4 font-inter font-medium">
          Support Ticket
        </h2>
        <SupportTicketChart data={ticketSummary} />
      </div>

    </div>
  );
};

export default Home;
