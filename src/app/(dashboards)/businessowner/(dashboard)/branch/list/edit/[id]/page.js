"use client";

import React from 'react';
import AddBranch from '../../add/branch/AddBranch';
import { useParams } from 'next/navigation';

const EditBranchPage = () => {
    const params = useParams();
    const id = params?.id;

    return (
        <div>
            <AddBranch branchId={id} />
        </div>
    );
};

export default EditBranchPage;
