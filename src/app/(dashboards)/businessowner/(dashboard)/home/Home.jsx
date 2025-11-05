import Image from 'next/image';
import React from 'react'
import { FaUsers } from 'react-icons/fa';
import tenants from "@/public/TenantIcon.png";
import visit from "@/public/VisitIcon.png";
import staff from "@/public/Staff.png";
import reward from "@/public/reward.png";


import TenantsGrowthChart from '@/src/components/TenantsGrowthChart';
import SupportTicketChart from '@/src/components/SupportTicketChart';


const Home = () => {
 
  return (
    <div className='grid grid-cols-8 gap-10'>

      <div className='bg-[#F9F9F9] rounded-2xl col-span-2 p-5 flex flex-col items-center gap-2'>
         
            <Image src={tenants} alt='user'/>
          <p className="font-inter text-[#121212]">
            Total Customers
          </p>
          <p className="font-inter font-semibold text-[#121212]">
            324
          </p>
      </div>
     <div className='bg-[#F9F9F9] rounded-2xl col-span-2 p-5 flex flex-col items-center gap-2'>
          <Image src={staff} alt='ticket'/>
          <p className="font-inter text-[#121212]">
            Total Staff
          </p>
          <p className="font-inter font-semibold text-[#121212]">
            324
          </p>
      </div>
      <div className='bg-[#F9F9F9] rounded-2xl col-span-2 p-5 flex flex-col items-center gap-2'>
         <Image src={reward} alt='ticket'/>
          <p className="font-inter text-[#121212]">
            Reward Redeem
          </p>
          <p className="font-inter font-semibold text-[#121212]">
            324
          </p>
      </div>
      <div className='bg-[#F9F9F9] rounded-2xl col-span-2 p-5 flex flex-col items-center gap-2'>
        <Image src={visit} alt='bill'/>
          <p className="font-inter text-[#121212]">
            Total visit this month
          </p>
          <p className="font-inter font-semibold text-[#121212]">
            324
          </p>
      </div>


      


      <div className=' rounded-2xl col-span-8'>
        <h2 className="text-2xl mb-4 font-inter font-medium ">Customer Visit & Reward Redeemptions</h2>
        <TenantsGrowthChart/>
      </div>
      
    </div>
  )
}

export default Home
