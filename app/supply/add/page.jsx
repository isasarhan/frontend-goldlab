"use client";
import Banner from "@/components/banner";
import DateField from "@/components/form/date";
import InputField from "@/components/form/input";
import SelectField from "@/components/form/select";
import TextArea from "@/components/form/textArea";
import Table from "@/components/table";
import { updateInventory, updateMainInventory } from "@/services/inventoryServices";
import { getSuppliers } from "@/services/supplierServices";
import { addSupply } from "@/services/supplyServices";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  date: yup.date().typeError("choose a valid date"),
  weight: yup.number().typeError("should be a number"),
  karat: yup.number().typeError("should be a number"),
  perGram: yup.number().typeError("should be a number"),
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
  const onSubmit = (data, event) => {
    const supp = suppliers.filter((supplier) => {
      return supplier._id == data.supplier;
    });
    const newSupply = {
      supplier: {
        name: supp.at(0).name,
        id: supp.at(0)._id,
      },
      date: data.date,
      weight: data.weight,
      perGram: data.perGram,
      karat: data.karat,
      description: data.description,
    };
    setSupplies([newSupply, ...supplies]);
  };
  const retreiveSuppliers = async () => {
    const suppliers = await getSuppliers();
    setSuppliers(suppliers);
    if (suppliers) localStorage.setItem("suppliers", suppliers);
  };
  const discardChanges = () => {
    setSupplies([]);
  };
  const saveSupplies = async () => {
    let totalWeight = 0;
    let totalCash = 0;
    const result = await Promise.all(
      supplies.map(async (supply) => {
        totalWeight = totalWeight + (supply.weight * supply.karat) / 995;
        totalCash = totalCash + supply.weight * supply.perGram;
        return await addSupply({
          supplierid: supply.supplier.id,
          date: supply.date,
          perGram: supply.perGram,
          karat: supply.karat,
          description: supply.description,
          weight: supply.weight,
        });
      })
    );
    const weight = parseFloat(totalWeight.toFixed(2))
    const inventory = await updateMainInventory({
      cash:totalCash,
      weight:weight
    })

    console.log(inventory);
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
            <div className="col">
              <SelectField
                label="Suppliers"
                name="supplier"
                options={suppliers}
                register={register}
              />
            </div>
            <div className="col">
              <DateField name="date" label="Choose Date" register={register} />
              <p>{errors.date?.message}</p>
            </div>
          </div>
          <div className="row ">
            <div className="col-md-4">
              <InputField
                name="weight"
                label="Weight"
                register={register}
                type="text"
              />
              <p>{errors.weight?.message}</p>
            </div>
            <div className="col-md-4">
              <InputField
                name="perGram"
                label="Per Gram"
                register={register}
                type="text"
              />
              <p>{errors.perGram?.message}</p>
            </div>
            <div className="col-md-4 ">
              <label className="form-label">Karat</label>
              <select className="form-select" {...register("karat")}>
                <option value="750">18 K</option>
                <option value="875">21 K</option>
              </select>
              <p>{errors.karat?.message}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <TextArea
                name="description"
                label="Description"
                register={register}
              />
            </div>
          </div>
          <div className="row justify-content-between ">
            <div className="col-md-1  ">
              <button type="submit" className="btn btn-primary px-5">
                ADD
              </button>
            </div>
            <div className="col-md-4">
              <button
                type="button"
                className="col-md-5 btn btn-warning m-1"
                onClick={discardChanges}
              >
                Discard Payment
              </button>
              <button
                type="button"
                className="col-md-5 btn btn-success "
                onClick={saveSupplies}
              >
                Save Supplies
              </button>
            </div>
          </div>
        </form>
        <Table columns={columns} data={supplies} />
      </div>
    </div>
  );
};

export default SupplyPage;
