"use client";
import Banner from "@/components/banner";
import InputField from "@/components/form/input";
import { getMainInventory, updateInventory } from "@/services/inventoryServices";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  cash: yup.number().typeError("should be number"),
  weight: yup.number().typeError("should be number"),
});
const InventoryPage = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const updateInv = async (data) => {
    const result = await updateInventory({
      cash: data.cash,
      weight: data.weight,
    });
    console.log(result);
  };
  const retreiveInventory = async()=>{
    const res = await getMainInventory()
    setValue("weight", res.weight);
    setValue("cash", res.cash);
  }
  useEffect(()=>{
      retreiveInventory()
  }, [])
  const onSubmit = (data, event) => {
    updateInv(data);
  };
  return (
    <div>
      <Banner title={"Update Inventory"} />
      <div className="container p-4">
        <div className="row">
          <div className="col"></div>
          <div className="col-md-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              
              <InputField
                label={"Weight"}
                name={"weight"}
                register={register}
                type={"text"}
                defaultValue={"0"}
              />
              <p className="text-danger">{errors.weight?.message} </p>

              <InputField
                label={"Cash"}
                name={"cash"}
                register={register}
                type={"text"}
                defaultValue={"0"}
              />
              <p className="text-danger">{errors.cash?.message} </p>

              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary ">
                  submit
                </button>
              </div>
            </form>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
