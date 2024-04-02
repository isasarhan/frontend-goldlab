"use client";
import Banner from "@/components/banner";
import DateField from "@/components/form/date";
import InputField from "@/components/form/input";
import SelectField from "@/components/form/select";
import TextArea from "@/components/form/textArea";
import Table from "@/components/table";
import {
  updateInventory,
  updateMainInventory,
} from "@/services/inventoryServices";
import { getSuppliers } from "@/services/supplierServices";
import { addSupply, getSuppliesByDates } from "@/services/supplyServices";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  startDate: yup.date().typeError("choose a valid date"),
  endDate: yup.date().typeError("choose a valid date"),
});
const SupplyPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [supplies, setSupplies] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const columns = [
    { key: "supplier.name", label: "Supplier" },
    { key: "date", label: "Date" },
    { key: "weight", label: "Weight" },
    { key: "perGram", label: "Per Gram" },
    { key: "karat", label: "Karat" },
    { key: "description", label: "Description" },
  ];
  const retreiveData = async(data)=>{
    console.log(data);
    const result = await getSuppliesByDates({
      supplierid:data.supplier,
      startDate:data.startDate,
      endDate:data.endDate,
    })
    setSupplies(result)
    console.log(result);
  }
  const onSubmit = (data, event) => {
     retreiveData(data)
  };
  const retreiveSuppliers = async () => {
    const suppliers = await getSuppliers();
    setSuppliers(suppliers);
    if (suppliers) localStorage.setItem("suppliers", suppliers);
  };

  useEffect(() => {
    retreiveSuppliers();
  }, [submitted]);

  return (
    <div>
      <Banner title={"Supplies"} />
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-3">
            <div className="col-md-3">
              <SelectField
                label="Suppliers"
                name="supplier"
                options={suppliers}
                register={register}
              />
            </div>
            <div className="col-md-3">
              <DateField name="startDate" label="Start Date" register={register} />
              <p>{errors.date?.message}</p>
            </div>
            <div className="col-md-3">
              <DateField name="endDate" label="End Date" register={register} />
              <p>{errors.date?.message}</p>
            </div>
            <div className="col-md-3 align-self-center">
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary ">
                  submit
                </button>
              </div>
            </div>
          </div>
        </form>
        <Table columns={columns} data={supplies} />
      </div>
    </div>
  );
};

export default SupplyPage;
