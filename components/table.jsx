import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ columns, data }) => {
  return (
    <div className="table-responsive rounded-4 ">
      <table className="table ">
        <TableHeader columns={columns} />
        <TableBody columns={columns} data={data} />
      </table></div>
  );
};

export default Table;
