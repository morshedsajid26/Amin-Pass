
import Topbar from '@/src/components/Topbar'
import React from 'react'
import BusinessSidebar from '@/src/components/BusinessSidebar'

const layout = ({children}) => {
  return (
    <div className='bg-linear-to-b from-[#A8C4D8] to-[#E4DBC2]'>
       <div className="flex h-screen overflow-hidden p-5">
          
        
            <BusinessSidebar/>
         

         
          <div className="flex-1 flex flex-col min-w-0 min-h-0 ">
           
            <div className='px-10'>
              <Topbar />
            </div>

         
            <main className="flex-1 min-h-0 overflow-y-auto hide-scrollbar  pt-6 pb-[50px] pl-6 pr-12 ">
            <div className="w-full max-w-full overflow-x-hidden  ">
            {children}
            </div>
          </main>


          </div>
        </div>
    </div>
  )
}

export default layout