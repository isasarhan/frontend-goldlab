"use client";
import Banner from "@/components/banner";
import InputField from "@/components/form/input";
import TextArea from "@/components/form/textArea";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {addSupplier} from "@/services/supplierServices"
const schema = yup.object({
  name: yup.string().min(4),
  cash: yup.number().typeError("should be number"),
  weight: yup.number().typeError("should be number"),
});
const AddSupplier = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const insertSupplier = async (data)=>{
    const supplier = await addSupplier(data)
    console.log(supplier);
  }
  const onSubmit = (data,event) => {
    insertSupplier(data)
  };
  return (
    <div>
      <Banner title={"Supplier"} />
      <div className="container">
        <div className="row">
          <div className="col"></div>
          <div className="col-md-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                label={"Name"}
                name={"name"}
                register={register}
                type={"text"}
              />
              <InputField
                label={"Weight"}
                name={"weight"}
                register={register}
                type={"text"}
              />
              <InputField
                label={"Cash"}
                name={"cash"}
                register={register}
                type={"text"}
              />
              <div className="mb-4">
                <TextArea
                  label={"Description"}
                  name={"description"}
                  register={register}
                  type={"text"}
                />
              </div>
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

export default AddSupplier;
