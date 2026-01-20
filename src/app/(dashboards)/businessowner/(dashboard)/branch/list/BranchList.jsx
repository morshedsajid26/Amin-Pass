"use client";

import Bredcumb from "@/src/components/Bredcumb";
import Pagination from "@/src/components/Pagination";
import Table from "@/src/components/Table";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Cookies from "js-cookie";
import { BUSINESSOWNER_BASE_URL } from "@/src/config/api";

const BranchList = () => {
  const [baseOnTitle, setBaseOnTitle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const TableHeads = [
    { Title: "Branch Name", key: "branch", width: "20%" },
    { Title: "Branch Location", key: "location", width: "30%" },
    { Title: "Number of Staff", key: "staffs", width: "20%" },
    { Title: "Manager Name", key: "manager", width: "20%" },
  ];

  // 🔹 Fetch branches
  useEffect(() => {
    const fetchBranches = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("token");

        const res = await fetch(
          `${BUSINESSOWNER_BASE_URL}/api/owner/branches`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          console.error(data);
          return;
        }

        // 🔁 API data → Table format
        const rows = data.branches.map((item) => ({
          branch: item.name,
          location: item.address,
          staffs: item.staffs,
          manager: item.manager_name,
        }));

        setBaseOnTitle(rows);
      } catch (error) {
        console.error("Branch fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  // 🔹 Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(baseOnTitle.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = baseOnTitle.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
      <Bredcumb />

      <Link href="/businessowner/branch/list/add/branch" className="flex justify-end mb-6">
        <button className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl font-inter py-3 px-5 rounded-lg cursor-pointer flex items-center gap-2">
          <FaPlus />
          Add New Branch
        </button>
      </Link>

      {loading ? (
        <p className="text-center font-inter">Loading branches...</p>
      ) : (
        <Table TableHeads={TableHeads} TableRows={currentItems} />
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
