"use client";
import Banner from "@/components/banner";
import DateField from "@/components/form/date";
import InputField from "@/components/form/input";
import SelectField from "@/components/form/select";
import TextArea from "@/components/form/textArea";
import Table from "@/components/table";
import {
  getBalanceByCustomerID,
  updateBalance,
} from "@/services/balanceServices";
import { addInvoice } from "@/services/invoiceServices";
import { addOrder } from "@/services/orderServices";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    weight: yup
      .number()
      .typeError("should be number")
      .required()
      .positive()
      .default(0),
    perGram: yup.number().typeError("should be number"),
    perItem: yup.number().typeError("should be number"),
  })
  .required();

const Orders = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
 
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState([]);

  const columns = [
    { key: "weight", label: "Weight" },
    { key: "karat", label: "Karat" },
    { key: "perGram", label: "Per Gram" },
    { key: "perItem", label: "Per Item" },
    { key: "type", label: "Type" },
    { key: "date", label: "Date" },
    { key: "description", label: "Description" },
    {
      key: "id",
      label: "Edit",
      content: (item) => (
        <button className="btn btn-secondary" onClick={() => editOrder(item)}>
          edit
        </button>
      ),
    },
  ];
  const editOrder = (item) => {
    const updated = orders.filter((order) => order !== item);
    setOrders(updated);
    setValue("customerid", item.customerid);
    setValue("weight", item.weight);
    setValue("date", item.date);
    setValue("karat", item.karat);
    setValue("perGram", item.perGram);
    setValue("perItem", item.perItem);
    setValue("type", item.type);
    setValue("description", item.description);
  };
  const retrieveCustomers = async () => {
    const cachedCustomers = localStorage.getItem("customers");
    if (cachedCustomers) setCustomers(JSON.parse(cachedCustomers));
  };
  useEffect(() => {
    retrieveCustomers();
  }, [submitted]);

  const saveOrders = async () => {
    const orderResult = await Promise.all(
      orders.map(async (order) => {
        return (await addOrder(order)).data;
      })
    );
    var totalWeight = 0;
    var totalCash = 0;
    var orderIds = [];
    var customerId;

    orderResult.map((orderR) => {
      customerId = orderR.customer.customerid;
      orderIds.push({ orderid: orderR._id });
      totalCash += orderR.weight * orderR.perGram + orderR.perItem;
      totalWeight += orderR.weight;
    });

    const invoice = {
      customerid: customerId,
      date: watch("date"),
      totalCash: totalCash,
      totalWeight: totalWeight,
      orders: orderIds,
    };
    const result = await addInvoice(invoice);

    const balance = (await getBalanceByCustomerID(customerId))[0];

    console.log(balance);
    const totalBalanceWeight = balance.gold + totalWeight;
    const totalBalanceCash = balance.cash + totalCash;
    console.log(balance._id);
    const balanceU = {
      customerid: customerId,
      gold: totalBalanceWeight,
      cash: totalBalanceCash,
    };
    await updateBalance(balance._id, balanceU);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 6000);
  };

  const onSubmit = (data, event) => {
    event.preventDefault();
    const error = errorValidation(data)
    if(error) return

    const newOrder = {
      customerid: data.customerId,
      date: data.date,
      weight: data.weight,
      karat: data.karat,
      perGram: data.perGram,
      perItem: data.perItem,
      type: data.type,
      description: data.description,
    };
    console.log(newOrder);
    const updatedOrderList = [newOrder, ...orders];
    setOrders(updatedOrderList);
    setSubmitted(true);
  };
  const errorValidation = (data)=>{
    if(data.customerId === ""){
      error.push("Choose a Customer");
      setTimeout(() => {
        setError([]);
      }, 3000);
      return true
    }
    if (data.date === "") {
      error.push("Choose a date");
      setTimeout(() => {
        setError([]);
      }, 2000);
      return true
    }
    if(data.description === ""){
      error.push("Add description");
      setTimeout(() => {
        setError([]);
      }, 3000);
      return true
    }
    return false
  }
  return (
    <>
      <Banner title="New Invoice" />

      <div className="container-md p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-2">
            <div className="col"></div>
            <div className="col"></div>

            <div className="col-md-4">
              <SelectField
                name="customerId"
                label="Customers"
                options={customers}
                register={register}
              />
            </div>
          </div>
          {error.length !== 0 &&
            error.map((e) => (
              <div key={e.length} className="alert alert-danger " role="alert">
                {e}
              </div>
            ))}
          {success && (
            <div className="alert alert-success " role="alert">
              A new Invoice has been added!
            </div>
          )}
          <div className="row mb-2">
            <div className="col-md-4">
              <InputField
                type="text"
                name="type"
                label="Type"
                defaultValue={""}
                register={register}
              />
            </div>
            <div className="col-md-4 ">
              <DateField label="Date" name="date" register={register} />
            </div>
            <div className="col-md-4 ">
              <label className="form-label">Karat</label>
              <select className="form-select" {...register("karat")}>
                <option value="750">18 K</option>
                <option value="875">21 K</option>
              </select>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-4">
              <InputField
                type="text"
                name="weight"
                label="Weight"
                defaultValue={0}
                register={register}
              />
              <p>{errors.weight?.message}</p>
            </div>
            <div className="col-md-4">
              <InputField
                type="text"
                name="perGram"
                defaultValue={0}
                label="Per Gram"
                register={register}
              />
              <p>{errors.perGram?.message}</p>
            </div>
            <div className="col-md-4">
              <InputField
                type="text"
                name="perItem"
                register={register}
                defaultValue={0}
                label="Per Item"
              />
              <p>{errors.perItem?.message}</p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <TextArea
                type="textarea"
                name="description"
                label="Description"
                register={register}
                rows="3"
              />
            </div>
          </div>

          <div className="row justify-content-between m-3">
            <button type="submit" className="col-md-1 btn btn-primary ">
              ADD
            </button>
            <div className="col-md-4">
              <button type="button" className="col-md-5 btn btn-warning m-1">
                Discard Invoice
              </button>
              <button
                type="button"
                onClick={saveOrders}
                className="col-md-5 btn btn-success "
              >
                Save Invoice
              </button>
            </div>
          </div>
        </form>
        <div className="wrapper p-3">
          <div className="d-flex justify-content-between">
            <h2> Orders</h2>
          </div>
          <Table data={orders} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default Orders;
