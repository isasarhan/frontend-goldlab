"use client";
import Banner from "@/components/banner";
import Table from "@/components/table";
import { getBalances } from "@/services/balanceServices";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
  const [totalCash, setTotalCash] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);

  const retreiveBalances = async () => {
    const result = (await getBalances()).data;
    setBalances(result);
    localStorage.setItem("balances", JSON.stringify(result));
  };
  const handleTotalBalances = () => {
    let cash = 0;
    let weight = 0;
    balances.map((balance) => {
      cash = cash + balance.cash;
      weight = weight + balance.gold;
    });
    setTotalCash(cash);
    setTotalWeight(weight);
  };
  useEffect(() => {
    const cachedBalances = localStorage.getItem("balances");
    if (!cachedBalances) {
      retreiveBalances();
    } else setBalances(JSON.parse(cachedBalances));
  }, []);

  const handleRefresh = () => {
    // setBalances([]);
    // localStorage.removeItem("balances");
    // retreiveBalances();
    handleTotalBalances();
  };
  return (
    <>
      <Banner title="Balances" />
      <div className="container-md">
        <div className="wrapper m-3">
          <div className="row">
            <div className="col">
              <h3>Total</h3>
            </div>
            <div className="col">weight: {totalWeight}</div>
            <div className="col">cash: {totalCash}</div>
            <div className="col">
              <button
                className="btn btn-square btn-primary"
                onClick={handleRefresh}
              >
                Calculate Total
              </button>
            </div>
          </div>
        </div>
        <Table columns={columns} data={balances} />
      </div>
    </>
  );
};

export default AllBalance;
