import Container from "@/src/components/Container";
import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

const Terms = () => {
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
         <h3 className="font-inter font-bold text-[56px]">Terms & Condition</h3>
        <p className="font-inter text-[32px] text-[#707071] mt-8">
          Welcome to Aminpass.These Terms & Conditions (“Terms”) govern your
          access to and use of our digital loyalty card platform, including all
          related web dashboards, mobile applications (PWA), and services
          (collectively, the “Platform”).<br/> By accessing or using our Platform,
          you agree to comply with these Terms. If you do not agree, you must
          not use the Platform.
        </p>
       </div>

       <div className="mt-10">
        <h3 className="font-inter font-bold text-[56px]"> Definitions</h3>

        <ul className="list-disc font-inter text-[32px] text-[#707071] mt-6">
            <li>“Merchant” / “Business Owner” refers to the registered company or individual operating a loyalty program through our platform.</li>
            <li>“Customer” / “User” refers to the individual participating in a loyalty program, earning or redeeming points/stamps.</li>
            <li>“System Owner” refers to the main platform administrator controlling all tenant (business) accounts.</li>
            <li>“Card” refers to the digital loyalty card stored within the app or in Apple/Google Wallet</li>
        </ul>
       </div>
      </div>
      </Container>

    </div>
  );
};

export default Terms;
