"use client";
import Bredcumb from '@/src/components/Bredcumb'
import React, { useState } from 'react'

const Control = () => {
    const [baseOnTitle, setBaseOnTitle] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      
    const Toogle = ()=> {
      return(
  
        <div>
  <input type="checkbox" defaultChecked className=" toggle 
      toggle-white 
      !bg-[#020202] 
      checked:!bg-[#7F56D9]
      checked:!border-[#7F56D9]
      " />
        </div>
      )
    }
      const TableHeads = [
        { Title: "Option", key: "option", width: "10%" },
        { Title: "Example", key: "example", width: "10%" },
       
      ];
    
      const TableRows = [
        {
          option: "Program & Reward Control",        
          example: <Toogle/>,
        },
        {
          option: "Customer Management",        
          example: <Toogle/>,
        },
        {
          option: "Edit Global Branding",       
          example: <Toogle/>,
        },
        {
          option: "Employee Control",
          example: <Toogle/>,
        },
         {
          option: "Maintenance Mode",
          example: <Toogle/>,
        }
  
        
       
      ];
    
      
    
      
    
      const totalPages = Math.ceil(baseOnTitle);
      const startIndex = (currentPage - 1);
      const currentItems = baseOnTitle.slice(startIndex, startIndex );
  return (
    <div>
        <Bredcumb/>

<div className='border-b border-black/20'>

        <h3 className='py-2 px-2 font-inter  flex items-center gap-4 cursor-pointer  transition-all duration-200 text-xl border-b-2 md:w-[13%]'>
          Tenants Permission
        </h3>
</div>


        <table className={`md:w-[50%] w-full border-collapse overflow-hidden `}>
    
      <thead>
        <tr className="">
          {TableHeads.map((head, idx) => (
            <th
              key={idx}
              className={`text-start border-[#000000]/10 font-medium font-inter text-[#000000] py-[22px]   text-2xl
                 `}
              
            >
              {head.Title}
            </th>
          ))}
        </tr>
      </thead>

      
      <tbody className="">
        {TableRows.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {TableHeads.map((head, headIdx) => (
              <td
                key={headIdx}
                className="border-t border-b border-[#000000]/10 py-[22px] font-inter text-xl text-[#000000]"
              >
                
                {head.render ? head.render(row, rowIdx) : row[head.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
      
    </div>
  )
}

export default Control
