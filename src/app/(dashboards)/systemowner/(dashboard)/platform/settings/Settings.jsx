"use client"

import React, { useState } from 'react'

const Settings = () => {

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
      { Title: "Channel", key: "channel", width: "10%" },
      { Title: "Example", key: "example", width: "10%" },
     
    ];
  
    const TableRows = [
      {
        option: "James Carter",
        channel: "Email,In App",
        example: <Toogle/>,
      },
      {
        option: "Password Change",
        channel: "Email,In App",
        example: <Toogle/>,
      },
      {
        option: "New Tenants Request",
        channel: "Email,In App",
        example: <Toogle/>,
      },
      {
        option: "In App Notification",
        channel: "Email,In App",
        example: <Toogle/>,
      }

      
     
    ];
  
    
  
    
  
    const totalPages = Math.ceil(baseOnTitle);
    const startIndex = (currentPage - 1);
    const currentItems = baseOnTitle.slice(startIndex, startIndex );



  return (
    <div>

  

 <table className={`w-[50%] border-collapse overflow-hidden mt-10`}>
    
      <thead>
        <tr className="">
          {TableHeads.map((head, idx) => (
            <th
              key={idx}
              className={`text-start border-[#000000]/10 font-medium font-inter text-[#000000] py-[22px]   text-[24px]
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
                className="border-t  border-[#000000]/10 py-[22px] font-inter text-[20px] text-[#000000]"
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

export default Settings
