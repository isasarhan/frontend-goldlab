import React from "react";

const TableHeader = ({ columns }) => {
  return (
    <thead >
      <tr >
        {columns.map((column) => (
          <th className="p-3" scope="col" key={column.key}>
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
