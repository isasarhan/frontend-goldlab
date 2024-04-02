import React from "react";
import { FaEnvelope, FaPhone, FaLocationPin } from "react-icons/fa6";
import Link from "next/link";

const CustomerCard = ({ name, id, location, email, phone }) => {
  return (
    <div>
      <div className="card rounded-5 p-2" style={{ width: "18em" }}>
        <div className="p-3 ">
          <h5 className="card-title"> {name} </h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item  ">
            <div className="row align-items-center">
              <div className="col-auto">
                <FaEnvelope />
              </div>
              <div className="col">{email}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row align-items-center">
              <div className="col-auto">
                <FaPhone />
              </div>
              <div className="col">{phone}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row align-items-center">
              <div className="col-auto">
                <FaLocationPin />
              </div>
              <div className="col">{location}</div>
            </div>
          </li>
        </ul>
        <div className="card-body">
          <Link href={`/customers/edit/${id}`}>
            <button className="btn btn-primary"> edit</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
