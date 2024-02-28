"use client";
import React, { useEffect, useState } from "react";
import { getCustomer, updateCustomer } from "@/services/customerServices";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Banner from "@/components/banner";

const schema = yup
  .object({
    name: yup.string().min(5, "name should be at least 5 characters"),
    email: yup.string().email("Invalid email address"),
  })
  .required();

function FormExample({ params }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [success, setSuccess] = useState(false);

  const retrieveCustomer = async () => {
    const res = await getCustomer(params.id);
    setValue("name", res.cname);
    setValue("email", res.email);
    setValue("phone", res.phone);
    setValue("location", res.location);
    console.log(res);
  };

  const postCustomers = async (data) => {
    const customer = {
      name: data.name,
      email: data.email,
      location: data.location,
      phone: data.phone,
    };

    updateCustomer(params.id, customer)
      .then((res) => {
        setSuccess(true);
        console.log(res);
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
    postCustomers(data);
  };
  useEffect(() => {
    retrieveCustomer();
  }, []);
  return (
    <>
          <Banner title="Edit Customer Information"/>
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
            </div>
            {success && (
              <div className="alert alert-success" role="alert">
                Customer data has been updated!
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

export default FormExample;
