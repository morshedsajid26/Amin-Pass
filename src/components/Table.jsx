import React from "react";

export default function Table({ TableHeads, TableRows }) {
  return (
    <table className="w-full my-9 border-collapse bg-white rounded-2xl overflow-hidden">
      {/* ==== TABLE HEADER ==== */}
      <thead>
        <tr className="">
          {TableHeads.map((head, idx) => (
            <th
              key={idx}
              className={`text-center border-b border-l border-[#000000]/10 font-medium font-inter text-[#000000] py-[22px]   text-[24px]
                ${idx === 0 ? "rounded-tl-2xl" : ""}
                ${idx === TableHeads.length - 1 ? "rounded-tr-2xl" : ""}`}
              style={{ width: head.width }}
            >
              {head.Title}
            </th>
          ))}
        </tr>
      </thead>

      {/* ==== TABLE BODY ==== */}
      <tbody className="">
        {TableRows.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {TableHeads.map((head, headIdx) => (
              <td
                key={headIdx}
                className="border-b border-l border-[#000000]/10 py-[22px] text-center px-3 font-inter text-[20px] text-[#000000]"
              >
                {/* If render function exists, use it — otherwise show plain data */}
                {head.render ? head.render(row, rowIdx) : row[head.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}