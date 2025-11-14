"use client";
import Bredcumb from '@/src/components/Bredcumb'
import React, { useState } from 'react'

const Permission = () => {
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
          option: "Allow Adding Points to a Customer",        
          example: <Toogle/>,
        },
        {
          option: "Allow Redeeming",        
          example: <Toogle/>,
        },
        {
          option: "Allow Voids",       
          example: <Toogle/>,
        },
        {
          option: "View Customer List",
          example: <Toogle/>,
        },
         {
          option: "Allow Viewing Active Offers",
          example: <Toogle/>,
        }
        , {
          option: "Edit Loyalty Rules or Offers",
          example: <Toogle/>,
        }
  , {
          option: "Add/Remove Other Staff",
          example: <Toogle/>,
        }
  
  
        
       
      ];
    
      
    
      
    
      const totalPages = Math.ceil(baseOnTitle);
      const startIndex = (currentPage - 1);
      const currentItems = baseOnTitle.slice(startIndex, startIndex );
  return (
    <div>
       


        <table className={`w-[50%] border-collapse overflow-hidden `}>
    
      <thead>
        <tr className="">
          {TableHeads.map((head, idx) => (
            <th
              key={idx}
              className={`text-start border-[#000000]/10 font-medium font-inter text-[#000000] dark:text-white  py-[22px]   text-2xl
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
                className="border-t border-b border-[#000000]/10 dark:border-white/10 py-[22px] font-inter text-xl text-[#000000] dark:text-white "
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

export default Permission
