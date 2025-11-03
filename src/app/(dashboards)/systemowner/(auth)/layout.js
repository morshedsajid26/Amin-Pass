import Image from 'next/image'
import React from 'react'
import AuthLogo from '@/public/AuthLogo.png'

const layout = ({children}) => {
  return (
    <div className=' bg-linear-to-t from-[#F4F1EC] to-[#B3CBDB] min-h-screen'>
      
      
      <div className='flex items-center justify-between'>
<div className='mx-auto'>{children}</div>
<div className='bg-linear-to-l from-[#F4F1EC] to-[#93BAD8] rounded-l-[100px] min-h-screen w-[45%] flex items-center justify-center'>
  <Image src={AuthLogo}/>
</div>
      </div>
    </div>
  )
}

export default layout
