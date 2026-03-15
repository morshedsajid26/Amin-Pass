"use client";
import Pagination from "@/src/components/Pagination";
import Table from "@/src/components/Table";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/src/config/api";
import Cookies from "js-cookie";
import { formatDate } from "@/src/utils/formatDate";
import toast from "react-hot-toast";

const History = () => {
  const [baseOnTitle, setBaseOnTitle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const TableHeads = [
    { Title: "Invoice", key: "invoice", width: "20%" },
    { Title: "Date", key: "date", width: "15%" },
    { Title: "Plan", key: "plan", width: "20%" },
    { Title: "Amount", key: "amount", width: "20%" },
    { Title: "Status", key: "status", width: "20%" },
  ];

  useEffect(() => {
    const fetchBillingHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = Cookies.get("accessToken");
        const response = await axios.get(
          `${BASE_URL}/business-owner/buy-subscription/billing-history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (response.data?.success && Array.isArray(response.data.data)) {
          const formattedData = response.data.data.map((item) => ({
            id: item.id,
            invoice: item.invoiceNo || "N/A",
            date: item.date ? formatDate(item.date) : "N/A",
            plan: item.planName || "N/A",
            amount: item.amount !== null ? `$${item.amount}` : "N/A",
            status: item.status || "N/A",
            // Keep original if needed by Table actions but for standard Table keys above are used
          }));
          setBaseOnTitle(formattedData);
        } else {
          setBaseOnTitle([]);
          setError("Failed to load billing history.");
        }
      } catch (err) {
        toast.error("Error loading billing history.");
      } finally {
        setLoading(false);
      }
    };

    fetchBillingHistory();
  }, []);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(baseOnTitle.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = baseOnTitle.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      {loading ? (
        <div className="py-10 text-center font-inter text-gray-500 dark:text-gray-400">
          Loading billing history...
        </div>
      ) : error ? (
        <div className="py-10 text-center font-inter text-red-500">
          {error}
        </div>
      ) : baseOnTitle.length === 0 ? (
        <div className="py-10 text-center font-inter text-gray-500 dark:text-gray-400">
          No billing history found.
        </div>
      ) : (
        <>
          <div className="overflow-auto">
            <Table TableHeads={TableHeads} TableRows={currentItems} />
          </div>

          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default History;
