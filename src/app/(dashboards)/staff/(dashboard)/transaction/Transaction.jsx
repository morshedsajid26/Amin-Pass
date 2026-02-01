"use client";

import Bredcumb from "@/src/components/Bredcumb";
import Pagination from "@/src/components/Pagination";
import Table from "@/src/components/Table";
import React, { useEffect, useState } from "react";
import { FaUndoAlt } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [viewOpen, setViewOpen] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [undoReason, setUndoReason] = useState("");

  const itemsPerPage = 10;

  /* ================= TABLE HEADS ================= */
  const TableHeads = [
    { Title: "Date", key: "date", width: "15%" },
    { Title: "Type", key: "type", width: "15%" },
    { Title: "Customer Name", key: "name", width: "25%" },
    { Title: "Points", key: "points", width: "15%" },
    { Title: "Status", key: "status", width: "15%" },
    { Title: "Action", key: "action", width: "15%" },
  ];

  /* ================= FETCH TRANSACTIONS ================= */
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = Cookies.get("token");
        const branchId = localStorage.getItem("branchId");

        if (!token || !branchId) return;

        const res = await fetch(
          `${BASE_URL}/staff/transactions?branchId=${branchId}&page=${currentPage}&limit=${itemsPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const json = await res.json();
        if (!res.ok) throw new Error(json.message);

        // 🔽 adjust based on backend response
        const rows = json.data?.transactions || [];
        const meta = json.data?.meta;

        const formatted = rows.map((item) => ({
          date: item.createdAt?.slice(0, 10),
          type: item.type,
          name: item.customerName,
          points: item.points > 0 ? `+${item.points}` : item.points,
          status: item.status,
          action: (
            <button
              onClick={() => {
                setSelectedTxn(item);
                setViewOpen(true);
              }}
              className="border border-[#7AA3CC] rounded-lg font-inter font-medium
              py-1.5 px-4 flex items-center gap-2 cursor-pointer"
            >
              <FaUndoAlt />
              Undo
            </button>
          ),
        }));

        setTransactions(formatted);
        setTotalPages(meta?.totalPages || 1);
      } catch (err) {
        console.error("Transaction fetch error:", err);
      }
    };

    fetchTransactions();
  }, [currentPage]);

  /* ================= HANDLE UNDO ================= */
  const handleUndoSubmit = async () => {
    if (!undoReason.trim()) return alert("Please enter reason");

    try {
      const token = Cookies.get("token");
      if (!token || !selectedTxn) return;

      // 🔧 future API call here
      console.log("UNDO TXN:", selectedTxn.id, undoReason);

      setViewOpen(false);
      setUndoReason("");
      setSelectedTxn(null);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= UI ================= */
  return (
    <div>
      <Bredcumb />

      <div className="overflow-auto">
        <Table TableHeads={TableHeads} TableRows={transactions} />
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* ================= UNDO MODAL ================= */}
      {viewOpen && (
        <div className="fixed inset-0 bg-[#D9D9D9]/80 flex items-center justify-center z-50">
          <div className="bg-[#EFEFEF] rounded-3xl pt-10 pb-10 px-10 w-[90%] md:w-[40%]">
            <div className="flex justify-end">
              <FiX
                onClick={() => setViewOpen(false)}
                className="w-7 h-7 mb-5 cursor-pointer"
              />
            </div>

            <p className="font-inter text-2xl mb-4">
              Reason for Undo
            </p>

            <textarea
              value={undoReason}
              onChange={(e) => setUndoReason(e.target.value)}
              className="w-full bg-[#DFDFDF] resize-none outline-none
              h-[120px] rounded-2xl p-3 font-inter"
            />

            <div className="text-center mt-8">
              <button
                onClick={handleUndoSubmit}
                className="py-3 px-15 font-inter font-bold
                text-2xl bg-[#7AA3CC] rounded-lg cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
