"use client";
import React, { useEffect, useState } from "react";
import tenants from "@/public/TenantIcon.png";
import visit from "@/public/VisitIcon.png";
import Image from "next/image";
import Table from "@/src/components/Table";
import Dropdown from "@/src/components/Dropdown";
import Pagination from "@/src/components/Pagination";
import Link from "next/link";
import Cookies from "js-cookie";
import { BUSINESSOWNER_BASE_URL } from "@/src/config/api";

const Platform = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const TableHeads = [
    { Title: "Customer Name", key: "name", width: "20%" },
    { Title: "Customer Email", key: "email", width: "20%" },
    { Title: "RFM", key: "rfm", width: "10%" },
    { Title: "Segment", key: "segment", width: "15%" },
    { Title: "Reward Point", key: "reward", width: "15%" },
    { Title: "Date", key: "date", width: "20%" },
  ];

  /* ================= FETCH CUSTOMERS ================= */
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = Cookies.get("accessToken");

        const res = await fetch(
          `${BUSINESSOWNER_BASE_URL}/business-owner/all-customers/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const json = await res.json();

        if (res.ok && Array.isArray(json.data)) {
          // 🔥 Map API response → Table format
          const mapped = json.data.map((c) => ({
            name: c.name,
            email: c.email,
            rfm: "-",                 // backend দেয় নাই
            segment: "Regular",       // placeholder
            reward: "0",              // placeholder
            date: new Date(c.registeredDate).toLocaleDateString(),
          }));

          setCustomers(mapped);
        } else {
          setCustomers([]);
        }
      } catch (err) {
        console.error(err);
        setCustomers([]);
      }
    };

    fetchCustomers();
  }, []);

  /* ================= PAGINATION ================= */
  const itemsPerPage = 10;
  const totalPages = Math.ceil(customers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = customers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="grid grid-cols-12 gap-10">
      {/* TOTAL CUSTOMERS */}
      <div className="bg-[#F9F9F9] dark:bg-transparent rounded-2xl p-5 flex flex-col items-center gap-2 dark:border dark:border-white col-span-12 md:col-span-3">
        <Image src={tenants} alt="user" className="dark:invert" />
        <p className="font-inter text-[#121212] dark:text-white">
          Total Customers
        </p>
        <p className="font-inter font-semibold text-[#121212] dark:text-white">
          {customers.length}
        </p>
      </div>

      {/* VISIT CARD (STATIC FOR NOW) */}
      <div className="bg-[#F9F9F9] dark:bg-transparent dark:border dark:border-white rounded-2xl p-5 flex flex-col items-center gap-2 col-span-12 md:col-span-3">
        <Image src={visit} alt="bill" className="dark:invert" />
        <p className="font-inter text-[#121212] dark:text-white">
          Total visit this month
        </p>
        <p className="font-inter font-semibold dark:text-white text-[#121212]">
          0
        </p>
      </div>

      {/* TABLE */}
      <div className="col-span-12">
        <div className="flex items-end justify-between">
          <Dropdown
            label="Segment"
            placeholder="All"
            className="font-inter font-medium gap-2"
            inputClass="border rounded-xl p-2.5 border-[#7AA3CC]"
            options={["All", "Regular", "At Risk"]}
          />

          <Link href="/businessowner/customer/platform/customer/review">
            <button className="font-inter font-medium text-[#000000] py-3.5 px-5 bg-[#7AA3CC] rounded-lg">
              View Customer Feedback
            </button>
          </Link>
        </div>

        <div className="w-full">
          <div className="overflow-auto">
            <Table TableHeads={TableHeads} TableRows={currentItems} />
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Platform;
