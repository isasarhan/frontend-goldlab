"use client";

import InfoCard from "@/components/admin/infoCard";
import { getCustomers } from "@/services/customerServices";
import { getSuppliers } from "@/services/supplierServices";
import { getSuppliesByDates } from "@/services/supplyServices";
import { useEffect, useState } from "react";
import { FaDollarSign, FaUsers } from "react-icons/fa6";
import { GoPackage } from "react-icons/go";
import { AiFillGold } from "react-icons/ai";

import Table from "@/components/table";

export default function Home() {
  const [customers, setCustomers] = useState([]);
  const [suppliers, setSuppliers] = useState(0);
  const [weight, setWeight] = useState(0);
  const [cash, setCash] = useState(0);
  const columns = [
    {key:"cname", label:"Name"},
    {key:"email", label:"Email"},
    {key:"phone", label:"Phone"},
    {key:"location", label:"Location"},
  ]
  const retreiveData = async () => {
    const cus = await getCustomers();
    if (cus) setCustomers(cus);
    const sup = await getSuppliers();
    if (sup) setSuppliers(sup.length);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const res = await getSuppliesByDates({
      startDate: new Date(currentYear, currentMonth),
      endDate: new Date(currentYear, currentMonth),
    });
    let totalWeight = 0;
    let totalCash = 0;
    res.map((supply) => {
      totalCash += supply.weight * supply.perGram;
      totalWeight += (supply.weight * supply.karat) / 995;
    });
    console.log(res);
    setCash(totalCash);
    setWeight(totalWeight);
  };
  useEffect(() => {
    retreiveData();
  }, []);
  return (
    <>
      <div className="p-3" style={{ backgroundColor: "#EDF5F9" }}>
        <h3 className="p-3">Admin Dashboard</h3>
        <div className="row">
          <div className="col-md-3 ">
            <InfoCard
              data={`Total: ${customers.length}`}
              title={"Customers"}
              icon={
                <FaUsers
                  size={"50px"}
                  color="#fff"
                  style={{
                    backgroundColor: "0077b6",
                    borderRadius: 100,
                    padding: "10px",
                  }}
                />
              }
            />
          </div>

          <div className="col-md-3">
            <InfoCard
              data={`Total: ${suppliers}`}
              title={"Suppliers"}
              icon={
                <GoPackage
                  size={"50px"}
                  color="#fff"
                  style={{
                    backgroundColor: "0077b6",
                    borderRadius: 100,
                    padding: "10px",
                  }}
                />
              }
            />
          </div>
          <div className="col-md-3">
            <InfoCard
              data={`Cash Expense: $${cash}`}
              title={"Supplies"}
              icon={
                <FaDollarSign
                  size={"50px"}
                  color="#fff"
                  style={{
                    backgroundColor: "0077b6",
                    borderRadius: 100,
                    padding: "10px",
                  }}
                />
              }
            />
          </div>
          <div className="col-md-3">
            <InfoCard
              data={`Fine Gold:  ${weight.toFixed(2)}gr`}
              title={"Supplies"}
              icon={
                <AiFillGold
                  size={"50px"}
                  color="#fff"
                  style={{
                    backgroundColor: "0077b6",
                    borderRadius: 100,
                    padding: "10px",
                  }}
                />
              }
            />
          </div>
        </div>
        <br />
        <div className="row p-md-3">
          <div className="col-md-8">
            <Table columns={columns} data={customers}/>
          </div>
        </div>
      </div>
    </>
  );
}
