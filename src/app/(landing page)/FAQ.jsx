import Container from '@/src/components/Container'
import FAQdropdown from '@/src/components/FAQdropdown'
import React from 'react'

const FAQ = () => {
  return (
    <div className='pb-16'>
        <Container >
             <h3 className=' font-inter font-bold text-2xl md:text-[32px] text-center mb-8 '>FAQ</h3>

       <div className={`flex flex-col justify-center items-center gap-4`}>
        <FAQdropdown
            className=''
            question="Is Aminpass really free to start?"
            answer="Yes/No"
            />
            <FAQdropdown
            className=''
            question="Do I need to sign a long-term"
            answer="No. All our paid plans are month-to-month or year-to-year. You can cancel or change your plan anytime without any penalty."
            />
            <FAQdropdown
            className=''
            question="How long does it take to launch the loyalty program?"
            answer="Dont know"
            />
            <FAQdropdown
            className=''
            question="Do my customer need to download an app to use the card?"
            answer="Yes"
            />
            <FAQdropdown
            className=''
            question="Is my customer data secure with Aminpass?"
            answer="Yes"
            />
       </div>
        </Container>
    </div>
  )
}

export default FAQ
