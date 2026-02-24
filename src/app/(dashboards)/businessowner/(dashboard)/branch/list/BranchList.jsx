"use client";

import Bredcumb from "@/src/components/Bredcumb";
import Pagination from "@/src/components/Pagination";
import Table from "@/src/components/Table";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";
import axios from "axios";
import { toast } from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";

const BranchList = () => {
  const [branches, setBranches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Modal States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // FETCH BRANCHES -----------------------------------
  const fetchBranches = async () => {
    setLoading(true);

    try {
      const accessToken = Cookies.get("accessToken");

      const res = await axios.get(`${BASE_URL}/business-owner/branchs/all`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      });

      if (res.data.success) {
        const rows = (res.data.data || []).map((item) => ({
          id: item.id,
          branch: item.name || "-",
          location: item.address || "-",
          staffs: item.staffCount,
          manager: item.managerName || "N/A",
        }));
        setBranches(rows);
      }
    } catch (error) {
      console.error("Failed to fetch branches", error);
      setBranches([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  // DELETE BRANCH ------------------------------------
  const confirmDelete = async () => {
    if (!branchToDelete) return;
    setDeleting(true);

    try {
      const accessToken = Cookies.get("accessToken");
      await axios.delete(
        `${BASE_URL}/business-owner/branchs/${branchToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      toast.success("Branch deleted successfully");
      setShowDeleteModal(false);
      setBranchToDelete(null);
      fetchBranches(); // Refresh list
    } catch (error) {
      console.error("Failed to delete branch", error);
      toast.error("Failed to delete branch");
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteClick = (branch) => {
    setBranchToDelete(branch);
    setShowDeleteModal(true);
  };

  // TABLE HEADS
  const TableHeads = [
    { Title: "Branch Name", key: "branch", width: "20%" },
    { Title: "Branch Location", key: "location", width: "20%" },
    { Title: "Number of Staff", key: "staffs", width: "20%" },
    { Title: "Manager Name", key: "manager", width: "20%" },
    {
      Title: "Action",
      key: "action",
      width: "20%",
      render: (row) => (
        <div className="flex justify-center gap-4">
          <Link
            href={`/businessowner/branch/list/edit/${row.id}`}
            className="text-blue-500 hover:text-blue-700 transition-colors"
            title="Edit"
          >
            <FaEdit size={24} />
          </Link>
          <button
            onClick={() => handleDeleteClick(row)}
            className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
            title="Delete"
          >
            <RiDeleteBin6Line size={24} />
          </button>
        </div>
      ),
    },
  ];

  // PAGINATION ---------------------------------------
  const itemsPerPage = 10;
  const totalPages = Math.ceil(branches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = branches.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="relative">
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
        <p className="text-center font-inter text-xl mt-10">
          Loading branches...
        </p>
      ) : (
        <div className="overflow-auto">
          <Table TableHeads={TableHeads} TableRows={currentItems} />
        </div>
      )}

      {branches.length > itemsPerPage && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* CUSTOM DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-black rounded-3xl p-10 text-center">
            <h2 className="text-xl font-semibold text-[#F44336] mb-5">
              Delete
            </h2>
            <p className="text-white mb-8">Are you sure you want to delete?</p>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="border border-[#7AA3CC] text-white px-10 py-2 rounded-2xl"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-[#F44336] text-white px-10 py-2 rounded-2xl"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchList;
