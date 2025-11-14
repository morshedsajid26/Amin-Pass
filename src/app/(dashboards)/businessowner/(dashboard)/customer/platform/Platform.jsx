"use client";
import React, { useEffect, useState } from "react";
import tenants from "@/public/TenantIcon.png";
import visit from "@/public/VisitIcon.png";
import reward from "@/public/reward.png";
import Image from "next/image";
import { BiExport } from "react-icons/bi";
import Table from "@/src/components/Table";
import Dropdown from "@/src/components/Dropdown";
import Pagination from "@/src/components/Pagination";
import Link from "next/link";

const Platform = () => {
  const [baseOnTitle, setBaseOnTitle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const TableHeads = [
    { Title: "Customer Name", key: "name", width: "20%" },
    { Title: "Customer Email", key: "email", width: "20%" },
    { Title: "RFM", key: "rfm", width: "10%" },
    { Title: "Segment", key: "segment", width: "15%" },
    { Title: "Reward Point", key: "reward", width: "15%" },
    { Title: "Date", key: "date", width: "20%" },
  ];

  const TableRows = [
    {
        name:"Jane D.",
        email:"example@gmail.com",
        segment: "Regular",
        rfm: "5",
        reward: "50",
        date: "25/08/2025",
    },
     {
        name:"Jane D.",
        email:"example@gmail.com",
        segment: "At Risk",
        rfm: "5",
        reward: "50",
        date: "25/08/2025",
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
    <div className="grid grid-cols-3 gap-10">
      <div className="bg-[#F9F9F9] dark:bg-transparent rounded-2xl  p-5 flex flex-col items-center gap-2 dark:border dark:border-white">
        <Image src={tenants} alt="user" className="dark:invert" />
        <p className="font-inter text-[#121212] dark:text-white">
          Total Customers
        </p>
        <p className="font-inter font-semibold text-[#121212] dark:text-white">
          324
        </p>
      </div>
      <div className="bg-[#F9F9F9] dark:bg-transparent dark:border dark:border-white rounded-2xl  p-5 flex flex-col items-center gap-2">
        <Image src={visit} alt="bill" className="dark:invert" />
        <p className="font-inter text-[#121212] dark:text-white">Total visit this month</p>
        <p className="font-inter font-semibold dark:text-white text-[#121212]">324</p>
      </div>

      <div className="col-span-3">
        <div className="flex items-end justify-between">
          <Dropdown
            label="Segment"
            placeholder="At Risk"
            className={`   font-inter font-medium gap-2`}
            inputClass={`border rounded-xl p-2.5 border-[#7AA3CC] `}
            options={["At Risk", "Regular"]}
          />
          <div >

            <Link href='/businessowner/customer/platform/customer/review'>
            <button className="font-inter font-medium text-[#000000] py-3.5 px-5  bg-[#7AA3CC] rounded-lg">
              View Customer Feedback
            </button>
            </Link>
          </div>
        </div>
        <div className="w-full">
          <Table TableHeads={TableHeads} TableRows={currentItems} />

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
