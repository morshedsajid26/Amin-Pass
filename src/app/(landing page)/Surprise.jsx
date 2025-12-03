import Container from "@/src/components/Container";
import React from "react";

const Surprise = () => {
  return (
    <div>
      <Container className={`md:border border-[#979797]/30 py-8 px-2 flex flex-col gap-4 items-center rounded-2xl`}>
        <h3 className="font-inter font-medium text-2xl md:text-[32px] ">
          Ready to surprise your customers?
        </h3>
        <p className="font-inter  mb-4">
          Start your digital loyalty journey today.
        </p>
        <button className="font-inter font-bold py-3 px-7 bg-[#7AA3CC] rounded-2xl mb-4">
            Get Started
        </button>
      </Container>
    </div>
  );
};

export default Surprise;
