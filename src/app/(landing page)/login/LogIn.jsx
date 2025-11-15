import Container from "@/src/components/Container";
import React from "react";
import AuthLogo from "@/public/AuthLogo.png";
import Image from "next/image";
import Password from "@/src/components/Password";
import InputField from "@/src/components/InputField";
import Link from "next/link";

const LogIn = () => {
  return (
    <div className="bg-gradient-to-t from-[#F4F1EC] to-[#B3CBDB] min-h-screen">
      <Container className="flex flex-col items-center py-20 px-11 h-screen overflow-y-auto hide-scrollbar">
        <Image src={AuthLogo} alt="logo" />

        <form className="gap-5 flex flex-col items-cente w-[550px] p-10 bg-white rounded-3xl mt-12 shadow-md">
          <h3 className="font-inter font-medium text-[32px] text-[#333333]">
            Login Your Business Account
          </h3>

          <p className="font-inter text-[#333333]">
            Start boosting loyalty and return visits today.
          </p>

          

          <InputField
            label="Email Address"
            labelClass="text-[#333333] text-[16px]"
            placeholder=""
            inputClass="border-[#005FA8] rounded-[4px] text-[#5C5C5C] py-3 placeholder:text-[#5C5C5C]"
          />

          <Password label="Password" placeholder="password" />
          

          <Link className="flex justify-center" href="/">
            <button className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl font-inter py-3 px-20 rounded-2xl cursor-pointer mt-12">
              Log In
            </button>
          </Link>
          <p className="text-center mt-5 font-inter">Don't have an Account? <a href="/signup" className="text-[#7AA3CC]">SignUp</a></p>
        </form>
      </Container>
    </div>
  );
};

export default LogIn;
