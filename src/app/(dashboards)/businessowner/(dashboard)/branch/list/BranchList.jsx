"use client"
import Bredcumb from '@/src/components/Bredcumb'
import Pagination from '@/src/components/Pagination';
import Table from '@/src/components/Table';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa';

const BranchList = () => {
    const [baseOnTitle, setBaseOnTitle] = useState([]);
          const [currentPage, setCurrentPage] = useState(1);
           const [viewOpen, setViewOpen] = useState(false);
           const [editOpen, setEditOpen] = useState(false);
        
           
        
            const TableHeads = [
            { Title: "Branch Name", key: "branch", width: "10%" },
            { Title: "Branch Location", key: "location", width: "15%" },
            { Title: "Number of Staff", key: "staff", width: "20%" },
            { Title: "Manager Name", key: "manager", width: "15%" },
           
            
          ];
        
          const TableRows = [
            {
              branch: "Coffee Shop",
              location: "Dhaka,Bangladesh",
              staff: "50",
              manager: "Jane D.",
             
              
              
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
      <Bredcumb/>

        <Link href='/businessowner/branch/add' className="flex justify-end ">
      <button className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl  font-inter py-3 px-5 rounded-lg cursor-pointer  flex items-center gap-2">
        <FaPlus/>
           Add New Branch
          </button>
          </Link>

      <Table TableHeads={TableHeads} TableRows={currentItems}/>

      

       <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      

    </div>
  )
}

export default BranchList
