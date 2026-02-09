"use client";

import React, { use } from "react";
import EditCard from "../edit/EditCard";
// import EditCard from "../../edit/EditCard";

const Page = ({ params }) => {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  return (
    <div>
      <EditCard id={id} />
    </div>
  );
};

export default Page;
