import Image from 'next/image';
import React from 'react'
import { FaUsers } from 'react-icons/fa';
import tenants from "@/public/TenantIcon.png";
import visit from "@/public/VisitIcon.png";
import staff from "@/public/Staff.png";
import reward from "@/public/reward.png";


import TenantsGrowthChart from '@/src/components/TenantsGrowthChart';
import SupportTicketChart from '@/src/components/SupportTicketChart';
import CustomerVisitChart from '@/src/components/CustomerVisitChart';
import ProgressBar from '@/src/components/ProgressBar';
import StatusProgressChart from '@/src/components/StatusProgressChart';


const Home = () => {
  const data = [
  { title: "Free Coffee", claims: 820, unit: "Claims" },
  { title: "10% Off", claims: 650 },
  { title: "Bonus Point", claims: 350 },
];

const statusData = [
  { title: "Claimed", value: 95},
  { title: "Expired", value: 95 },
  { title: "Pending", value: 30},
];
 
  return (
    <div className='grid grid-cols-12 md:gap-10 gap-5'>

      <div className='bg-[#F9F9F9] dark:bg-transparent rounded-2xl col-span-6 md:col-span-3 p-5 flex flex-col items-center gap-2 dark:border dark:border-white'>
         
            <Image src={tenants} alt='user' className='dark:invert'/>
          <p className="font-inter text-[#121212] dark:text-white">
            Total Customers
          </p>
          <p className="font-inter font-semibold text-[#121212] dark:text-white">
            324
          </p>
      </div>
     <div className='bg-[#F9F9F9] dark:bg-transparent dark:border dark:border-white rounded-2xl col-span-6 md:col-span-3 p-5 flex flex-col items-center gap-2'>
          <Image src={staff} alt='ticket ' className='dark:invert'/>
          <p className="font-inter text-[#121212] dark:text-white">
            Total Staff
          </p>
          <p className="font-inter font-semibold text-[#121212] dark:text-white">
            324
          </p>
      </div>
      <div className='bg-[#F9F9F9] dark:bg-transparent dark:border dark:border-white rounded-2xl col-span-6 md:col-span-3 p-5 flex flex-col items-center gap-2'>
         <Image src={reward} alt='ticket' className='dark:invert'/>
          <p className="font-inter text-[#121212] dark:text-white">
            Reward Redeem
          </p>
          <p className="font-inter font-semibold text-[#121212] dark:text-white">
            324
          </p>
      </div>
      <div className='bg-[#F9F9F9] dark:bg-transparent dark:border dark:border-white rounded-2xl col-span-6 md:col-span-3 p-5 flex flex-col items-center gap-2'>
        <Image src={visit} alt='bill' className='dark:invert'/>
          <p className="font-inter text-[#121212] dark:text-white">
            Total visit this month
          </p>
          <p className="font-inter font-semibold text-[#121212] dark:text-white">
            324
          </p>
      </div>


      


      <div className=' rounded-2xl col-span-12'>
        <h2 className="text-2xl mb-4 font-inter font-medium dark:text-white ">Customer Visit & Reward Redeemptions</h2>
        <CustomerVisitChart/>
      </div>

      <div className=' col-span-12 md:col-span-6'>
        <h3 className="font-medium text-2xl mb-6 font-inter dark:text-white">
        Top Performing Chart
      </h3>
<ProgressBar data={data}/>
      </div>

      <div className=' col-span-12  md:col-span-6'>
        <h3 className="font-medium text-2xl mb-6 font-inter dark:text-white">
       Redeemption Breakdown
      </h3>
<StatusProgressChart data={statusData} />
      </div>
      
    </div>
  )
}

export default Home
