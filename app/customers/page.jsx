"use client";
import React, { useEffect, useState } from "react";
import { getCustomers } from "@/services/customerServices";
import { IoMdRefresh } from "react-icons/io";
import CustomerCard from "@/components/card";
import Banner from "@/components/banner";
import Pagination from "@/components/pagination";
import { paginate } from "@/utilities/paginate";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  const retrieveData = async () => {
    const res = await getCustomers();
    localStorage.setItem("customers", JSON.stringify(res));
    setCustomers(res);
    initilalizeTable(res);
  };

  useEffect(() => {
    const cachedData = localStorage.getItem("customers");
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      initilalizeTable(parsed);
    } else {
      retrieveData();
    }
  }, [page, pageSize]);

  const initilalizeTable = (data) => {
    const pagged = paginate(data, page, pageSize);
    setCustomers(data);
    setFilteredCustomers(pagged);
  };
  const handlePageChange = (page) => {
    setPage(page);
    initilalizeTable(customers);
  };
  const handleRefresh = () => {
    setCustomers([]);
    localStorage.removeItem("customers");
    localStorage.removeItem("balances");
    retrieveData();
  };
  return (
    <>
      <Banner title="All Customers" />
      <div className="container">
        <div className="">
          <div className="d-flex justify-content-between">
            <div></div>
            <button
              className="btn btn-square btn-primary"
              onClick={handleRefresh}
            >
              {<IoMdRefresh />}
            </button>
          </div>
          <div className="row ">
            {filteredCustomers.map((item) => (
              <div key={item._id} className="col-md-3 p-3">
                <CustomerCard
                  key={item._id}
                  id={item._id}
                  email={item.email}
                  location={item.location}
                  name={item.cname}
                  phone={item.phone}
                />
              </div>
            ))}
            {customers && (
              <Pagination
                currentPage={page}
                itemsCount={customers.length}
                onPageChange={handlePageChange}
                pageSize={pageSize}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Customers;
