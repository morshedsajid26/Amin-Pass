"use client";
import Dropdown from "@/src/components/Dropdown";
import Pagination from "@/src/components/Pagination";
import Table from "@/src/components/Table";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const Staff = () => {
  const [baseOnTitle, setBaseOnTitle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  let ActionButton = () => {
    return (
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={() => setViewOpen(true)}
          className="bg-[#7AA3CC] font-inter font-medium py-2 px-11 rounded-full text-[#121212] cursor-pointer  hover:bg-[#7AA3CC]/80 transition-all duration-300"
        >
          View
        </button>

        <RiDeleteBin6Line 
          onClick={() => setDeleteOpen(true)}
        className="text-[#F44336] w-8 h-8 " />
      </div>
    );
  };

  const TableHeads = [
    { Title: "Staff Name", key: "name", width: "10%" },
    { Title: "Email", key: "email", width: "15%" },
    { Title: "Branch", key: "branch", width: "10%" },
    { Title: "Role", key: "role", width: "10%" },

    { Title: "Action", key: "action", width: "15%" },
  ];

  const TableRows = [
    {
      name: "James Carter",
      email: "example@gmail.com",
      branch: "Main Branch",
      role: "Manager",

      action: <ActionButton />,
    },
  ];

  useEffect(() => {
    setBaseOnTitle(TableRows);
  }, []);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(baseOnTitle.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = baseOnTitle.slice(startIndex, startIndex + itemsPerPage);
  return (
    <div>
      <div className="flex items-center justify-center gap-40 mt-10">
        <Dropdown
          placeholder="Main Branch"
          options={["1", "2", "3", "4", "5", "6"]}
          className={``}
          inputClass="font-inter   border border-[#7AA3CC] py-3 px-3.5 rounded-2xl"
          icon={``}
        />

        <div className="relative ">
          <input
            type="text"
            className="border outline-none border-[#000000] dark:border-white py-3.5  px-12 w-[462px] rounded-[15px] text-[#000000] dark:placeholder:text-white placeholder:text-[#000000] font-inter"
            placeholder="Search Reward"
          />
          <FaSearch className=" absolute top-1/2 left-6 -translate-y-1/2 text-[#7AA3CC]" />
        </div>
        <Link
          href="/businessowner/staff/addStaff"
          className="flex justify-end "
        >
          <button className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl  font-inter py-3 px-5 rounded-lg cursor-pointer  flex items-center gap-2">
            <FaPlus />
            Add New Staff
          </button>
        </Link>
      </div>

      <Table TableHeads={TableHeads} TableRows={currentItems} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {viewOpen && (
        <div className="fixed inset-0  bg-[#D9D9D9]/80 flex items-center justify-center z-50 ">
          <div className="bg-white dark:bg-[#141414] rounded-4xl py-14 px-14 w-[50%]  ">
            <h3 className="font-inter text-[32px] border-b-2 border-black/70 dark:border-white/70 pb-2 w-[30%] mb-6 dark:text-white">Staff Information</h3>
            <div className=" font-inter text-2xl text-[#000000] dark:text-white  ">
              <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
                <span className="font-medium">Staff Name:</span>
                <span className="font-normal">Jane D.</span>
              </div>

              <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
                <span className="font-medium">Email:</span>
                <span className="font-normal">example@gmail.com</span>
              </div>

              <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
                <span className="font-medium">Branch</span>
                <span className="font-normal">Main Branch</span>
              </div>

              <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
                <span className="font-medium">Role:</span>
                <span className="font-normal">Manager</span>
              </div>

              <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
                <span className="font-medium">Status:</span>
                <span>Suspended</span>
              </div>
            </div>

            <div className="flex justify-center items-center gap-12 mt-15">
              <button 
               onClick={() => setDeleteOpen(true)}
              className="border border-[#7AA3CC] text-[#010101] dark:text-white font-semibold text-xl font-inter py-3  px-20 rounded-lg cursor-pointer mt-12">
                Delete
              </button>
              <button className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl  font-inter py-3 px-20 rounded-lg cursor-pointer mt-12">
                Edit
              </button>
            </div>
          </div>
        </div>
      )}

       {deleteOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#000000] rounded-3xl p-10 w-[30%] relative text-center">
            <button
              onClick={() => setDeleteOpen(false)}
              className="absolute top-4 right-4 text-[#000000]"
            >
              <FiX className="w-6 h-6" />
            </button>

            <h2 className="font-inter text-xl font-semibold text-[#F44336] mb-5">
              Delete
            </h2>
            <p className="text-[#F1F1F1] font-inter mb-8 border-b border-t border-[#7D7B77] py-6">
              Are You sure want to Delete?
              
            </p>

            <div className="flex justify-center gap-6">
              <button
                onClick={() => setDeleteOpen(false)}
                className="border border-[#7AA3CC] text-[#F1F1F1] bg-[#363A43] px-10 py-2 rounded-2xl font-inter font-medium hover:bg-[#7AA3CC]/10 transition-all"
              >
                Cancel
              </button>
              
              <button   
               onClick={() => {
              setDeleteOpen(false);
              setViewOpen(false);
              
            }}      
              className="bg-[#F44336] text-white px-10 py-2 rounded-2xl font-inter font-medium hover:bg-[#d32f2f] transition-all">
                Yes, Delete
              </button>
              

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
