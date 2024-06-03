import TableBody from "./tableBody";
import TableHeader from "./tableHeader";
import './style.css'
const Table = ({ columns, data }) => {
  return (
    <>
      <div className="table-responsive" >
        <table className="table table-hover" >
          <TableHeader columns={columns} />
          <TableBody columns={columns} data={data} />
        </table>
      </div>
    </>
  );
};

export default Table;
