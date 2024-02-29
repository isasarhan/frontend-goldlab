"use client";
import Banner from "@/components/banner";
import Table from "@/components/table";
import { getBalances } from "@/services/balanceServices";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";

const AllBalance = () => {
  const columns = [
    { key: "customer.name", label: "Name" },
    { key: "gold", label: "Gold" },
    { key: "cash", label: "Cash" },
    {
      key: "_id",
      label: "Edit",
      content: (item) => (
        <Link href={`/balances/edit/${item._id}`}>
          <button className="btn btn-primary"> edit</button>
        </Link>
      ),
    },
    {
      key: "id",
      label: "Delete",
      content: (item) => <button className="btn btn-danger"> delete</button>,
    },
  ];
  const [balances, setBalances] = useState([]);

  const retreiveBalances = async () => {
    const result = (await getBalances()).data;
    setBalances(result);
    localStorage.setItem("balances", JSON.stringify(result));
  };
  useEffect(() => {
    const cachedBalances = localStorage.getItem("balances");
    if (!cachedBalances) {
      retreiveBalances();
    } else setBalances(JSON.parse(cachedBalances));
  }, []);
  const handleRefresh = () => {
    setBalances([]);
    localStorage.removeItem("balances");
    retreiveBalances();
  };
  return (
    <>
      <Banner title="Balances" />
      <div className="container-md">
        <div className="wrapper m-3">
          <div className="d-flex justify-content-between">
            <div></div>
            <button
              className="btn btn-square btn-primary"
              onClick={handleRefresh}
            >
              {<IoMdRefresh />}
            </button>
          </div>
        </div>
        <Table columns={columns} data={balances} />
      </div>
    </>
  );
};

export default AllBalance;
