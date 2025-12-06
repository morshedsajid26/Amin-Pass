"use client";

import React, { useEffect, useState } from "react";
import Bredcumb from "@/src/components/Bredcumb";
import Dropdown from "@/src/components/Dropdown";
import Pagination from "@/src/components/Pagination";
import Table from "@/src/components/Table";
import Link from "next/link";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import Avatar from "@/public/Avatar.png";
import Cookies from "js-cookie";

const Management = () => {
  const [tenants, setTenants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Modal controls
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);

  // Fetch Tenants -----------------------------------
  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const token = Cookies.get("token");

        const res = await fetch("http://127.0.0.1:8000/api/admin/get-all-tenants", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

        const data = await res.json();

        if (res.ok) {
          const formatted = data.tenants.map((item) => ({
            id: item.id,
            name: item.business?.name || "N/A",
            email: item.business?.email || "N/A",
            date: item.created_at?.slice(0, 10) || "N/A",
            subscription: item.business?.status || "pending",
            location: "1 Location",
            raw: item, // full data for modal
          }));

          setTenants(formatted);
        } else {
          console.log("Error:", data.message);
        }
      } catch (error) {
        console.log("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);

  // TABLE HEADS --------------------------------------
  const TableHeads = [
    { Title: "Name", key: "name", width: "10%" },
    { Title: "Email", key: "email", width: "15%" },
    { Title: "Created On", key: "date", width: "10%" },
    { Title: "Subscription", key: "subscription", width: "15%" },
    { Title: "Location", key: "location", width: "10%" },
    { Title: "Action", key: "action", width: "10%" },
  ];

  // Action Button -------------------------------------
  const ActionButton = ({ tenant }) => (
    <button
      onClick={() => {
        setSelectedTenant(tenant);
        setViewOpen(true);
      }}
      className="bg-[#7AA3CC] font-inter font-medium py-2 px-11 rounded-full text-[#121212] cursor-pointer hover:bg-[#7AA3CC]/80 transition-all duration-300"
    >
      View
    </button>
  );

  // Pagination ----------------------------------------
  const itemsPerPage = 10;
  const totalPages = Math.ceil(tenants.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = tenants.slice(startIdx, startIdx + itemsPerPage);

  const tableRows = currentItems.map((row) => ({
    ...row,
    action: <ActionButton tenant={row.raw} />,
  }));

  // DETAILS COMPONENT ---------------------------------
  const Details = ({ data }) => {
    const detailItems = [
      ["Business Name:", data.business?.name || "-"],
      ["Industry Type:", data.business?.slug || "-"],
      ["Registration Date:", data.created_at?.slice(0, 10) || "-"],
      ["Total Branch:", "1"],
      ["Plan Type:", data.business?.status || "-"],
      ["Billing Status:", data.business?.status || "-"],
      ["Domain:", data.domain || "-"],
      ["Database:", data.database || "-"],
    ];

    return (
      <div className="bg-[#FFFFFF] rounded-3xl p-4 font-inter text-2xl text-[#000000] space-y-4">
        {detailItems.map(([label, value], index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-[#000000]/10 pb-4"
          >
            <span className="font-medium">{label}</span>
            <span className="font-normal">{value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Bredcumb />

      {/* TOP BAR ------------------------------------------------- */}
      <div className="flex items-center justify-between">
        <Dropdown
          placeholder="Active"
          className="w-[10%] border border-[#D4AF37] rounded-xl p-2 font-inter font-medium"
          options={["Active", "Inactive"]}
        />

        <Link href="/systemowner/tenante/management/addtenant">
          <button className="bg-[#7AA3CC] font-medium font-inter px-2 py-3 rounded-md text-[#000000] flex items-center gap-2 cursor-pointer">
            <FaPlus className="w-6 h-6" /> Add New Tenants
          </button>
        </Link>
      </div>

      {/* TABLE + PAGINATION ------------------------------------- */}
      {loading ? (
        <p className="text-xl font-inter py-10 text-center">
          Loading tenants...
        </p>
      ) : (
        <>
          <Table TableHeads={TableHeads} TableRows={tableRows} />

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}

      {/* VIEW MODAL --------------------------------------------- */}
      {viewOpen && selectedTenant && (
        <div className="fixed inset-0 bg-[#D9D9D9]/80 flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-[#A8C4D8] to-[#E4DBC2] rounded-3xl w-[50%] max-h-[85vh] flex flex-col gap-y-10 overflow-hidden">
            <div className="overflow-y-auto hide-scrollbar flex flex-col gap-y-10">
              
              {/* PERSONAL INFO */}
              <div className="bg-[#FFFFFF] rounded-3xl p-4">
                <div className="flex justify-end">
                  <FiX
                    onClick={() => setViewOpen(false)}
                    className="w-7 h-7 mb-5 cursor-pointer"
                  />
                </div>

                <div className="flex items-center gap-3 pb-3 mb-3">
                  <Image
                    src={Avatar}
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <h2 className="font-inter text-2xl font-medium text-[#000000]">
                      {selectedTenant.business?.name}
                    </h2>
                    <p className="text-xl text-[#000000]">
                      {selectedTenant.business?.email}
                    </p>
                  </div>
                </div>

                <div className="font-inter text-2xl text-[#000000]">
                  <div className="flex justify-between border-b border-[#000000]/10 py-4">
                    <span className="font-medium">Address:</span>
                    <span className="font-normal">
                      {selectedTenant.business?.address || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between py-4">
                    <span className="font-medium">Phone Number:</span>
                    <span className="font-normal">
                      {selectedTenant.business?.phone || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* BUSINESS DETAILS */}
              <Details data={selectedTenant} />

              {/* EDIT BUTTON */}
              <div className="flex justify-center mt-10 pb-5">
                <Link href="/systemowner/tenante/management/addtenant">
                  <button className="bg-[#7AA3CC] font-bold font-inter px-20 py-3 rounded-md text-[#000000] cursor-pointer">
                    Edit
                  </button>
                </Link>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Management;
