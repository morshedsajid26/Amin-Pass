"use client"

import React, { useState } from 'react'

const Notification = () => {

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
        option: "Login Alerts",
        channel: "Email,In App",
        example: <Toogle/>,
      },
      {
        option: "Password Change",
        channel: "In App",
        example: <Toogle/>,
      },
      {
        option: "In App Notification",
        channel: "Bell Icon",
        example: <Toogle/>,
      },
      {
        option: "SMS Alerts",
        channel: "Critical Alerts",
        example: <Toogle/>,
      },
      {
        option: "Enable Card All Location",
        channel: "App",
        example: <Toogle/>,
      },

      
     
    ];
  
    const TableRows2 = [
     {
        option: "Main Street Branch",
        channel: "App",
        example: <Toogle/>,
      },
      {
        option: "Downtown Branch",
        channel: "App",
        example: <Toogle/>,
      },
      {
        option: "Online Store",
        channel: "App",
        example: <Toogle/>,
      },
      
     
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
              className={`text-start border-[#000000]/10 dark:border-white/10 font-medium font-inter text-[#000000] dark:text-white py-[22px]   text-2xl
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
                className="border-t  border-[#000000]/10 dark:border-white/10 py-[22px] font-inter text-xl text-[#000000] dark:text-white"
              >
                
                {head.render ? head.render(row, rowIdx) : row[head.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>

<div className='mt-10 '>
<h3 className='font-inter text-2xl font-medium border-b-2 w-[18%] pb-1 dark:text-white'>Notification By Location</h3>
     <table className={`w-[50%] border-collapse overflow-hidden mt-7`}>
    
      <thead>
        <tr className="">
          {TableHeads.map((head, idx) => (
            <th
              key={idx}
              className={`text-start border-[#000000]/10 font-medium font-inter text-[#000000] py-[22px] dark:text-white  text-2xl
                 `}
              
            >
              {head.Title}
            </th>
          ))}
        </tr>
      </thead>

      
      <tbody className="">
        {TableRows2.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {TableHeads.map((head, headIdx) => (
              <td
                key={headIdx}
                className="border-t  border-[#000000]/10 dark:border-white/10 py-[22px] font-inter text-xl text-[#000000] dark:text-white"
              >
                
                {head.render ? head.render(row, rowIdx) : row[head.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
</div>

    
  

    </div>
  )
}

export default Notification
