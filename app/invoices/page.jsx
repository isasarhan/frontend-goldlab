"use client";
import Banner from "@/components/banner";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import SelectField from "@/components/form/select";
import {
  deleteInvoiceById,
  getInvoicesByCustomerId,
} from "@/services/invoiceServices";
import Table from "@/components/table";
import { deleteOrderById } from "@/services/orderServices";

const schema = yup.object({});
const Invoices = () => {
  const [customers, setCustomers] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [submitted, setSubmitted] = useState([]);
  const columns = [
    { key: "date", label: "Date" },
    { key: "totalCash", label: "Total Cash" },
    { key: "totalWeight", label: "Total Weight" },
    {
      key: "id",
      label: "Delete",
      content: (item) => (
        <button
          className="btn btn-danger"
          onClick={() => {
            deleteInvoice(item);
          }}
          type="button"
        >
          delete
        </button>
      ),
    },
  ];
  const deleteInvoice = (item) => {
    const {orders, _id:id} = item
    console.log(orders);
    orders.map((order)=>{
      deleteOrderById(order.orderid).then((res)=>{
        console.log(res);
      })
    })
    deleteInvoiceById(item._id).then((res) => {
      console.log(res);
    });
  };
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const retrieveCustomers = async () => {
    const cachedCustomers = localStorage.getItem("customers");
    if (cachedCustomers) setCustomers(JSON.parse(cachedCustomers));
  };
  useEffect(() => {
    retrieveCustomers();
  }, [submitted]);

  const onSubmit = (data, event) => {
    event.preventDefault();
    const customerid = data.customerId;
    if (customerid === "") return;
    console.log(customerid);
    setInvoices([]);
    getInvoicesByCustomerId(customerid).then((res) => {
      setInvoices(res);
      console.log(res);
    });
  };
  return (
    <div>
      <Banner title="All Invoices" />
      <div className="container-md">
        <div className="wrapper p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mb-2 align-items-end justify-content-between ">
              <div className="col">
                <SelectField
                  name="customerId"
                  label="Customers"
                  options={customers}
                  register={register}
                />
              </div>
              <div className="col"></div>
              <div className="col d-flex justify-content-center">
                <button className="btn btn-primary" type="submit">
                  View Invoices
                </button>
              </div>
            </div>
          </form>
          <Table data={invoices} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default Invoices;
