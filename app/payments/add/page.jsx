"use client";
import Banner from "@/components/banner";
import DateField from "@/components/form/date";
import InputField from "@/components/form/input";
import SelectField from "@/components/form/select";
import Table from "@/components/table";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addPayment } from "@/services/paymentServcices";
import { getBalanceByCustomerID, updateBalance } from "@/services/balanceServices";

const schema = yup
  .object({
    weight: yup
      .number()
      .typeError("should be number")
      .required()
      .default(0),
    cash: yup.number().typeError("should be number"),
    karat: yup.number().typeError("should be number"),
  })
  .required();

const PaymentPage = () => {
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
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState([]);

  const columns = [
    { key: "weight", label: "Weight" },
    { key: "karat", label: "Karat" },
    { key: "cash", label: "Cash" },
    { key: "currency", label: "Currency" },
    { key: "date", label: "Date" },
    { key: "description", label: "Description" },
    {
      key: "id",
      label: "Edit",
      content: (item) => (
        <button className="btn btn-secondary" onClick={() => editPayment(item)}>
          edit
        </button>
      ),
    },
  ];
  const convertGoldToFinness = (weight, karat) => {
    switch (karat) {
      case 0:
        return 0;
      case 995:
        return weight;
      case 999.9:
        return (weight * 999.9) / 995;
      default:
        return (weight * karat) / 1000;
    }
  };
  const editPayment = () => {};
  const savePayments = async () => {
    var customerId;
    var totalWeight=0;
    let totalCash=0;

    const paymentsResult = await Promise.all(
      payments.map(async (payment) => {
        totalWeight = totalWeight + convertGoldToFinness(payment.weight, payment.karat);
        totalCash += payment.cash
        customerId = payment.customerid;
        return (await addPayment(payment)).data;
      })
    );
    console.log(paymentsResult);
    const balance = (await getBalanceByCustomerID(customerId))[0];
    const totalBalanceWeight = balance.gold - totalWeight;
    const totalBalanceCash = balance.cash - totalCash;
    console.log(balance._id);

    const balanceU = {
      customerid: customerId,
      gold: totalBalanceWeight,
      cash: totalBalanceCash,
    };
    const updatedBalance = await updateBalance(balance._id, balanceU);
    console.log(updatedBalance);
    console.log(totalWeight);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 6000);
  };
  const retrieveCustomers = async () => {
    const cachedCustomers = localStorage.getItem("customers");
    if (cachedCustomers) setCustomers(JSON.parse(cachedCustomers));
  };
  useEffect(() => {
    retrieveCustomers();
  }, [submitted]);

  const onSubmit = (data, event) => {
    event.preventDefault();
    const errorD = errorValidation(data)
    if(errorD) return

    const newPayment = {
      customerid: data.customerId,
      date: data.date,
      weight: data.weight,
      karat: data.karat,
      cash: data.cash,
      currency: data.currency,
      description: data.description,
    };
    console.log(newPayment);
    const updatedPayment = [newPayment, ...payments];
    setPayments(updatedPayment);
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
    <div>
      <Banner title="Payment" />
      <div className="container-md p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-2">
            <div className="col"></div>
            <div className="col"></div>

            <div className="col">
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
              All Payments has been added!
            </div>
          )}
          <div className="row mb-2">
            <div className="col">
              <InputField
                type="text"
                name="weight"
                label="Weight"
                defaultValue={"0"}
                register={register}
              />
              <p>{errors.weight?.message}</p>
            </div> 
            <div className="col ">
              <InputField
                type="text"
                name="karat"
                label="Karat"
                defaultValue={"740"}
                register={register}
              />
              <p>{errors.karat?.message}</p>
            </div>
            <div className="col ">
              <DateField label="Date" name="date" register={register} />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <InputField
                type="text"
                name="cash"
                label="Cash"
                defaultValue={0}
                register={register}
              />
              <p>{errors.cash?.message}</p>
            </div>
            <div className="col">
              <label className="form-label">Currency</label>
              <select className="form-select" {...register("currency")}>
                <option value="$">$</option>
                <option value="LBP">LBP</option>
              </select>
              <p>{errors.perGram?.message}</p>
            </div>
            <div className="col">
              <InputField
                type="text"
                name="description"
                register={register}
                defaultValue={" "}
                label="Description"
              />
              <p>{errors.perItem?.message}</p>
            </div>
          </div>

          <div className="d-flex justify-content-between ">
            <button type="submit" className="btn btn-primary ">
              ADD
            </button>
            <div className="">
              <button type="button" className="btn btn-warning mr-2">
                Discard Payment
              </button>
              <button
                type="button"
                onClick={savePayments}
                className="btn btn-success "
              >
                Save Payments
              </button>
            </div>
          </div>
        </form>
        <div className="wrapper pt-3">
          <div className="d-flex justify-content-between">
            <h2> Payments</h2>
          </div>
          <Table data={payments} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
