import Image from 'next/image';
import React from 'react'
import { FaUsers } from 'react-icons/fa';
import tenants from "@/public/TenantIcon.png";
import bill from "@/public/BillIcon.png";
import ticket from "@/public/TicketIcon.png";
import TenantsGrowthChart from '@/src/components/TenantsGrowthChart';
import SupportTicketChart from '@/src/components/SupportTicketChart';


const Home = () => {
    const TableHeads = [
    { Title: "Merchant", key: "merchant", width: "10%" },
    { Title: "Active Tenants", key: "active_tenants", width: "10%" },
    { Title: "Status", key: "status", width: "10%" },
   
    
  ];

  const TableRows = [
    {
      merchant: "Cafe",
      active_tenants: "50",
      status: "Active",
      
     
    },
    {
      merchant: "Glow Spa",
      active_tenants: "50",
      status: "Active",
      
     
    },
    {
      merchant: "Super Shop",
      active_tenants: "50",
      status: "Active",
      
     
    },
    
   
  ];
  return (
    <div className='grid grid-cols-8 gap-10'>

      <div className='bg-[#F9F9F9] rounded-2xl col-span-2 p-5 flex flex-col items-center gap-2'>
         
            <Image src={tenants} alt='user'/>
          <p className="font-inter text-[#121212]">
            Tenants Register
          </p>
          <p className="font-inter font-semibold text-[#121212]">
            324
          </p>
      </div>
     <div className='bg-[#F9F9F9] rounded-2xl col-span-2 p-5 flex flex-col items-center gap-2'>
         <span className='w-14 h-14 bg-[#4CAF50] rounded-full'></span>
          <p className="font-inter text-[#121212]">
            Tenants Register
          </p>
          <p className="font-inter font-semibold text-[#121212]">
            324
          </p>
      </div>
      <div className='bg-[#F9F9F9] rounded-2xl col-span-2 p-5 flex flex-col items-center gap-2'>
         <Image src={ticket} alt='ticket'/>
          <p className="font-inter text-[#121212]">
            Tenants Register
          </p>
          <p className="font-inter font-semibold text-[#121212]">
            324
          </p>
      </div>
      <div className='bg-[#F9F9F9] rounded-2xl col-span-2 p-5 flex flex-col items-center gap-2'>
        <Image src={bill} alt='bill'/>
          <p className="font-inter text-[#121212]">
            Tenants Register
          </p>
          <p className="font-inter font-semibold text-[#121212]">
            324
          </p>
      </div>


      <div className='bg-[#F9F9F9] rounded-2xl col-span-8 p-5'>
        <table className="w-full  border-collapse bg-[#F9F9F9] rounded-2xl overflow-hidden">
      {/* ==== TABLE HEADER ==== */}
      <thead >
        <tr className="">
          {TableHeads.map((head, idx) => (
            <th
             
              className={`text-center font-medium bg-[#7AA3CC] text-[#000000] py-[22px]   text-2xl
               `}
              style={{ width: head.width }}
            >
              {head.Title}
            </th>
          ))}
        </tr>
      </thead>

      {/* ==== TABLE BODY ==== */}
      <tbody className="">
        {TableRows.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {TableHeads.map((head, headIdx) => (
              <td
                
                className="borde border-[#7AA3CC]/20 py-[22px] text-center px-3 font-inter text-xl text-[#000000]"
              >
               
                {head.render ? head.render(row, rowIdx) : row[head.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
      </div>


      <div className=' rounded-2xl col-span-5'>
        <h2 className="text-2xl mb-4 font-inter font-medium ">Tenants Growth</h2>
        <TenantsGrowthChart/>
      </div>
      <div className=' rounded-2xl col-span-3'>
        <h2 className="text-2xl mb-4 font-inter font-medium ">Support Ticket</h2>
        <SupportTicketChart/>
      </div>
    </div>
  )
}

export default Home
