"use client";
import Bredcumb from '@/src/components/Bredcumb'
import Pagination from '@/src/components/Pagination';
import Table from '@/src/components/Table';
import React, { useEffect, useState } from 'react'
import { FaUndoAlt } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

const Transaction = () => {
  const [baseOnTitle, setBaseOnTitle] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
       const [viewOpen, setViewOpen] = useState(false);
     
const ActionButton = ()=>{
    return(
       <div className='flex justify-center'>  
       <button 
       onClick={() => setViewOpen(true)}
       className='border border-[#7AA3CC] rounded-lg font-inter font-medium py-1.5 px-4 flex items-center gap-2 cursor-pointer'>
        <FaUndoAlt/>
        Undo
       </button>

       </div>
    )
}
    
      const TableHeads = [
          { Title: "Date", key: "date", width: "15%" },
          { Title: "Type", key: "type", width: "15%" },
        { Title: "Customer Name", key: "name", width: "25%" },
        { Title: "Points", key: "points", width: "15%" },
         { Title: "Status", key: "status", width: "15%" },
          { Title: "Action", key: "action", width: "15%" },
        
        
      ];
    
      const TableRows = [
        {
            date: "10/09/2025",
            type: "earn",
            name: "James Carter",
          points: "+20",
          status: "Completed",
          action: <ActionButton/>,
        },
        {
            date: "10/09/2025",
            type: "earn",
            name: "James Carter",
          points: "+20",
          status: "Completed",
          action: <ActionButton/>,
        },
        {
            date: "10/09/2025",
            type: "earn",
            name: "James Carter",
          points: "+20",
          status: "Completed",
          action: <ActionButton/>,
        },
        {
            date: "10/09/2025",
            type: "earn",
            name: "James Carter",
          points: "+20",
          status: "Completed",
          action: <ActionButton/>,
        },
        {
            date: "10/09/2025",
            type: "earn",
            name: "James Carter",
          points: "+20",
          status: "Completed",
          action: <ActionButton/>,
        },
        {
            date: "10/09/2025",
            type: "earn",
            name: "James Carter",
          points: "+20",
          status: "Completed",
          action: <ActionButton/>,
        },
        {
            date: "10/09/2025",
            type: "earn",
            name: "James Carter",
          points: "+20",
          status: "Completed",
          action: <ActionButton/>,
        },
        {
            date: "10/09/2025",
            type: "earn",
            name: "James Carter",
          points: "+20",
          status: "Completed",
          action: <ActionButton/>,
        },
        {
            date: "10/09/2025",
            type: "earn",
            name: "James Carter",
          points: "+20",
          status: "Completed",
          action: <ActionButton/>,
        },
        {
            date: "10/09/2025",
            type: "earn",
            name: "James Carter",
          points: "+20",
          status: "Completed",
          action: <ActionButton/>,
        },
        {
            date: "10/09/2025",
            type: "earn",
            name: "James Carter",
          points: "+20",
          status: "Completed",
          action: <ActionButton/>,
        },
        {
            date: "10/09/2025",
            type: "earn",
            name: "James Carter",
          points: "+20",
          status: "Completed",
          action: <ActionButton/>,
        },
        {
            date: "10/09/2025",
            type: "earn",
            name: "James Carter",
          points: "+20",
          status: "Completed",
          action: <ActionButton/>,
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

  
      <div className=''>
      <Table TableHeads={TableHeads} TableRows={currentItems} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />


    </div>


      {viewOpen && (
        <div className="fixed inset-0  bg-[#D9D9D9]/80 flex items-center justify-center z-50 ">
          <div className="bg-[#EFEFEF] rounded-3xl  pt-10 pb-10 px-10 w-[40%]">
           
            <div className="flex justify-end">
            <FiX 
            onClick={() => setViewOpen(false)}
            className="w-7 h-7 mb-5 cursor-pointer " />
            </div>

           <p className='font-inter text-2xl mb-4'>
            Reason for Undo
           </p>

           <div className='pr-15'>
           
            <textarea  className='w-full bg-[#DFDFDF] resize-none outline-none h-[120px] rounded-2xl p-3 font-inter' name="" id=""></textarea>


            <div className='text-center mt-8 '>
                <button 
                onClick={() => setViewOpen(false)}
                className='py-3 px-15 font-inet font-bold text-2xl bg-[#7AA3CC] rounded-lg cursor-pointer'>Submit</button>
            </div>
           </div>
            
          </div>
        </div>
      )}


    </div>
  )
}

export default Transaction
