"use client";
import Bredcumb from "@/src/components/Bredcumb";
import Dropdown from "@/src/components/Dropdown";
import InputField from "@/src/components/InputField";
import Table from "@/src/components/Table";
import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const Activation = () => {
  const [baseOnTitle, setBaseOnTitle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewOpen, setViewOpen] = useState(false);

  let ActionButton = () => {
    return (
      <div>
        <button
          onClick={() => setViewOpen(true)}
          className="bg-[#7AA3CC] font-inter font-medium py-2 px-11 rounded-full text-[#121212] cursor-pointer  hover:bg-[#7AA3CC]/80 transition-all duration-300"
        >
          Edit
        </button>
      </div>
    );
  };

  const TableHeads = [
    { Title: "Plan Name", key: "name", width: "20%" },
    { Title: "Price", key: "price", width: "20%" },
    { Title: "Feature", key: "feature", width: "20%" },
    { Title: "Location", key: "location", width: "20%" },
    { Title: "Action", key: "action", width: "20%" },
  ];

  const TableRows = [
    {
      name: "James Carter",
      id: "#1245",
      price: "10/08/2025",
      feature: "10:45 AM",
      location: "2 Location",
      action: <ActionButton />,
    },
  ];

  useEffect(() => {
    setBaseOnTitle(TableRows);
  }, []);

  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = baseOnTitle.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <Bredcumb />

      <div className="overflow-x-auto">
        <Table TableHeads={TableHeads} TableRows={currentItems} />
      </div>

      {viewOpen && (
        <div className="fixed inset-0  bg-[#D9D9D9]/80 flex items-center justify-center z-50 ">
          <div className="bg-linear-to-b from-[#A8C4D8] to-[#E4DBC2] rounded-3xl   p-12 md:w-[50%] w-full overflow-y-auto md:h-[80%] h-full hide-scrollbar">
            <div className="flex justify-end">
              <FiX
                onClick={() => setViewOpen(false)}
                className="w-7 h-7 mb-5 cursor-pointer "
              />
            </div>

            <div className="grid grid-cols-2 gap-x-18 gap-y-8">
              <Dropdown
                label="Select Plan "
                placeholder="Starter"
                labelClass={`text-2xl `}
                className={`   gap-2  font-inter md:col-span-1 col-span-2 `}
                inputClass="text-base border rounded-2xl  py-3 px-4"
                options={["Starter", "Grow", "Business"]}
                optionClass={`text-base`}
              />

              <InputField
                type="number"
                label={`Price`}
                labelClass={`text-2xl `}
                className={` md:col-span-1 col-span-2`}
                placeholder={`Price`}
                inputClass="text-base border rounded-2xl  py-3 px-4"
              />

              <Dropdown
                label="Location Select"
                placeholder="1"
                labelClass={`text-2xl `}
                className={`   gap-2  font-inter  md:col-span-1 col-span-2 `}
                inputClass="text-base border rounded-2xl  py-3 px-4"
                options={["1", "2", "3"]}
                optionClass={`text-base`}
              />

              <Dropdown
                label="Card Select"
                placeholder="1"
                labelClass={`text-2xl `}
                className={`   gap-2  font-inter  md:col-span-1 col-span-2`}
                inputClass="text-base border rounded-2xl  py-3 px-4"
                options={["1", "2", "3"]}
                optionClass={`text-base`}
              />

              <Dropdown
                label="Plan "
                placeholder="Active"
                labelClass={`text-2xl `}
                className={`   gap-2  font-inter   md:col-span-1 col-span-2`}
                inputClass="text-base border rounded-2xl  py-3 px-4"
                options={["Active", "Inctive"]}
                optionClass={`text-base`}
              />

              <div className=" md:col-span-1 col-span-2">
                <p className="font-inter text-2xl text-[#000000] mb-4">
                  Card Type
                </p>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      className=" accent-[#80B3FF] w-5 h-5"
                    />
                    <p className="text-[#000000] font-inter text-2xl font-medium ">
                      Points Card
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      className=" accent-[#80B3FF] w-5 h-5"
                    />
                    <p className="text-[#000000] font-inter text-2xl font-medium ">
                      Stamp Card
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      className=" accent-[#80B3FF] w-5 h-5"
                    />
                    <p className="text-[#000000] font-inter text-2xl font-medium ">
                      Reward Card
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      className=" accent-[#80B3FF] w-5 h-5"
                    />
                    <p className="text-[#000000] font-inter text-2xl font-medium ">
                      Membership Card
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-22 flex items-center gap-8 justify-center">
              <button 
              onClick={() => setViewOpen(false)}
              className="border border-[#7AA3CC] font-bold font-inter px-20 py-3 rounded-md text-[#000000]  cursor-pointer ">
                Close
              </button>

              <button 
              onClick={() => setViewOpen(false)}
              className="bg-[#7AA3CC] font-bold font-inter px-20 py-3  rounded-md text-[#000000] cursor-pointer ">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activation;
