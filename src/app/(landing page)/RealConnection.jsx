import Container from "@/src/components/Container";
import Image from "next/image";
import React from "react";
import connection1 from "@/public/connection1.png";
import connection2 from "@/public/connection2.png";
import connection3 from "@/public/connection3.png";
import connection4 from "@/public/connection4.png";

const RealConnection = () => {
  return (
    <div className="pb-20">
      <Container>
        <h3 className=" font-inter font-bold text-2xl md:text-[32px] text-center ">
          Meaningful rewards. Real connection
        </h3>
        <p className=" font-inter text-center mt-2 ">
          Create offers and discounts that customers feel - not forget. Every
          reward instantly appears on their digital card.
        </p>

        <div className="flex  justify-between mt-14">
          <Image className="md:w-auto md:h-auto h-65 w-31" src={connection1} alt="layout" />
          <Image className="md:w-auto md:h-auto  h-65 w-31"  src={connection2} alt="layout" />
          <Image className="md:w-auto md:h-auto  h-65 w-31" src={connection3} alt="layout" />
          <Image className="md:block hidden" src={connection4} alt="layout" />
        </div>
      </Container>
    </div>
  );
};

export default RealConnection;
