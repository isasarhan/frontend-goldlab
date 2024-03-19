"use client";
import Banner from "@/components/banner";
import SelectField from "@/components/form/select";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DateField from "@/components/form/date";
import Table from "@/components/table";
import { getPaymentByCustomerIdBetweenDates } from "@/services/paymentServcices";
import Pagination from "@/components/pagination";
import { paginate } from "@/utilities/paginate";

const AllPayments = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

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
  const editPayment = () => {};
  const retrieveCustomers = async () => {
    const cachedCustomers = localStorage.getItem("customers");
    if (cachedCustomers) setCustomers(JSON.parse(cachedCustomers));
  };
  useEffect(() => {
    retrieveCustomers();
    initilalizeTable(payments)
  }, [page]);

  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log(data);
    getPaymentByCustomerIdBetweenDates(data).then((res)=>{
        setPayments(res)
        initilalizeTable(res)
        console.log(res);
    })
    setPage(1)
    console.log(page);

  };
  const initilalizeTable = (data) => {
    const pagged = paginate(data, page, pageSize);
    setFilteredPayments(pagged);
  };
  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <div>
      <Banner title="All Payments" />
      <div className="container-md">
        <div className="wrapper p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mb-2 align-items-end justify-content-between ">
              <div className="col">
                <SelectField
                  name="customerid"
                  label="Customer"
                  options={customers}
                  register={register}
                />
              </div>
              <div className="col">
                <DateField label="From" name="startDate" register={register} />
              </div>
              <div className="col ">
                <DateField label="To" name="endDate" register={register} />
              </div>
              <div className="col d-flex justify-content-center">
                <button className="btn btn-primary" type="submit">
                  View Invoices
                </button>
              </div>
            </div>
          </form>
          <div className="wrapper pt-3">
            <div className="d-flex justify-content-between">
              <h2> Payments</h2>
            </div>
            <Table data={filteredPayments} columns={columns} />
          </div>
          <Pagination
              currentPage={page}
              itemsCount={payments.length}
              onPageChange={handlePageChange}
              pageSize={pageSize}
            />
        </div>
        
      </div>
    </div>
  );
};

export default AllPayments;
