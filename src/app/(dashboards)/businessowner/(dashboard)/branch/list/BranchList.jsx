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
import { MdQrCode } from "react-icons/md";

const BranchList = () => {
  const [branches, setBranches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Modal States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // QR Modal
  const [qrModal, setQrModal] = useState({ open: false, url: "", name: "" });
  const [downloading, setDownloading] = useState(false);

  // DOWNLOAD QR AS BLOB (fixes cross-origin) ----------
  const downloadQr = async (url, name) => {
    try {
      setDownloading(true);
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${name}-qr.png`;
      link.click();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      toast.error("Failed to download QR code");
    } finally {
      setDownloading(false);
    }
  };

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
          qrCodeUrl: item.branchQrCodeUrl || null,
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
    { Title: "Branch Name", key: "branch", width: "18%" },
    { Title: "Branch Location", key: "location", width: "18%" },
    { Title: "Number of Staff", key: "staffs", width: "15%" },
    { Title: "Manager Name", key: "manager", width: "18%" },
    {
      Title: "QR Code",
      key: "qrCode",
      width: "15%",
      render: (row) => (
        <div className="flex justify-center">
          <button
            onClick={() =>
              setQrModal({ open: true, url: row.qrCodeUrl, name: row.branch })
            }
            className="flex items-center gap-1 border border-[#7AA3CC] text-[#005FA8]
              dark:text-[#7AA3CC] font-inter text-sm font-semibold
              px-4 py-1.5 rounded-lg hover:bg-[#7AA3CC]/10 transition-colors"
          >
            <MdQrCode size={16} />
            View
          </button>
        </div>
      ),
    },
    {
      Title: "Action",
      key: "action",
      width: "16%",
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

      {/* QR CODE MODAL */}
      {qrModal.open && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setQrModal({ open: false, url: "", name: "" })}
        >
          <div
            className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-10 text-center shadow-2xl max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold dark:text-white mb-2 font-inter">
              {qrModal.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-inter mb-6">
              Branch QR Code
            </p>

            {qrModal.url ? (
              <img
                src={qrModal.url}
                alt="Branch QR Code"
                className="w-56 h-56 mx-auto object-contain"
              />
            ) : (
              <div className="w-56 h-56 mx-auto flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
                <p className="text-gray-400 dark:text-gray-500 font-inter text-sm">
                  QR Code not available
                </p>
              </div>
            )}

            {qrModal.url && (
              <button
                onClick={() => downloadQr(qrModal.url, qrModal.name)}
                disabled={downloading}
                className="mt-6 inline-block bg-[#7AA3CC] text-[#010101]
                  font-semibold font-inter py-2 px-8 rounded-lg text-sm
                  disabled:opacity-60 cursor-pointer"
              >
                {downloading ? "Downloading..." : "Download"}
              </button>
            )}

            <button
              onClick={() => setQrModal({ open: false, url: "", name: "" })}
              className="mt-4 block mx-auto text-sm text-gray-400 dark:text-gray-500
                hover:text-gray-600 font-inter"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchList;
