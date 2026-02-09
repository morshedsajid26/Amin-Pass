"use client";

import React, { use } from "react";
import EditReward from "../EditReward";

const Page = ({ params }) => {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  return (
    <div>
      <EditReward id={id} />
    </div>
  );
};

export default Page;
