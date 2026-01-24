import Container from "@/src/components/Container";
import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Container className={``}>
        <div className=" flex items-center justify-between py-5">
          <p className="font-inter">Hello!! Welcome to Aminpass</p>

          <div className="flex items-center gap-6">
            <p className="flex items-center gap-1 font-inter">
              <MdOutlineMarkEmailUnread />
              aminpass@gmail.com
            </p>
            <p className="flex items-center gap-1 font-inter">
              <FiPhoneCall />
              +757 699-4478
            </p>
          </div>
        </div>
        <div className=" py-10 border-t  border-[#E6E6E6]/30">
          <div>
            <h3 className="font-inter font-bold text-[56px]">Privacy Policy</h3>
            <p className="font-inter text-[32px] text-[#707071] mt-8">
              Welcome to Aminpass.We provide a digital loyalty card platform
              that allows multiple businesses (“Merchants”) to create and manage
              customer loyalty programs, and allows customers (“Users”) to earn
              and redeem rewards through our web and mobile applications.
              <br /> Your privacy is important to us. This Privacy Policy
              explains how we collect, use, and protect your personal
              information across all users and tenants of our system.
            </p>
          </div>

          <div className="mt-10">
            <h3 className="font-inter font-bold text-[56px]">
              {" "}
              Data Sharing and Disclosure
            </h3>

            <ul className="list-disc font-inter text-[32px] text-[#707071] mt-6">
              <p> we may share limited information in the following cases:</p>
              <li>
                With Merchants: Customer activity (points, visits, redemptions)
                is shared only with the specific business where the transaction
                occurs.
              </li>
              <li>
                With Service Providers: Trusted partners who help us with
                hosting, payment processing, analytics, and notifications —
                bound by strict confidentiality agreements.
              </li>
              <li>
                For Legal Compliance: If required by law, court order, or
                regulatory authority.
              </li>
            
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Privacy;
