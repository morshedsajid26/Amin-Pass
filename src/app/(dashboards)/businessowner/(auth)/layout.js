import Image from 'next/image'
import React from 'react'
import AuthLogo from '@/public/AuthLogo.png'
import { ThemeProvider } from '@/src/components/Theme-Provider'

const layout = ({children}) => {
  return (
      <ThemeProvider
        attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
                suppressHydrationWarning
        >

    <div className=' bg-gradient-to-b from-[#A8C4D8] to-[#E4DBC2] dark:from-[#000000] dark:to-[#000000] min-h-screen'>
      
      
      <div className='flex items-center justify-between'>
<div className='mx-auto'>{children}</div>
<div className='bg-linear-to-l from-[#F4F1EC] to-[#93BAD8] rounded-l-[100px] min-h-screen w-[45%] flex items-center justify-center'>
  <Image src={AuthLogo} alt='logo'/>
</div>
      </div>
    </div>
        </ThemeProvider>
  )
}

export default layout
