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
      await axios.delete(`${BASE_URL}/business-owner/branchs/${branchToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
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
            <FaEdit size={20} />
          </Link>
          <button
            onClick={() => handleDeleteClick(row)}
            className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
            title="Delete"
          >
            <FaTrash size={20} />
          </button>
        </div>
      ),
    },
  ];

  // PAGINATION ---------------------------------------
  const itemsPerPage = 10;
  const totalPages = Math.ceil(branches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = branches.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
        <p className="text-center font-inter text-xl mt-10">Loading branches...</p>
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-white dark:bg-[#1A1A1A] p-10 rounded-3xl shadow-2xl max-w-lg w-full mx-4 border border-red-500/20">
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaTrash className="text-red-600 dark:text-red-400 w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold font-inter text-gray-900 dark:text-white mb-4">Confirm Deletion</h3>
              <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 font-inter">
                Are you sure you want to delete <span className="font-bold text-gray-900 dark:text-white">"{branchToDelete?.branch}"</span>? This action cannot be undone.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-8 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="px-8 py-3 rounded-xl bg-red-600 text-white text-xl font-medium hover:bg-red-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-500/30"
                >
                  {deleting ? "Deleting..." : "Confirm Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchList;
