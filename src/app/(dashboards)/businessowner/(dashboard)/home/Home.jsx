"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import tenants from "@/public/TenantIcon.png";
import visit from "@/public/VisitIcon.png";
import staff from "@/public/Staff.png";
import reward from "@/public/reward.png";

import CustomerVisitChart from "@/src/components/CustomerVisitChart";
import ProgressBar from "@/src/components/ProgressBar";
import StatusProgressChart from "@/src/components/StatusProgressChart";

import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";

const Home = () => {
  const [stats, setStats] = useState(null);
  const [topRewards, setTopRewards] = useState([]);
  const [redemptionStatus, setRedemptionStatus] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH OVERVIEW ================= */
  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const token = Cookies.get("accessToken");

        const res = await fetch(
          `${BASE_URL}/business-owner/overview`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const json = await res.json();
        console.log("OVERVIEW 👉", json);

        if (res.ok && json.data) {
          setStats(json.data.stats);

          // 🔹 Progress bar (Top rewards)
          setTopRewards(
            json.data.topRewards.map((item) => ({
              title: item.label,
              claims: item.value,
              unit: "Claims",
            }))
          );

          // 🔹 Status breakdown
          setRedemptionStatus([
            { title: "Claimed", value: json.data.redemptionBreakdown.claimed },
            { title: "Expired", value: json.data.redemptionBreakdown.expired },
            { title: "Pending", value: json.data.redemptionBreakdown.pending },
          ]);

          // 🔹 Chart
          setChartData(json.data.charts.customerVisitAndRedeem || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  return (
    <div className="grid grid-cols-12 md:gap-10 gap-5">
      {/* TOTAL CUSTOMERS */}
      <div className="bg-[#F9F9F9] dark:bg-transparent rounded-2xl col-span-6 md:col-span-3 p-5 flex flex-col items-center gap-2 dark:border dark:border-white">
        <Image src={tenants} alt="customers" className="dark:invert" />
        <p className="font-inter dark:text-white">Total Customers</p>
        <p className="font-inter font-semibold dark:text-white">
          {loading ? "—" : stats?.totalCustomers ?? 0}
        </p>
      </div>

      {/* TOTAL STAFF */}
      <div className="bg-[#F9F9F9] dark:bg-transparent rounded-2xl col-span-6 md:col-span-3 p-5 flex flex-col items-center gap-2 dark:border dark:border-white">
        <Image src={staff} alt="staff" className="dark:invert" />
        <p className="font-inter dark:text-white">Total Staff</p>
        <p className="font-inter font-semibold dark:text-white">
          {loading ? "—" : stats?.totalStaff ?? 0}
        </p>
      </div>

      {/* REWARD REDEEM */}
      <div className="bg-[#F9F9F9] dark:bg-transparent rounded-2xl col-span-6 md:col-span-3 p-5 flex flex-col items-center gap-2 dark:border dark:border-white">
        <Image src={reward} alt="reward" className="dark:invert" />
        <p className="font-inter dark:text-white">Reward Redeem</p>
        <p className="font-inter font-semibold dark:text-white">
          {loading ? "—" : stats?.rewardRedeemed ?? 0}
        </p>
      </div>

      {/* VISITS */}
      <div className="bg-[#F9F9F9] dark:bg-transparent rounded-2xl col-span-6 md:col-span-3 p-5 flex flex-col items-center gap-2 dark:border dark:border-white">
        <Image src={visit} alt="visit" className="dark:invert" />
        <p className="font-inter dark:text-white">Total visit this month</p>
        <p className="font-inter font-semibold dark:text-white">
          {loading ? "—" : stats?.totalVisitsThisMonth ?? 0}
        </p>
      </div>

      {/* CUSTOMER VISIT CHART */}
      <div className="col-span-12">
        <h2 className="text-2xl mb-4 font-inter font-medium dark:text-white">
          Customer Visit & Reward Redeemptions
        </h2>
        <CustomerVisitChart data={chartData} />
      </div>

      {/* TOP REWARDS */}
      <div className="col-span-12 md:col-span-6">
        <h3 className="font-medium text-2xl mb-6 font-inter dark:text-white">
          Top Performing Chart
        </h3>
        <ProgressBar data={topRewards} />
      </div>

      {/* STATUS */}
      <div className="col-span-12 md:col-span-6">
        <h3 className="font-medium text-2xl mb-6 font-inter dark:text-white">
          Redeemption Breakdown
        </h3>
        <StatusProgressChart data={redemptionStatus} />
      </div>
    </div>
  );
};

export default Home;
