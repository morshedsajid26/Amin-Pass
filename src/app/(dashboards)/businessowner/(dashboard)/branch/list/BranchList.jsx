"use client";

import Bredcumb from "@/src/components/Bredcumb";
import Pagination from "@/src/components/Pagination";
import Table from "@/src/components/Table";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";

const BranchList = () => {
  const [branches, setBranches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // TABLE HEADS (unchanged)
  const TableHeads = [
    { Title: "Branch Name", key: "branch", width: "20%" },
    { Title: "Branch Location", key: "location", width: "30%" },
    { Title: "Number of Staff", key: "staffs", width: "20%" },
    { Title: "Manager Name", key: "manager", width: "20%" },
  ];

  // FETCH BRANCHES -----------------------------------
useEffect(() => {
  const fetchBranches = async () => {
    setLoading(true);

    try {
      const accessToken = Cookies.get("accessToken");
      const businessId = Cookies.get("businessId");

      if (!businessId) {
        setBranches([]);
        return;
      }

      const res = await fetch(
        `${BASE_URL}/business-owner/branchs/all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );

      if (res.status === 404) {
        setBranches([]);
        return;
      }

      const json = await res.json();

      if (!res.ok) {
        setBranches([]);
        return;
      }

      const rows = (json.data || []).map((item) => ({
        branch: item.name || "-",
        location: item.address || "-",
        staffs: item.staffCount,
        manager: item.managerName || "N/A",
      }));

      setBranches(rows);
    } catch (error) {
      setBranches([]);
    } finally {
      setLoading(false);
    }
  };

  fetchBranches();
}, []);



  // PAGINATION ---------------------------------------
  const itemsPerPage = 10;
  const totalPages = Math.ceil(branches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = branches.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
      <Bredcumb />

      <Link
        href="/businessowner/branch/list/add/branch"
        className="flex justify-end mb-6"
      >
        <button className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl font-inter py-3 px-5 rounded-lg cursor-pointer flex items-center gap-2">
          <FaPlus />
          Add New Branch
        </button>
      </Link>

      {loading ? (
        <p className="text-center font-inter">Loading branches...</p>
      ) : (
        <div className="overflow-auto">
          <Table TableHeads={TableHeads} TableRows={currentItems} />
        </div>
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default BranchList;
