"use client";
import React, { useState } from "react";
import { addCustomer } from "@/services/customerServices";
import { useForm } from "react-hook-form";
import { addBalance } from "@/services/balanceServices";
import Banner from "@/components/banner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    name: yup
      .string()
      .min(5, "name should be at least 5 characters")
      .required(),
    email: yup.string().email("Invalid email address").required(),
    location: yup.string().required(),
    phone: yup.string().required(),
  })
  .required();

function AddCustomer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [success, setSuccess] = useState(false);

  const postCustomer = async (data) => {
    const customer = {
      cname: data.name,
      email: data.email,
      location: data.location,
      phone: data.phone,
    };

    addCustomer(customer)
      .then(function (response) {
        const data = response.data;
        console.log(data);
        const balance = {
          customerid: data._id,
        };
        addBalance(balance).then((response) => {
          console.log(response);
        });
        setSuccess(true);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      });
  };

  const onSubmit = (data, event) => {
    event.preventDefault();
    postCustomer(data);
    localStorage.removeItem("customers");
    localStorage.removeItem("balances");

  };
  
  return (
    <>
      <Banner title="New Customer" />
      <div className="container-md"> 
        <div className="wrapper p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input 
                type="text"
                className="form-control"
                id="name"
                {...register("name")}
              />
              <p>{errors.name?.message}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                {...register("email")}
              />
              <p>{errors.email?.message}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                {...register("phone")}
              />
              <p>{errors.phone?.message}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                id="location"
                {...register("location")}
              />
              <p>{errors.location?.message}</p>
            </div>
            {success && (
              <div className="alert alert-success" role="alert">
                A new customer has been added!
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

export default AddCustomer;
