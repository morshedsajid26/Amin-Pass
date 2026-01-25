"use client";
import Pagination from "@/src/components/Pagination";
import Table from "@/src/components/Table";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const History = () => {
  const [baseOnTitle, setBaseOnTitle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // BADGE COMPONENT
  function Badge({ children, color }) {
    const cls =
      color === "blue"
        ? "text-[#000000] bg-[#7AA3CC] "
        : "text-[#000000] dark:text-white  bg-transparent ring-1 ring-[#7AA3CC]";
    return (
      <span
        className={`inline-flex items-center rounded-[5px] px-6 py-[9px] text-[16px] font-inter ${cls}`}
      >
        {children}
      </span>
    );
  }

  // OUTLINE BUTTON
  function OutlineBtn({ children, tone = "slate", onClick }) {
    const tones = {
      blue: "text-[#000000]  bg-[#7AA3CC] hover:bg-[#7AA3CC]/50",
      red: "text-[#000000] dark:text-white  ring-1 ring-inset ring-[#7AA3CC] hover:bg-[#7AA3CC]/10",
      slate:
        "text-slate-600 ring-1 ring-inset ring-slate-300 hover:bg-slate-50",
    };
    return (
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center rounded-md px-6 py-[9px] text-[16px] font-inter cursor-pointer ${tones[tone]} transition`}
      >
        {children}
      </button>
    );
  }

  // ACTION CELL (CONTROLLED BY STATUS)
  function ActionCell({ status }) {
    const s = String(status || "pending").toLowerCase();

    if (s === "approved") return <Badge color="blue">✅Approved</Badge>;
    if (s === "rejected") return <Badge color="red">❌Rejected</Badge>;

    return (
      <div className="flex items-center justify-center gap-3 text-[16px] font-inter ">
        <OutlineBtn tone="blue">
          ✅ 
          Approve
          </OutlineBtn>
        <OutlineBtn tone="red">❌ Reject</OutlineBtn>
      </div>
    );
  }

  const TableHeads = [
    { Title: "Request ID", key: "id", width: "15%" },
    { Title: "Staff", key: "staff", width: "10%" },
    { Title: "Customer Name", key: "name", width: "20%" },
    { Title: "Points", key: "points", width: "10%" },
    { Title: "Reason", key: "reason", width: "10%" },
    { Title: "Action", key: "action", width: "20%" },
  ];

  const TableRows = [
    {
      id: "#1254",
      staff: "John",
      name: "Jane D.",
      points: "+50",
      reason: "Wrong Scan",
      status: "approved",
    },
    {
      id: "#1255",
      staff: "Hasan",
      name: "Rafiq",
      points: "+20",
      reason: "Wrong entry",
      status: "rejected",
    },
    {
      id: "#1256",
      staff: "Mehedi",
      name: "Nazia",
      points: "+30",
      reason: "Incorrect points",
      status: "pending",
    },
  ];

  // CREATE FINAL TABLE ROWS WITH ACTION COMPONENT
  const processedRows = TableRows.map((row) => ({
    ...row,
    action: <ActionCell status={row.status} />,
  }));

  useEffect(() => {
    setBaseOnTitle(processedRows);
  }, []);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(baseOnTitle.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = baseOnTitle.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="flex justify-center my-10">
        <div className="relative ">
          <input
            type="text"
            className="border outline-none border-[#000000] dark:border-[#CDCDCD] py-[14px] px-12 w-full md:w-[462px] rounded-[15px] dark:text-white text-[#000000] placeholder:text-[#000000] dark:placeholder:text-white font-inter"
            placeholder="Search"
          />
          <FaSearch className=" absolute top-1/2 left-6 -translate-y-1/2 text-[#7AA3CC] " />
        </div>
      </div>

     <div className="overflow-auto">
       <Table TableHeads={TableHeads} TableRows={currentItems} />
     </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default History;
