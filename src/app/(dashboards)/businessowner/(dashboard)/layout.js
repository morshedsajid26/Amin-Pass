
import Topbar from '@/src/components/Topbar'
import React from 'react'
import BusinessSidebar from '@/src/components/BusinessSidebar'
import { ThemeProvider } from '@/src/components/Theme-Provider'
import ThemeToggle from '@/src/components/ThemeToggle'

const layout = ({children}) => {
  return (

    <ThemeProvider
    attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
            suppressHydrationWarning
    >

      <div className='bg-gradient-to-b from-[#A8C4D8] to-[#E4DBC2] dark:from-[#000000] dark:to-[#000000] '>
         <div className="flex h-screen overflow-hidden p-5">
            
          
              <BusinessSidebar/>
           
  
           
            <div className="flex-1 flex flex-col min-w-0 min-h-0 ">
             
              <div className='px-10'>
                <Topbar />
                <ThemeToggle/>
              </div>
  
           
              <main className="flex-1 min-h-0 overflow-y-auto hide-scrollbar  pt-6 pb-[50px] pl-6 pr-12 ">
              <div className="w-full max-w-full overflow-x-hidden  ">
              {children}
              </div>
            </main>
  
  
            </div>
          </div>
      </div>
    
    </ThemeProvider>
  )
}

export default layout