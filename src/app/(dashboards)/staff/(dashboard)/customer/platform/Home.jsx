"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { FaUsers } from 'react-icons/fa';
import tenants from "@/public/TenantIcon.png";
import visit from "@/public/VisitIcon.png";
import ticket from "@/public/TicketIcon.png";
import TenantsGrowthChart from '@/src/components/TenantsGrowthChart';
import SupportTicketChart from '@/src/components/SupportTicketChart';
import Bredcumb from '@/src/components/Bredcumb';
import Table from '@/src/components/Table';
import Pagination from '@/src/components/Pagination';


const Home = () => {
     const [baseOnTitle, setBaseOnTitle] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
     

    
      const TableHeads = [
        { Title: "Customer Name", key: "name", width: "10%" },
        { Title: "Customer Email", key: "email", width: "10%" },
        { Title: "Reward Point", key: "point", width: "10%" },
        { Title: "Last Visit", key: "date", width: "10%" },
        
        
      ];
    
      const TableRows = [
        {
          name: "James Carter",
          email: "example@gmail.com",
          point: "250",
          date: "10/09/2025",
      
         
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

    <div className='grid grid-cols-12 gap-10'>


      <div className='bg-[#F9F9F9] rounded-2xl col-span-12 md:col-span-3 p-5 flex flex-col items-center gap-2'>
         
            <Image src={tenants} alt='user'/>
          <p className="font-inter text-[#121212]">
      Total Customers
          </p>
          <p className="font-inter font-semibold text-[#121212]">
            324
          </p>
      </div>
     <div className='bg-[#F9F9F9] rounded-2xl col-span-12 md:col-span-3 p-5 flex flex-col items-center gap-2'>
          <Image src={visit} alt='user'/>
          <p className="font-inter text-[#121212]">
            Total visit this month
          </p>
          <p className="font-inter font-semibold text-[#121212]">
            32
          </p>
      </div>


      <div className='col-span-12'>
      <div className='overflow-auto'>
        <Table TableHeads={TableHeads} TableRows={currentItems} />
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      </div>
      


      


    </div>
    </div>
  )
}

export default Home
