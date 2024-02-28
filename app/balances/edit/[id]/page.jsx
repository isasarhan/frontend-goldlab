"use client";
import React, { useEffect, useState } from "react";
import { getCustomer, updateCustomer } from "@/services/customerServices";
import { useForm } from "react-hook-form";
import { getBalance, updateBalance } from "@/services/balanceServices";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Banner from "@/components/banner";

const schema = yup
  .object({
    gold: yup.number().typeError("Should be a number"),
    cash: yup.number().typeError("Should be a number"),
  })
  .required();

function EditBalance({ params }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [customer, setCustomer] = useState({ name: "" });
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const retreiveBalance = async () => {
    const res = await getBalance(params.id);
    console.log(res);
    setValue("gold", res.gold);
    setValue("cash", res.cash);
    setCustomer(res.customer);
  };

  const update = async (data) => {
    const balance = {
      customerid: customer.customerid,
      gold: data.gold,
      cash: data.cash,
    };

    updateBalance(params.id, balance)
      .then(() => {
        setSuccess(true);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setSubmitted(false);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      });
  };

  const onSubmit = (data, event) => {
    event.preventDefault();
    setSubmitted(true);
    update(data);
  };
  useEffect(() => {
    retreiveBalance();
  }, []);
  return (
    <>
      <Banner title={`Edit Balance for ${customer.name}`} />

      <div className="container-md">
        <div className="wrapper p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="gold" className="form-label">
                Gold
              </label>
              <input
                type="text"
                className="form-control"
                id="gold"
                {...register("gold")}
              />
              <p>{errors.gold?.message}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="cash" className="form-label">
                Cash
              </label>
              <input
                type="text"
                className="form-control"
                id="cash"
                {...register("cash")}
              />
              <p>{errors.cash?.message}</p>
            </div>
            {success && (
              <div className="alert alert-success" role="alert">
                Balance data has been updated!
              </div>
            )}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditBalance;
