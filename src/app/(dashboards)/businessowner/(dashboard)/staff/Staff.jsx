"use client";
import Dropdown from "@/src/components/Dropdown";
import Pagination from "@/src/components/Pagination";
import Table from "@/src/components/Table";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";

const Staff = () => {
  const [staffs, setStaffs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchText, setSearchText] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All");

  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  /* ================= TABLE HEADS ================= */
  const TableHeads = [
    { Title: "Staff Name", key: "name", width: "15%" },
    { Title: "Email", key: "email", width: "20%" },
    { Title: "Branch", key: "branch", width: "15%" },
    { Title: "Role", key: "role", width: "10%" },
    { Title: "Status", key: "status", width: "10%" },
    { Title: "Action", key: "action", width: "20%" },
  ];

  /* ================= FETCH STAFF ================= */
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const token = Cookies.get("accessToken");
        if (!token) return;

        const res = await fetch(
          `${BASE_URL}/business-owner/manage-staff/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const json = await res.json();
        if (!res.ok) throw new Error(json.message);

        const formatted = json.data.map((item) => ({
          id: item.id,
          name: item.user?.name,
          email: item.user?.email,
          branch: item.branch?.name,
          role: item.role,
          status: item.user?.status,
          raw: item,
        }));

        setStaffs(formatted);
      } catch (err) {
        console.error("Staff fetch error:", err);
      }
    };

    fetchStaff();
  }, []);

  /* ================= DELETE STAFF ================= */
  const handleDeleteStaff = async () => {
    try {
      if (!selectedStaff?.id) return;

      const token = Cookies.get("accessToken");
      if (!token) return;

      const res = await fetch(
        `${BASE_URL}/business-owner/manage-staff/${selectedStaff.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      // ✅ remove from UI
      setStaffs((prev) =>
        prev.filter((staff) => staff.id !== selectedStaff.id)
      );

      setDeleteOpen(false);
      setViewOpen(false);
      setSelectedStaff(null);
    } catch (error) {
      console.error("Delete staff failed:", error);
      alert("Failed to delete staff");
    }
  };

  /* ================= FILTER + SEARCH ================= */
  const filteredStaffs = useMemo(() => {
    let data = [...staffs];

    if (selectedBranch !== "All") {
      data = data.filter((s) => s.branch === selectedBranch);
    }

    if (searchText.trim()) {
      const text = searchText.toLowerCase();
      data = data.filter(
        (s) =>
          s.name?.toLowerCase().includes(text) ||
          s.email?.toLowerCase().includes(text) ||
          s.branch?.toLowerCase().includes(text)
      );
    }

    return data;
  }, [staffs, selectedBranch, searchText]);

  /* ================= PAGINATION ================= */
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredStaffs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentItems = filteredStaffs
    .slice(startIndex, startIndex + itemsPerPage)
    .map((row) => ({
      ...row,
      action: (
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => {
              setSelectedStaff(row.raw);
              setViewOpen(true);
            }}
            className="bg-[#7AA3CC] font-inter font-medium py-2 px-11 rounded-full text-[#121212] hover:bg-[#7AA3CC]/80 transition-all"
          >
            View
          </button>

          <RiDeleteBin6Line
            onClick={() => {
              setSelectedStaff(row.raw);
              setDeleteOpen(true);
            }}
            className="text-[#F44336] w-8 h-8 cursor-pointer"
          />
        </div>
      ),
    }));

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, selectedBranch]);

  /* ================= UNIQUE BRANCH LIST ================= */
  const branchOptions = [
    "All",
    ...new Set(staffs.map((s) => s.branch).filter(Boolean)),
  ];

  /* ================= UI ================= */
  return (
    <div>
      {/* ===== TOP BAR ===== */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-40 mt-10">
        <Dropdown
          placeholder="All"
          options={branchOptions}
          onSelect={(value) => setSelectedBranch(value)}
          inputClass="font-inter border border-[#7AA3CC] py-3 px-3.5 rounded-2xl"
        />

        <div className="relative">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border outline-none border-[#000000] py-3.5 px-12 w-full md:w-[462px] rounded-[15px] font-inter"
            placeholder="Search staff"
          />
          <FaSearch className="absolute top-1/2 left-6 -translate-y-1/2 text-[#7AA3CC]" />
        </div>

        <Link href="/businessowner/staff/addStaff">
          <button className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl font-inter py-3 px-5 rounded-lg flex items-center gap-2">
            <FaPlus /> Add New Staff
          </button>
        </Link>
      </div>

      {/* ===== TABLE ===== */}
      <div className="overflow-auto mt-6">
        <Table TableHeads={TableHeads} TableRows={currentItems} />
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* ===== VIEW MODAL ===== */}
      {viewOpen && selectedStaff && (
        <Modal onClose={() => setViewOpen(false)} title="Staff Information">
          <Info label="Staff Name" value={selectedStaff.user.name} />
          <Info label="Email" value={selectedStaff.user.email} />
          <Info label="Branch" value={selectedStaff.branch.name} />
          <Info label="Role" value={selectedStaff.role} />
          <Info label="Status" value={selectedStaff.user.status} />
        </Modal>
      )}

      {/* ===== DELETE MODAL ===== */}
      {deleteOpen && (
        <ConfirmModal
          onCancel={() => setDeleteOpen(false)}
          onConfirm={handleDeleteStaff}
        />
      )}
    </div>
  );
};

export default Staff;

/* ================= SMALL COMPONENTS ================= */

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-3xl p-10 w-[90%] md:w-[50%]">
      <div className="flex justify-between mb-6">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <FiX onClick={onClose} className="w-6 h-6 cursor-pointer" />
      </div>
      <div className="space-y-4 text-xl">{children}</div>
    </div>
  </div>
);

const Info = ({ label, value }) => (
  <div className="flex justify-between border-b py-3">
    <span className="font-medium">{label}:</span>
    <span>{value}</span>
  </div>
);

const ConfirmModal = ({ onCancel, onConfirm }) => (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-black rounded-3xl p-10 text-center">
      <h2 className="text-xl font-semibold text-[#F44336] mb-5">
        Delete
      </h2>
      <p className="text-white mb-8">
        Are you sure you want to delete?
      </p>
      <div className="flex justify-center gap-6">
        <button
          onClick={onCancel}
          className="border border-[#7AA3CC] text-white px-10 py-2 rounded-2xl"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-[#F44336] text-white px-10 py-2 rounded-2xl"
        >
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
);
