"use client"
import Pagination from '@/src/components/Pagination';
import Table from '@/src/components/Table';
import React, { useEffect, useState } from 'react'

const History = () => {
     const [baseOnTitle, setBaseOnTitle] = useState([]);
          const [currentPage, setCurrentPage] = useState(1);
          
    
     const TableHeads = [
         { Title: "Invoice", key: "invoice", width: "20%" },
        { Title: "Date", key: "date", width: "15%" },
        { Title: "Plan", key: "plan", width: "20%" },
        { Title: "Amount", key: "amount", width: "20%" },
        { Title: "Status", key: "status", width: "20%" },
       
      ];
    
      const TableRows = [
        {
            invoice: "INV-1024",
          date: "25/08/2025",
          plan: "Business",
          amount: "$50",
          status: "Paid",
         
      
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
     <Table TableHeads={TableHeads} TableRows={currentItems} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />


    </div>
  )
}

export default History
