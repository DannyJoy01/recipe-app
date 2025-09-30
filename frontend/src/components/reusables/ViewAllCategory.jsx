// src/components/reusables/ViewAllCategory.jsx
import React from 'react';

const ViewAllCategory = ({ onClick, children }) => {
  return (
    <div className="bg-lnd_blue p-3 rounded-lg cursor-pointer" onClick={onClick}>
      <button className="text-xs font-bold">{children}</button>
    </div>
  );
};

export default ViewAllCategory;
