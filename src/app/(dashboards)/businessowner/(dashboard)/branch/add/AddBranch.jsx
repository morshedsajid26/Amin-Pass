import Bredcumb from "@/src/components/Bredcumb";
import Dropdown from "@/src/components/Dropdown";
import InputField from "@/src/components/InputField";
import React from "react";

const AddBranch = () => {
  return (
    <div>
      <Bredcumb />

      <div className="grid grid-cols-2 gap-10">
        <InputField label={`Business Name`} />

        <InputField label={`Branch Location`} />

        <InputField label={`Number of Staff`} />

        <Dropdown
          label="Manager Name"
          className={`gap-2`}
          labelClass={`font-inter text-xl text-[#000000]`}
          placeholder="Jane D."
          options={["Jane D.", "Jane D.", "Jane D."]}
          optionClass={`font-inter `}
          inputClass={`border p-4 font-inter rounded-2xl`}
        />
      </div>
<div className="flex justify-center">

      <button className="bg-[#7AA3CC] font-bold font-inter px-20 py-3  rounded-md text-[#000000] cursor-pointer  mt-20">
        Create
      </button>
</div>
    </div>
  );
};

export default AddBranch;
